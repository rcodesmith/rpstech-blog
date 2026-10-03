---
title: "Idea 8.1 & Grails 1.1"
date: 2009-05-01
categories: 
  - "general"
  - "grails"
tags: 
  - "general"
  - "grails"
---

I've been working with Grails again lately after not using it for a while. Last time I was using Grails was a pre-1.0 release about a year ago. Even then it was an extremely productive framework, but it was rough around the edges.

The main obstacle I saw was that exception messages and stack traces were not descriptive of the root problem. It wasn't that the error messages were poorly written, but the error that was reported wasn't near the root cause of the problem. The reported error was a far-removed side effect of the actual problem. If you had messed up the definition of your GORM domain class, the application may start up fine and complain that some dynamic save method was undefined for the domain class when you tried to use it. You then had to do a good deal of trial and error until you isolated what change caused the problem. Having a robust set of unit tests for your application helped, but it still took a while to diagnose the problem.

I've been using Grails 1.1 betas lately, and it looks like the error reporting has gotten much better. When I've gotten errors, it was usually pretty clear what the cause was.

Officially, IDEA only supports Grails 1.0, but it's working fine for me with some tweaks. Here's what I did:

- Created the Grails 1.1 project outside of IDEA, using the grails command (not MVN plugin)

- Redefine GROOVY and GRAILS global libraries in IDEA to point to the latest versions of each

- Imported the existing Grails project into IDEA

- After installing some Grails plugins (specifically, the google-chart plugin), I found that they weren't on the classpath and the grails launcher no longer worked. Apparently Grails 1.1 moved where the plugins are stored and IDEA hasn't been updated for this yet. To get around it, I added <home dir>/.grails/1.1/projects/<my project> to the module's content root for my project, and added the plugin's source directory (plugins/google-chart-0.4.8/src/groovy in my case) as a source folder within the added content root.

The grails app launcher is working for me, and I'm not getting the compile problems I was getting before.
