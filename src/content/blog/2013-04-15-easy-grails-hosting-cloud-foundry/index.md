---
title: "Easy Grails Hosting: Cloud Foundry"
date: 2013-04-15
categories: 
  - "grails"
tags: 
  - "hosting"
coverImage: "cloud_horse-e1366056121473.jpg"
---

[![cloud\_horse](images/cloud_horse-e1366056121473.jpg)](http://rpstechnologies.net/ron/blog/wp-content/uploads/2013/04/cloud_horse-e1366056121473.jpg)

These are some (old) notes on my experience with looking for an easy Grails hosting solution. This is a continuation of [this](http://rpstechnologies.net/ron/blog/2012/11/easy-grails-hosting/) post where I explored Heroku for Grails hosting.

[Wikipedia](http://en.wikipedia.org/wiki/Cloud_Foundry) defines Cloud Foundry as

> "Cloud Foundry is an open source cloud computing platform as a service (PaaS) software developed by VMware released under the terms of the Apache License 2.0. It is primarily written in Ruby. The source and development community for this software is available at cloudfoundry.org"

Cloud Foundry is also a [hosted service](http://cloudfoundry.com/) provided by VMWare, the principal company behind the Cloud Foundry platform. In addition to VMWare, [several companies](http://en.wikipedia.org/wiki/Cloud_Foundry#PaaS_service) provide hosting services.

How does Cloud Foundry stack up against my [original requirements](http://rpstechnologies.net/ron/blog/2012/11/easy-grails-hosting/)?

- _Free or cheap to get started_
    
    - [appfog](https://console.appfog.com/pricing) offers unlimited apps with 2 GB RAM and 100 MB storage, using their sub-domain
    - Cloudfoundry.com is currently free. Actually, they're in a sort of beta mode, and there is no information on a non-free account. Currently the [limits](http://docs.cloudfoundry.com/faq.html#limits) are 2 GB of memory and 2 GB of storage.
- _No vendor lock-in. If I want to move to another provider, no code changes necessary_
    
    The [Cloud Foundry platform](http://www.cloudfoundry.org/) is open source (Apache License 2.0), and there are multiple providers as I previously noted, so check.
    
- _Ability to scale up the number of instances and amount of memory easily_
    
    Instances can be [scaled up on-demand via their VMC command line utility](http://docs.cloudfoundry.com/tools/deploying-apps.html#monitoring-and-configuring-a-deployment-scaling-and-memory-management).
    
- _Minimal effort to set up a Grails application_
    
    Cloud Foundry has excellent Grails support. Not surprising considering VMWare is behing both Grails and Cloud Foundry. The [Cloud Foundry Grails plugin](http://grails-plugins.github.io/grails-cloud-foundry/docs/manual/index.html) makes it easy to deploy, update, and overall manage your Cloud Foundry-based Grails application. [This post](http://blog.springsource.com/2011/04/12/one-step-deployment-with-grails-and-cloud-foundry) is a good getting started guide.
    
- _Support for MySQL or PostgreSQL, and MongoDB_
    
    All of these are supported by Cloud Foundry as services. The [getting started guide](http://docs.cloudfoundry.com/getting-started.html) lists the available services (see left menu).
    
- _HTTPS support_
    
    Cloud Foundry supports HTTPS out of the box, but it sounds like that terminates at their load balancer, so communication between the load balancer and your instance is unencrypted. Not a big deal for me, at least when starting out. Other providers like appfog [may more fully support SSL](http://blog.appfog.com/appfog-now-has-ssl-support/).
    

Another interesting point on Cloud Foundry is that you can run your own instance of Cloud Foundry via [Micro Cloud Foundry](https://micro.cloudfoundry.com/) and VMWare. Looks like it's also possible to run it on [VirtualBox](http://flexguse.wordpress.com/2012/01/21/cloudfoundry-micro-cloud-and-virtualbox/)

I deployed my Grails 1.4 based app to cloudfoundry.com, using the MySQL and MongoDB services. It pretty much worked as advertised and was a breeze to get started with. I had to increase my instance's memory limit from the default 512MB, but that was easy to do via VMC.

I also ran into [this](http://support.cloudfoundry.com/entries/21014643-grails-spring-security-deployment-problem) problem with Grails and Spring Security on Cloud Foundry. The solution of adding the following to BuildConfig.groovy worked for me.

```
compile ":webxml:1.4.1"
```

I was running with Grails 1.4, so the latest Grails 2.\* may not have this problem.
