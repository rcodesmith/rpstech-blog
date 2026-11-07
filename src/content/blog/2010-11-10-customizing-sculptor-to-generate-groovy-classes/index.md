---
title: "Customizing Sculptor to generate Groovy classes"
date: 2010-11-10
categories: 
  - "mdsd"
tags: 
  - "groovy"
  - "sculptor"
---

I've been using the [Sculptor DSL/tool](http://fornax.itemis.de/confluence/display/fornax/Sculptor+\(CSC\)) to build Java EE applications based on [DDD](http://en.wikipedia.org/wiki/Domain-driven_design) and [EDA](http://en.wikipedia.org/wiki/Event-driven_architecture) principles. This has worked out great, and Sculptor allows me to express the intent at a higher level and more succinctly than I could with straight Java or another GPL.

When it comes to expressing the behavior of your domain, that's done outside of the Sculptor DSL, using Java. The Sculptor DSL is largely about the solution structure; the structure and relationship between classes, and what standard behaviors they support, such as CRUD repository methods. If you need to implement complex logic for your credit score calculator class, Sculptor is used to define the interface into your method, but it's up to you to implement the logic for that method in Java. After a while, I found this was significantly slowing me down. Java is so verbose compared to languages such as Groovy or Scala, in particular when it comes to working with object graphs and functional programming.

Fortunately, Sculptor and the XText tools it is based on support customizing each step of the generation process. This post outlines what I did to customize Sculptor to allow me to implement my domain and service classes in Groovy. This only applies to the concrete implementation classes you would customize when using the 'gap' generation option. The base classes that are regenerated each time are still Java, as there was no benefit to using a different language for them.

The following changes should be made to the business tier project.

**Maven POM updates**

First, the Groovy libraries and a Groovy compiler need to be added to the Maven build Traditionally this was done using the [GMaven plugin](http://docs.codehaus.org/display/GMAVEN/Home), but I came across [this post](http://contraptionsforprogramming.blogspot.com/2010/09/where-are-all-my-stubs.html) that describes using the eclipse-groovy plugin to jointly compile Java and Groovy together in a single pass. Much better.

To use this, modify the pom.xml to add the springsource maven dependency and plugin repositories:

```xml
<repositories>
    <repository>
        <id>springsource</id>
        <url>http://maven.springframework.org/snapshot</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>

<pluginRepositories>
    <pluginRepository>
        <id>springsource</id>
        <url>http://maven.springframework.org/snapshot</url>
    </pluginRepository>
</pluginRepositories>
```

Then update the maven-compiler plugin in the build/plugins section to use the groovy-ecilpse-compiler:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>2.3.1</version>
    <configuration>
        <encoding>ISO-8859-1</encoding>
        <source>1.6</source>
        <target>1.6</target>
        <compilerId>groovy-eclipse-compiler</compilerId>
        <verbose>true</verbose>
    </configuration>
    <dependencies>
        <dependency>
            <groupId>org.codehaus.groovy</groupId>
            <artifactId>groovy-eclipse-compiler</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
</plugin>
```

Finally, add groovy to your dependencies:

```xml
<dependency>
    <groupId>org.codehaus.groovy</groupId>
    <artifactId>groovy-all</artifactId>
    <version>1.7.5</version>
    <type>jar</type>
</dependency>
```

**Xpand templates**

The next step is to create Xpand templates that will generate Groovy class files instead of Java. I'm using the Sculptor 'hint' feature to control whether a class will get generated as Java or Groovy. If a Service or Domain class is annotated with hint="gapImpl=groovy", Groovy will be generated, otherwise it'll fall back to the default of Java.

The code below defines an aspect for the generation of the DomainObject and Service sub-classes. Whenever these templates are invoked within Sculptor, the aspect below will be evaluated, deciding whether to generate Groovy code or to proceed with the normal Sculptor templates.

Add to src/main/resources/templates/SpecialCases.xpt:

```text
«AROUND *::domainObjectSubclass FOR DomainObject»
        «IF getHint("gapImpl") == "groovy"»
                «EXPAND Groovy::Groovy»
        «ELSE»
            «targetDef.proceed()»
        «ENDIF»
«ENDAROUND»

«AROUND *::serviceImplSubclass FOR Service»
        «IF getHint("gapImpl") == "groovy"»
                «EXPAND Groovy::GroovyService»
        «ELSE»
            «targetDef.proceed()»
        «ENDIF»
«ENDAROUND»
```

Next, define the templates that will generate the actual Groovy code. Since Groovy syntax is practically a superset of Java, I was able to copy the code from the existing Sculptor templates (DomainObject.xpt and Service.xpt). The one key difference is where the code gets generated to - a new helper function groovyFileName returns a .groovy file name.

Create src/main/resources/templates/Groovy.xpt:

```text
«REM»
Templates to generate Sculptor implementation classes as Groovy
«ENDREM»

«IMPORT sculptormetamodel»
«EXTENSION extensions::helper»
«EXTENSION extensions::groovyhelper»
«EXTENSION extensions::properties»

«DEFINE Groovy FOR DomainObject»
«FILE groovyFileName(getDomainPackage() + "." + name) TO_SRC»
«javaHeader()»
package «getDomainPackage()»;

«IF formatJavaDoc() == "" -»
/**
 * Data transfer object for «name». Properties and associations are
 * implemented in the generated base class {@link «getDomainPackage()».«name»Base}.
 */
«ELSE -»
«formatJavaDoc()»
«ENDIF -»
«EXPAND templates::DomainObject::domainObjectSubclassAnnotations»
public «getAbstractLitteral()»class «name» extends «name»Base {
        «EXPAND templates::DomainObject::serialVersionUID»
    «IF getLimitedConstructorParameters().isEmpty || getMinimumConstructorParameters().isEmpty»public«ELSE»protected«ENDIF» «name»() {
    }

    «EXPAND templates::DomainObject::propertyConstructorSubclass»
    «EXPAND templates::DomainObject::limitedConstructor»
    «EXPAND templates::DomainObject::minimumConstructor»

}
«ENDFILE»
«ENDDEFINE»


«DEFINE GroovyService FOR Service»
    «FILE groovyFileName(getServiceimplPackage() + "." + name + "Impl") TO_SRC»
«javaHeader()»
package «getServiceimplPackage()»;

/**
 * Implementation of «name».
 */
«IF isSpringAnnotationToBeGenerated()»
@org.springframework.stereotype.Service("«name.toFirstLower()»")
«ENDIF»
«IF webService»
«EXPAND webServiceAnnotations»
«ENDIF»
public class «name»Impl extends «name»ImplBase {

    public «name»Impl() {
    }
    «EXPAND templates::Service::otherDependencies»

    «EXPAND templates::Service::implMethod FOREACH operations.select(op | op.delegate == null && op.serviceDelegate == null)
        .reject(e|e.hasHint("EventSourcingScaffold")) »
}
    «ENDFILE»
«ENDDEFINE»
```

**Xtend helper function**

The last step is to define the helper function used above to return the groovy file name.

Create src/main/resources/extensions/groovyhelper.ext:

```java
import sculptormetamodel;

String groovyFileName(String name) :
    name.replaceAll("\\.", "/") + ".groovy";
```

**Model file**

Finally, to use this, add the hint to whatever Service or Domain classes you need it for in your model file:

```text
Service MyService {
    gap
    hint="gapImpl=groovy"
    ...
}
```
