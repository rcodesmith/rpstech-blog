---
title: "AndroMDA: customizing code generation templates"
date: 2007-04-30
categories: 
  - "mdsd"
tags: 
  - "mdsd"
---

[AndroMDA](http://andromda.org/) is a [model driven architecture](http://www.omg.org/mda/) tool. Model driven architecture tools generate code based on UML models, which UML tools such as Rational Rose have been doing for a long time. The main differences between MDA tools and UML tools with code generation are the sophistication of the code generators and the MDA focus on platform independent models. When using an MDA approach, you typically create models that are not specific to any particular technology or platform (platform independent model). The idea being that you can then plug in different code generators that are specific to the technology platform you want to generate for (e.g. J2EE EJBs, Spring services, or .NET).

There are several MDA tools available, including open source tools AndroMDA and [openArchitectureWare](http://www.openarchitectureware.org/). AndroMDA probably has the richest set of cartridges of any MDA tool, commercial or open source.

UML models in AndroMDA are translated into code in two phases. First the input UML model, a platform-independent model, is translated into a platform specific model (e.g. classes representing Hibernate DAOs, Spring service classes). This translation occurs internally within the cartridge, implemented in Java code. In the second phase, the platform specific model is then translated into code (Java code, hibernate configurations, Spring configurations, etc) via velocity templates.

After working with MDA tools for a while, it's common to want to customize the code generation process. In AndroMDA, simple customizations can be made by modifying the velocity templates that generate the code from the platform specific model. Following is how it's done in AndroMDA 3.2:

**Find the right template** AndroMDA is distributed as a set of plugins that run within [Maven](http://maven.apache.org/), and the code generation cartridges are also Maven plugins. The easiest way to find the template to customize is to open the cartridge jar where the templates are stored. For me, the cartridge jars are all in /Users/ron/.m2/repository/org/andromda/cartridges/. Open one of the cartridge jars, such as andromda-spring-cartridge/3.2/andromda-spring-cartridge-3.2.jar, using a zip tool or jar to find the template you wish to customize. The velocity templates end in .vsl.

**Create a directory for the customized templates within your AndroMDA project.** Next, create a directory within your AndroMDA project for any templates you'll customize. In my case I created the directory mda/src/main/config/custom/spring for any custom Spring templates. Later on we'll point the code generation cartridges at this directory in order for them to use our customized templates ahead of the templates found in the cartridge jar files.

**Extract the templates you want to customize from the jar file onto the created directory.** Extract the template(s) you wish to customize onto the just created directory. Be sure to keep the same directory structure as in the jar file. For instance, if customizing SpringService.vsl, in my example you'd extract this template file onto mda/src/main/config/custom/spring/templates/spring/SpringService.vsl.

**Edit andromda.xml and insert a merge location pointing to the directory where you're storing your customized templates** The merge location tells AndroMDA where to look for customized templates or other code generation files. Edit the section of the mda/mda/src/main/config/andromda.xml file corresponding to the specific cartridge you are customizing (spring, hibernate, etc). In my case, I insert the following line into the spring section:

<property name="mergeLocation">${conf.dir}/custom/spring</property>

**Edit your copy of the template, making whatever changes you want**

**Run the AndroMDA code generation process** Go to your project directory and execute 'mvn install'. AndroMDA will look in your directory first for any templates before the looking inside the cartridge zip files.
