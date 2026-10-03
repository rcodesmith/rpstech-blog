---
title: "Combining Grails and Sculptor"
draft: true
---

Add dependency to BuildConfig.groovy:

\[code language="groovy"\] dependencies { // specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes eg.

// runtime 'mysql:mysql-connector-java:5.1.20' compile 'xmlunit:xmlunit:1.3' compile 'com.semantic.topico:topico:1.0-SNAPSHOT' } \[/code\]

Got dependency errors related to slf4j, which I have in both projects. Changed Sculptor pom.xml to mark all these dependencies as provided:

\[code language="xml"\] <dependency> <groupId>org.slf4j</groupId> <artifactId>slf4j-api</artifactId> <version>${slf4j.version}</version> <scope>provided</scope> </dependency> <dependency> <groupId>org.slf4j</groupId> <artifactId>jcl-over-slf4j</artifactId> <version>${slf4j.version}</version> <scope>provided</scope> </dependency> <dependency> <groupId>org.slf4j</groupId> <artifactId>log4j-over-slf4j</artifactId> <version>${slf4j.version}</version> <scope>provided</scope> </dependency> <dependency> <groupId>ch.qos.logback</groupId> <artifactId>logback-classic</artifactId> <version>${logback.version}</version> <scope>provided</scope> </dependency>

\[/code\]
