---
title: "Maven and skinny wars"
date: 2009-09-20
categories: 
  - "java"
  - "tools"
tags: 
  - "maven-java-j2ee"
---

Maven is a great build system, but sometimes limitations come up that can drive you crazy.  One such limitation is support for building "skinny war" files.  Granted, I don't think it's the most common configuration, but for certain types of applications, it's the preferred way to package your application.

By default, war files are packaged with all of the libraries they use embedded within them.  This is fine, unless your application uses a large number of libraries, and you have more than one war file within your enterprise application archive (ear file).  In that case, you're causing the JVM to load the same set of classes multiple times, once for each war, which can use up a significant amount of memory, and bloating the size of your ear file.

In a skinny war configuration, the libraries are packaged at a higher level, within the ear file itself, and the war files are made to reference the libraries packaged within the ear file within their MANIFEST.MF file.  The classes are loaded once, and can be used in multiple web applications bundled in the ear.

Unfortunately, this isn't directly supported in Maven, although there are workarounds.  As [this](http://maven.apache.org/plugins/maven-war-plugin/examples/skinny-wars.html) page states, "The Maven WAR and EAR Plugins do not directly support this mode of operation but we can fake it through some POM and configuration magic".  The workaround is to list the jars in each war, but tell Maven to exclude it from the WEB-INF/lib and to add references to the jar in the MANIFEST.MF file.

The ear file Maven project then needs to list every library it will package as a dependency.  This means that common libraries will be listed in the ear project, and each war project that uses them, causing quite a bit of bloat in the Maven project files.

[This](http://docs.codehaus.org/display/MAVENUSER/Solving+the+Skinny+Wars+problem) wiki page has a good description of the situation, some alternate solutions, and requirements for a long term solution.

Ideally, I'd like to be able to take the same Maven war project file, and build for standalone deployment (fat war), or deployment within an ear project where the common libraries are included once in the ear file (skinny war), without having to change the Maven war project file.

For this to work, I think the ear project would have to control whether and which war project libraries are pushed up to the ear project.  The ear project file could explicitly list those libraries that should be bundled in the ear, or it could have an option where it calculates the common libraries across the contained war files, and automatically bundles them in the ear file.  As the link above indicates, the ear project would have to have the ability to rewrite the manifest entries of the contained war projects.

Technorati Tags: [maven java j2ee](http://technorati.com/tag/maven%20java%20j2ee)

