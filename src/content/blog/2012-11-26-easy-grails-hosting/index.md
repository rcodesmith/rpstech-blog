---
title: "Easy Grails hosting"
date: 2012-11-26
categories: 
  - "grails"
tags: 
  - "grails"
  - "hosting"
---

I started a new Grails-based project, and went out looking for an easy to set up Grails hosting option. I currently have a virtual server hosted with Rackspace (originally Slicehost). For a couple reasons, I want to keep this new application on its own server. I could get an additional virtual server from Rackspace, and start setting up SSH, Apache Web Server, Tomcat, MySQL, MongoDB, and whatever else came up, which I've done many times, but the setup and administration takes a significant amount of time, which could instead be spent on developing the app.

My requirements are:

- Free or cheap to get started
- No vendor lock-in. If I want to move to another provider, no code changes necessary.
- Ability to scale up the number of instances and amount of memory easily
- Minimal effort to set up a Grails application
- Support for MySQL or PostgreSQL, and MongoDB
- HTTPS support

Ideally, I'd also like to be able to:

- Download my server image and run it locally via VirtualBox or similar
- Run my server image on a different cloud provider

As a reference point on pricing, Rackspace currently offers the following Cloud Server [configurations](http://www.rackspace.com/cloud/public/servers/pricing/):

- Instance with 512MB memory, 20GB storage: $16/mo
- Instance with 1GB memory, 40GB storage: $44/mo

Interestingly, Rackspace is transitioning to an [Openstack](http://www.openstack.org/)\-based platform.

Looking at the PaaS (platform-as-a-service) providers, I've been hearing about [Heroku](http://www.heroku.com/) for a while. Heroku looks very easy to get started with, and the [add-on services](https://addons.heroku.com/) that are available look impressive.

Kudos to the Heroku website, very slick and inviting. On to the substance..

As far as [pricing](http://www.heroku.com/pricing),

- 1 web dyno, up all the time with a dev database (10K rows) is free
- 1 web dyno, up all the time with a "crane" production database (400 MB cache, 1TB storage) is $50/mo
- 2 web dyno, up all the time with a "crane" production database (400 MB cache, 1TB storage) is $85/mo

Basically, each additional web dyno is approximately $35/month, and each doubling of production database cache doubles the price, starting with $50 for the "crane" database.

But what exactly is a web dyno or a "crane" database?

According to the Heroku website, "A web dyno runs your code and responds to HTTP requests. More dynos provide more concurrency" Sounds like a thread, which would be really bad in relation to the pricing.

But drilling into the details, A dyno is defined as "the basic unit of composition on Heroku, is a lightweight container running a single user-specified command. You can think of it as a virtualized unix container". Which sounds more like a virtual server instance, and is more reasonable.

The standard Heroku database offerings are based on PostgreSQL, with different pricing based on the amount of cache you need, "crane" being the lowest.

What about HTTPS/SSL support? [This](https://addons.heroku.com/ssl) add-on provides SSL support at $20/month. On [further digging](https://devcenter.heroku.com/articles/ssl), SSL does work out of the box using a shared certificate and a heroku.com-based domain name. The $20/mo add-on lets you use your own certificate for your own domain.

So Heroku looks to be a bit pricier for a small production instance than setting up your own virtual server, but with less setup and administration work, and an easier path to scale up.

But the show-stopper for me was the [deployment model](https://devcenter.heroku.com/articles/java-faq#why-do-i-need-to-push-my-source-code-to-heroku). In Heroku, deployment means pushing your source code to Heroku, which they then build and deploy themselves. I'm aware of the argument that if someone has access to your deployable artifacts, and therefore the bytescode, they can decompile source code. But decompiled source code isn't the same as the original, and it feels wrong to make it so darn easy for someone to steal your intellectual property if there's a security breach.

In my next post, I'll explore CloudForge.

**4/14/2013 Update:** Heroku added support for [WAR deployment](https://devcenter.heroku.com/articles/war-deployment) via their [Heroku Enterprise for Java](https://enterprise.heroku.com/) offering. Looks like pricing information isn't publicly available though.
