---
title: "Automatically installing and cleaning up software on Kubernetes hosts"
date: 2021-09-04
categories: 
  - "software-dev"
  - "tools"
tags: 
  - "vagrant"
  - "daemonset"
  - "minikube"
  - "kubernetes"
---

![Container ship stacked with containers at a port at night, with a tugboat alongside](images/k8s-cover.jpeg)

I had a need to automatically install software on each node in a Kubernetes cluster. In my case, security scanning software. Kubernetes can start new nodes to scale up automatically, destroy nodes when no longer needed, and create/destroy nodes as part of automatic Kubernetes upgrades. For this reason, the mechanism to install this software has be integrated into Kubernetes itself, so when Kubernetes creates nodes, it automatically installs whatever additional software is needed.  
  

I came across a clever solution using Kubernetes [DaemonSets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) and the Linux [nsenter](https://man7.org/linux/man-pages/man1/nsenter.1.html) command, described [here](https://medium.com/@patnaikshekhar/initialize-your-aks-nodes-with-daemonsets-679fa81fd20e). The solution consists of:

- A Kubernetes DaemonSet which ensures that each server in the cluster (or some subset of them you specify) runs a single copy of an installer pod.
- The installer pod runs an installer docker image which copies the installer and other needed files onto the node, and runs the installer script you provide via nsenter so the script runs within the host namespace instead of the docker container

The DaemonSet runs a given pod, in our case the installer pod which runs the installer script, automatically on each Kubernetes server, including any new servers created as part of horizontal scaling or upgrades.  
  

Shekhar Patnaik has implemented and packaged this pattern up into a Docker image and sample DaemonSet. The project is [here (AKSNodeInstaller)](https://github.com/patnaikshekhar/AKSNodeInstaller).  
  

There's a couple additional things I needed which the above project doesn't do:

- The ability to clean up installed software before a Kubernetes node is destroyed; In my case uninstalling packages and de-registering agents
- Support for copying files onto the node for installation (e.g. debian package files)

To support this, I extended AKSNodeInstaller with the above features, and a sample of how to test in VirtualBox/Minikube. The forked github repo is at [https://github.com/rcodesmith/KubeNodeInstaller](https://github.com/rcodesmith/KubeNodeInstaller) and the installer docker image is at [rcodesmith/kubenodeinstaller](https://hub.docker.com/repository/docker/rcodesmith/kubenodeinstaller).  
  

Please read the [original blog post](https://medium.com/@patnaikshekhar/initialize-your-aks-nodes-with-daemonsets-679fa81fd20e) from Shekhar Patnaik to understand how the DaemonSet and installer Docker image work together.

  
To support registering a cleanup script to be called before a node is destroyed, I use a [Container preStop hook](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/) in the DaemonSet. The preStop hook lets you specify a command to be run before a container is stopped. Since the DaemonSet pod and its containers are started when a node is created, and stopped before a node is destroyed, the preStop hook lets us run a cleanup shell script just before the Kubernetes node is destroyed.  
  

The fragment of the sample [DaemonSet manifest](https://github.com/rcodesmith/KubeNodeInstaller/blob/master/k8s/daemonset.yaml) showing the preStop hook and the install and cleanup scripts volume mount looks like this:  
  

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: node-installer
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: installer
  namespace: node-installer
spec:
  selector:
    matchLabels:
      job: installer
  template:
    metadata:
      labels:
        job: installer
    spec:
      hostPID: true
      restartPolicy: Always
      containers:
      - image: rcodesmith/kubenodeinstaller:1.1
        name: installer
        securityContext:
          privileged: true
        volumeMounts:
        - name: install-cleanup-scripts
          mountPath: /tmp
        - name: host-mount
          mountPath: /host
        lifecycle:
          preStop:
            exec:
              command: ["/bin/sh","-c","./runCleanup.sh"]
      volumes:
      - name: install-cleanup-scripts
        configMap:
          name: sample-installer-config
      - name: host-mount
        hostPath:
          path: /tmp/install
```

The runCleanup.sh script will run a cleanup.sh script you provide on the host via nsenter. You supply the cleanup.sh script via a ConfigMap that is mounted into the pod as a volume, same as the install.sh script. Following is an example ConfigMap:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: sample-installer-config
  namespace: node-installer
data:
  install.sh: |
    #!/bin/bash
    # Test that the install file we provided in Docker image is there
    if [ ! -f /vagrant/files/sample_install_file.txt ]; then
        echo "sample_install_file not found on host!"
        exit 0
    fi
    # Update and install packages
    sudo apt-get update
    sudo apt-get install cowsay -y
    touch /vagrant/samplefile.txt
  cleanup.sh: |
    #!/bin/bash
    sudo apt-get remove cowsay -y
    rm /vagrant/samplefile.txt
```

I also had a need to install a package from a file that wasn’t in a repository. To support this, I add whatever files are needed to a custom installer Docker image, then copy those files onto the node. The install script you supply can then make use of those files.

To use this, supply your own Docker image which copies whatever additional install files you need in a files/ directory.

For example:

```dockerfile
FROM rcodesmith/kubenodeinstaller
COPY files /files
```

Then use the docker image in your DaemonSet manifest instead of rcodesmith/kubenodeinstaller.  
  

Finally, you can make use of whatever files you copied in your install script. The files will be copied onto the host in whatever directory you mounted into /host in your DaemonSet.  
  

In summary, to use this solution:

1. Create a ConfigMap with the installer script, named install.sh, with whatever install commands you want. They'll be executed on the node whenever a new server is added.
2. If you need some additional files for your install script, such as debian package files, create a custom Docker Image and include those files in the image via the Docker COPY command. Then use the Docker image in your DaemonSet manifest.
3. If you have some cleanup steps to execute, provide a cleanup.sh script in the same ConfigMap. The script will be executed on the node before a server is destroyed.

## Testing in VirtualBox and Minikube

Initially, I was testing out the solution and my install script by creating / destroying Kubernetes node pools in GKE. This wasn't ideal, so I wanted a faster, local way to test. Following is a way to test this out locally using Vagrant, VirtualBox and Minikube.

[VirtualBox](https://www.virtualbox.org/) is a free machine virtualization product from Oracle that runs on Mac, Linux, and Windows. We'll use VirtualBox to run an Ubuntu VM locally on top of which Minikube will run. Essentially, the VM will be our Kubernetes host.  
  

[Minikube](https://minikube.sigs.k8s.io/docs/) is a Kubernetes implementation suitable for running locally on Mac, Linux, or Windows.  
  

[Vagrant](https://www.vagrantup.com/) is a tool that can automate the creation and setup of machines, and supports multiple providers including VirtualBox. We'll use it to automate the creation of and setup of the VirtualBox Ubuntu VM and Minikube.  
  

Following are install instructions for Mac using Homebrew, but you can also use Windows and Linux:  
  

Install VirtualBox, extensions, and Vagrant:  

```shell
brew install Caskroom/cask/virtualbox
brew install Caskroom/cask/virtualbox-extension-pack
brew install vagrant
vagrant plugin install vagrant-vbguest
```

Install whatever Vagrant box you need, corresponding to what you'll use for your Kubernetes nodes:  
  
You can find boxes at: [https://app.vagrantup.com/boxes/search](https://app.vagrantup.com/boxes/search)  
  
I'm using [this Ubuntu box](https://app.vagrantup.com/ubuntu/boxes/focal64).  
  
To get started with a Vagrant box:

```shell
vagrant init ubuntu/focal64
```

The above command will generate a Vagrantfile in the current directory which describes the VM to be created, and steps to provision it. The Vagrantfile I used is [here](https://github.com/rcodesmith/KubeNodeInstaller/blob/master/Vagrantfile).

You might need to add more memory for the VM in the Vagrantfile:  
  

```ruby
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
#    vb.gui = true
  
    # Customize the amount of memory on the VM:
    vb.memory = "2024"
  end
```

  
In the Vagrantfile, use the Vagrant shell provisioner to install Minikube, Docker, and kubectl. We're using the Minikube 'none' driver which will cause it to run Kubernetes in the current server (the Vagrant VM). And finally, start minikube.

```ruby
  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt update
    sudo curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64   && sudo chmod +x minikube
    sudo mv minikube /usr/local/bin/minikube
    sudo apt install conntrack
    sudo minikube config set vm-driver none
    sudo sysctl fs.protected_regular=0
    sudo apt install -y docker.io
    sudo apt-get install -y apt-transport-https
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
    echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
    sudo apt-get update
    sudo apt-get install -y kubectl
    sudo minikube start --driver=none
  SHELL
```

To verify Minikube is running in the VM:

```text
> sudo minikube status

minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

To start Minikube if it isn’t running:

```shell
sudo minikube start --driver=none
```

Now that Minikube is running, you can interact with the Kubernetes cluster using Kubectl.  
  

```text
> sudo kubectl get nodes
 
NAME STATUS ROLES AGE VERSION
ubuntu-focal Ready control-plane,master 10d v1.21.2
```

Now, apply your ConfigMap and DaemonSet. Following is an example from [https://github.com/rcodesmith/KubeNodeInstaller](https://github.com/rcodesmith/KubeNodeInstaller)  
  

```shell
# Change to project directory mounted in VM
cd /vagrant

# Apply ConfigMap and DaemonSet
sudo kubectl apply -f k8s/sampleconfigmap.yaml
sudo kubectl apply -f k8s/daemonset.yaml

# The DaemonSet's pods should be running, one per server (1 here). Check:
sudo kubectl get pods -n node-installer

# Look at pod logs, look for errors:
sudo kubectl logs daemonset/installer -c installer -n node-installer
```

My DaemonSet and Docker image had an install file which should have been copied to the VM.  
Additionally, the install script wrote to /vagrant/samplefile.txt. Check for these:

```text
> ls -l /vagrant/files/sample_install_file.txt
> ls -l /vagrant/samplefile.txt
```

The cleanup script should delete /vagrant/samplefile.txt. Let’s test this by deleting the DaemonSet, then verifying the file is deleted.  
  

```text
> sudo kubectl delete -f k8s/daemonset.yaml
> ls -l /vagrant/samplefile.txt
ls: cannot access '/vagrant/samplefile.txt': No such file or directory
```

Now that we tested everything, to destroy the VM and everything in it, run following back on your workstation:

```shell
vagrant destroy
```
