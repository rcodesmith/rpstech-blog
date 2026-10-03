---
title: "MyFaces and JBoss built-in implementation"
date: 2008-10-28
categories: 
  - "java"
  - "web"
---

I'm working on a WebSphere-based application, and need to get it running on my Mac. RAD isn't available for the Mac, and even if it was, it's so far behind in Eclipse revisions that I can't use most of the Eclipse plugins I find useful.

So there's a couple options for developing WebSphere-based applications on Eclipse/Mac:

- [MyEclipse Blue Edition](http://www.myeclipseide.com/blue.php) : An Eclipse distribution with WebSphere connectors. Bring your own WebSphere (e.g. [WebSphere Express](http://www-01.ibm.com/software/webservers/appserv/express/))

- Make your application portable and develop on another app server : Develop on JBoss & Eclipse, but deploy on WebSphere

Right now I'm going with the second option, since a colleague already did most of the work of getting the application running under JBoss. I took the changes he had to make to get it to run under JBoss, and made them into a patch I could apply on top of the latest code from source control.

So far it's working great. I just have to be careful to do a regression test in a RAD/WebSphere environment before any changes can be handed over to QA.

I did run into a problem with clashing JSF libraries in JBoss:

09:25:40,120 WARN \[JBossJSFConfigureListener\] MyFaces JSF implementation found! This version of JBoss AS ships with the java.net implementation of JSF. There are known issues when mixing JSF implementations. This warning does not apply to MyFaces component libraries such as Tomahawk. However, myfaces-impl.jar and myfaces-api.jar should not be used without disabling the built-in JSF implementation. See the JBoss wiki for more details.  
09:25:40,126 WARN \[config\] Unable to process deployment descriptor for context 'null'  
09:25:40,443 ERROR \[STDERR\] java.lang.UnsupportedOperationException  
09:25:40,444 ERROR \[STDERR\] at com.sun.faces.config.ConfigureListener$InitFacesContext.getViewRoot(ConfigureListener.java:1690)  
09:25:40,444 ERROR \[STDERR\] at com.sun.faces.util.MessageFactory.getMessage(MessageFactory.java:113)  
09:25:40,444 ERROR \[STDERR\] at com.sun.faces.util.MessageUtils.getExceptionMessageString(MessageUtils.java:277)  
09:25:40,444 ERROR \[STDERR\] at com.sun.faces.config.ConfigureListener.configure(ConfigureListener.java:855)  
09:25:40,444 ERROR \[STDERR\] at com.sun.faces.config.ConfigureListener.configure(ConfigureListener.java:502)  
09:25:40,444 ERROR \[STDERR\] at com.sun.faces.config.ConfigureListener.contextInitialized(ConfigureListener.java:402)  
09:25:40,444 ERROR \[STDERR\] at org.jboss.web.jsf.integration.config.JBossJSFConfigureListener.contextInitialized(JBossJSFConfigureListener.java:69)  

The MyFaces Tomahawk components are an implementation of, and extension of the standard JSF components. This complicates things because when you use application servers that bring their own implementations, such as JBoss and WebSphere, you have to somehow get the application server to not load its implementation ahead of MyFaces. I wish MyFaces had just made their extended components use a separate namespace and we could then use their components while still keeping the application server JSF implementation.

For JBoss, the solution is to set a parameter that instructs JBoss to ignore its own JSF implementation in favor of yours. The following article describes the solution:  
http://www.jboss.org/community/docs/DOC-10182
