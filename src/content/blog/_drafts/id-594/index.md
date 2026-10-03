---
title: "Vagrant notes"
draft: true
---

http://docs.vagrantup.com/v2/getting-started

http://zeroturnaround.com/rebellabs/pragmatic-devops-how-to-create-your-first-environment-with-chef-and-vagrant/#!/

http://community.opscode.com/cookbooks/nodejs

http://docs.opscode.com/knife.html

Install chef

da-nile-2:topico-content-editors ron$ curl -L http://www.opscode.com/chef/install.sh | sudo bash Password: % Total % Received % Xferd Average Speed Time Time Time Current Dload Upload Total Spent Left Speed 100 6789 100 6789 0 0 44097 0 --:--:-- --:--:-- --:--:-- 71463

Sorry, try again. Password: Downloading Chef for mac\_os\_x... Installing Chef Verifying archive integrity... All good. Uncompressing The full stack of chef......................................................................................................................................................................................................

vagrant destroy

knife cookbook site download nodejs

tar xvzf nodejs-1.3.0.tar.gz -C cookbooks

vagrant reload

\[Sat, 24 Aug 2013 18:57:01 +0000\] ERROR: Running exception handlers \[Sat, 24 Aug 2013 18:57:01 +0000\] ERROR: Exception handlers complete \[Sat, 24 Aug 2013 18:57:01 +0000\] FATAL: Stacktrace dumped to /var/chef/cache/chef-stacktrace.out \[Sat, 24 Aug 2013 18:57:01 +0000\] FATAL: Chef::Exceptions::CookbookNotFound: Cookbook apt not found. If you're loading apt from another cookbook, make sure you configure the dependency in your metadata

699 knife cookbook site download apt 700 tar xvzf apt-2.1.0.tar.gz -C cookbooks

706 knife cookbook site download build-essential 707 tar xvzf build-essential-1.4.0.tar.gz -C cookbooks

```
config.vm.provision :chef_solo do |chef|
  chef.cookbooks_path = "./cookbooks"
  chef.add_recipe "apt"
  chef.add_recipe "build-essential"
  chef.add_recipe "nodejs"
end
```

Couldn't find a recipe for yeoman, so used the shell provider instead.

Add to Vagrantfile:

```
config.vm.provision :shell, :path => "bootstrap.sh"
```

bootstrap.sh:

```
#!/usr/bin/env bash

apt-get update

# Install Yeoman
npm install -g yo
```

vagrant ssh -c

vagrant destroy

vagrant reload

vagrant up

vagrant suspend

vagrant resume
