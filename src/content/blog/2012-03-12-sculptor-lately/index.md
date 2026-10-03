---
title: "Sculptor lately"
date: 2012-03-12
categories: 
  - "mdsd"
tags: 
  - "sculptor"
---

The latest version, 2.1.0, of [Sculptor](http://fornax.itemis.de/confluence/display/fornax/Sculptor+%28CSC%29) came out and it has some great features including JPA 2.0 support, custom finder methods generated from the DSL, and a [fluent domain object builders](http://fornax.itemis.de/confluence/display/fornax/3.+Advanced+Tutorial+%28CSC%29#3.AdvancedTutorial%28CSC%29-DomainObjectBuilders) feature I contributed.

Other than the builders feature, I haven't been able to work with the new features as I'm working on a Sculptor GWT GUI branch based on the 2.0 release. At some point I'll migrate my branch to the latest and get to use these goodies.

On the horizon, there's work being done on migrating Sculptor to the latest versions of [XText and XTend](http://www.eclipse.org/Xtext/) which look like great advancements, and [Hibernate 4.X support has just been added to trunk](http://groups.google.com/group/fornax-platform/browse_thread/thread/fd4eed366e3e3f70) by Oliver Ringel.

Not tied to a particular release, but Torsten Juergeleit has also done some great work with a new [all-in-one Maven Sculptor plugin](https://groups.google.com/d/msg/fornax-platform/FiWmpEgbEv0/z_Q2c3Mi2WoJ) which does the work of what used to be 3 separate plugins.

Lots of exciting developments for Sculptor. I'll write more on the Sculptor GWT GUI work in a future post.
