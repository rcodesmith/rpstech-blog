---
title: "Server getting attacked"
date: 2013-06-08
---

Upgraded drupal6 and updated a whole bunch of modules under /usr/local/websites/drupal6/sites/all/modules to try to resolve the problem.

Updating drupal/modules was a pain in the butt.

```
-A INPUT -s 192.168.1.5 -j DROP
```

To see what's gotten blocked: fgrep "iptables" /var/log/syslog

To see requests on virtual hosts, you can pick out ones that look bad

```
tail -f /var/log/apache2/other_vhosts_access.log
```

To list current iptables rules:

```
iptables -L -v -n
```

Edit iptables rules

```
vi /etc/iptables.up.rules
```

Add entries like:

```
-A INPUT -s 112.111.0.0/16 -j DROP
```

The above is blocking an entire group of IP addresses. To find the networks for a given IP use: http://www.tcpiputils.com/browse/ip-address

The following can be used to lookup geographically where an IP is coming from: https://dazzlepod.com/ip/112.111.35.200/

Then make the changes active like:

```
iptables-restore &lt; /etc/iptables.up.rules
```

On startup they'll get activated automatically due to network interface script which is automatically doing the restore above when interface is brought up

This is how that was set up: http://articles.slicehost.com/2008/4/25/ubuntu-hardy-setup-page-1

Things looking better, so far..
