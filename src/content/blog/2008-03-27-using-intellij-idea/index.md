---
title: "Using IntelliJ IDEA"
date: 2008-03-27
categories: 
  - "software-dev"
  - "tools"
---

I've started using [Intellij IDEA](http://www.jetbrains.com/idea/) as an IDE. I've always heard good things about it but stuck with Eclipse because it's pretty good, and the standard used by most clients I've worked with.

What got me to try it out was the Groovy/Grails support. I've been doing some work with Grails and had heard they had a good plugin. After working with it a while, the Groovy support is the best out of the three major Java IDEs (Eclipse, NetBeans, IDEA). The Maven 2 support is great too.. It's by far the best support for Maven 2 in any IDE. There are some features I would still like them to add (such as a Maven repository index/search feature), but the important things work well (handling Maven dependencies).

In general, I find myself having to fiddle with the UI less than I do with Eclipse (configuring and switching perspectives, resizing panes, etc).

The other plugin I was really interested in was the [Mercurial IDEA](http://code.google.com/p/mercurialidea/) plugin. This plugin is still early in the development cycle. Unfortunately it gave me an error when starting up - it was compiled for JDK 1.6 and I'm stuck with 1.5 on my Mac. I imported the MercurialIdea plugin source into Idea, reset it to use the Idea platform runtime, and rebuilt the plugin without success. No biggie, the Mercurial command line is easy enough to use.
