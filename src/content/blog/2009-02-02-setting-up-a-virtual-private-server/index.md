---
title: "Setting up a virtual private server"
date: 2009-02-02
categories: 
  - "web"
---

I've had a dedicated server at a hosting provider that I've used to host applications and sites for years. I got a great price on the hosting package and it's worked well, but the server's growing long in the tooth and needs an OS upgrade. I've also had some hardware failures in the past which caused some downtime.

In looking for a replacement to my current server, I've been looking into the [virtual private server](http://en.wikipedia.org/wiki/Virtual_private_server) options. A virtual private server will allow me to start small and scale up as needed, minimize outages due to hardware problems, and should be more economical than dedicated hosting.

Most of the VPS providers I looked at were using the open source [Xen](http://www.xen.org/) virtualization software, including [Amazon EC2](http://www.google.com/url?sa=U&start=1&q=http://aws.amazon.com/ec2/&ei=VQSGSZncNZicNerKiPID&usg=AFQjCNF267xpekLBGEHpgz0OE156-3jYjg) and [Slicehost](http://www.slicehost.com/). Amazon EC2 has some nifty features, such as pre-configured virtual server images (e.g. JBoss stack image, PHP stack image, etc), and a web services interface to manipulate your server instances, creating or removing instances as needed.

Amazon EC2 charges by the amount of time your instance is running, which for me basically means the time your instance is available to serve traffic. This is a good feature for people that need to dial up instances to handle large loads of traffic or execute some processing intensive task. I was hoping that I wouldn't get charged for time that the instance is effectively idle, but unless I want my instance to be unavailable for some time period, I'd get charged. Amazon charges $0.10 per instance hour for the smallest instance, which if you want a server available all the time, works out to ~ $74/month, which is more than I was paying for my dedicated server.

Slicehost lets you add and remove "slices" (server instances) via their control panel, as well as resizing silces. They don't provide a web service interface to control your instances as Amazon does. Also, I don't see a way to upload pre-built images, such as a Apache/Tomcat/MySQL, or a Apache/PHP/MySQL pre-built image. These would be nice features, but definitely not must-haves for me. Slicehost charges on a monthly basis, with a 256MB RAM instance costing $20/month, and a 512MB instance costing $38/month. I signed up for the 256MB instance running [Ubuntu](http://www.google.com/url?sa=U&start=1&q=http://www.ubuntu.com/&ei=BxCGSZyfIqH4NPqavd4D&usg=AFQjCNGldTNGj22Z9iINy0yA8EM7vfis6Q) linux to try it out, and was surprised it was up and running with shell access within 5 minutes of submitting the request.

Since I got set up with Slicehost, they got acquired by Rackspace, the largest hosting provider in the U.S. I see this as largely positive - giving them access to Rackspace's data centers and economies of scale. Hopefully Slicehost's excellent operations, web control panel, and pricing will continue to impress me.
