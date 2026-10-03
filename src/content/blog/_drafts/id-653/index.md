---
title: "vagrant ssh"
draft: true
---

SSH Agent forwarding

https://help.github.com/articles/using-ssh-agent-forwarding

To test connectivity from vagrant box:

```
ssh -T git@github.com
```

SSH to box enabling forwarding:

http://stackoverflow.com/questions/11955525/how-to-use-ssh-agent-forwarding-with-vagrant-ssh

To SSH into vagrant box, enabling forwarding of the authentication agent connection:

```
vagrant ssh -- -A
```

On Mac (host OS), load identity into ssh agent:

```
ssh-add
```

Above will load default identity (e.g. ~/.ssh/id\_rsa)

Puppet recipe to install git & clone repos:

```
https://forge.puppetlabs.com/jproyo/git
```
