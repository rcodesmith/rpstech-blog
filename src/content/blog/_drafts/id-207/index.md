---
title: "GWT, Maven, Eclipse, and m2eclipse"
draft: true
---

GWT Maven, Eclipse, using m2eclipse

GWT maven plugin http://mojo.codehaus.org/gwt-maven-plugin/

Follow these directions: http://blog.widenhome.com/2011/01/29/the-easiest-way-to-create-gwt-maven-project/

\[shell\] webAppCreator -out RatingWidget com.widenhome.widget.RatingWidget -maven \[/shell\]

\[xml\] <plugin> <groupId>org.apache.maven.plugins</groupId> <artifactId>maven-compiler-plugin</artifactId> <configuration> <source>1.6</source> <target>1.6</target> </configuration> </plugin> \[/xml\]

\[xml\] <plugin> <groupId>org.apache.maven.plugins</groupId> <artifactId>maven-eclipse-plugin</artifactId> <configuration> <wtpversion>2.0</wtpversion> </configuration> </plugin> \[/xml\]

Make sure to add the maven-compiler-plugin to the plugins section. I thought it wasn't needed since the generated pom has the maven.compiler.source maven.compiler.target properties set with the correct Java version (1.5). But it is needed - the maven-eclipse plugin generates the project with a java version of 1.4 which is incompatible with GWT.

Also, even though we'll be using m2eclipse later on, follow the steps to generate the Eclipse projects.

\[shell\] >mvn compile eclipse:clean eclipse:eclipse \[/shell\]

Import into Eclipse.

\- Getting eclipse google plugin tools to work

Open project properties, and in Google->Web Toolkit, choose "Use Google Web Toolkit" to enable GWT Eclipse plugin features, such as the launchers. \[pic\]

Had a couple errors on the project. One complaining the Java compiler version of the project didn't match the Java facet. Fixed this via project properties->Project Facets and set Java version 1.6. \[pic\]

Another error that the project does not have any GWT SDKs on the path. - Had to remove GWT-related jars from build path, and leave GWT SDK library on it or... make sure GWT SDK is higher than jars

Right click -> Maven-> Enable Dependency Management

Upon importing, m2eclipse modifies project to have project resources processed by Maven/m2eclipse rather than Eclipse. There for Maven plugins that generate resources beyond just copying files. This has proved problematic, so I prefer to turn it off. Project properties Java build path -> source For each source path, remove the exclusion (set to \*\* by m2eclipse). This will cause Eclipse to process resources in the standard way, by copying files from resource directory to output folder. Next, disable Maven build upon file changes.

Maven->Lifecycle Mapping Goals to invoke after project clean = validate Goals to invoke on resource changes = validate I just picked as close to a no-op goal as I could find. Annoyingly, it gives an error if you make these fields blank.

mvn gwt:run to run in hosted mode

\- adding jrebel section to POM? - Enabling jrebel in eclipse
