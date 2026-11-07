---
title: "Fornax Sculptor DSL tool: Switching an existing app to MongoDB"
date: 2010-09-05
categories: 
  - "mdsd"
---

[Fornax Sculptor](http://fornax.itemis.de/confluence/display/fornax/Sculptor+%28CSC%29 "Fornax Sculptor") is a DSL, Eclipse-based editor, and set of code generators used to build Java/JEE applications.  You define your model and other parts of your application in the Sculptor textual DSL, and the Sculptor model transformations and code generators generate Java code, Spring configuration, Hibernate mappings, and UI code.  Of course, Sculptor only takes you so far, which is where you supply your own code via extension points and composition/delegation, but Sculptor goes a long way to minimize repetitive code, and keeping you working closer to the actual problem domain.  You can also customize and extend Sculptor via the excellent Eclipse MDSD tools (Xtext, MWE, Xpand, Xtend, Check) that Sculptor is based on.

I've been building a JEE application using Sculptor, based on JSF2, Hibernate, MySQL, and Spring.  The latest release of Sculptor added support for MongoDB and Events.  I've been looking to eventually migrate this application to a distributed & schema-less database, and more of an Event-Driven architecture, so I decided to try converting it.  All in all it went very smoothly.  Following are my notes on switching over a Sculptor application from Hibernate to MongoDB.

**Updating the Maven POM and Sculptor configuration**

First, remove mysql, hibernate, spring-jdbc and related dependencies from the business tier project pom, then add the following dependency:

```xml
<dependency>
    <groupId>org.fornax.cartridges</groupId>
    <artifactId>fornax-cartridges-sculptor-mongodb</artifactId>
    <version>${sculptor.version}</version>
</dependency>
```

Then modify sculptor-generator.properties to switch the persistence tier from Hibernate to MongoDB.  Comment out:

```properties
#db.product=mysql
```

and add:

```properties
nosql.provider=mongoDb
```

Run a build:

```sh
mvn clean install
```

**Fix domain concrete classes**

If you have domain classes with gap classes, as I had, you'll have some compile errors due to JPA-isms that are in the domain concrete classes. Since these concrete domain classes are generated only once, they don't get overwritten on the next build and still have the JPA-specific code in them. Edit each concrete domain class that has a gap class, and remove the JPA-isms:

```java
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "LINK")
public class Link extends LinkBase {
```

The domain base classes don't have to be modified, because they're regenerated each build.

**Fix references to entity unique IDs in your custom code**

Another difference with the MongoDB persistence layer is that the entity unique IDs are Strings rather than Longs. Any place in your hand-written code that uses entity IDs, you'll need to make this change.

**Fix service and repository unit tests**

When using the JPA-based persistence tier, the service tests  are based on dbunit, which won't work with MongoDB.  I did a quick search and didn't find a dbunit-equivalent for MongoDB.  The Sculptor MongoDB test samples use a technique of setting up test data using Java code and the repository classes:

```java
package my.application.serviceapi;

...

/**
 * Spring based test with MongoDB.
 */
@RunWith(org.springframework.test.context.junit4.SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations =  {
    "classpath:applicationContext-test.xml"}
)
public class LinkServiceTest
    extends AbstractDependencyInjectionSpringContextTests
    implements LinkServiceTestBase {
    @Autowired
    private DbManager dbManager;
    @Autowired
    private LinkService linkService;

    @Before
    public void initTestData() {
        // Set up your test fixtures here:
        Link link1 = new Link("http://some.com", "Some title");
        linkService.save(link1);
    }

    @Before
    public void initDbManagerThreadInstance() throws Exception {
        // to be able to do lazy loading of associations inside test class
        DbManager.setThreadInstance(dbManager);
    }

    @After
    public void dropDatabase() {
        Set<String> names = dbManager.getDB().getCollectionNames();
        for (String each : names) {
            if (!each.startsWith("system")) {
                dbManager.getDB().getCollection(each).drop();
            }
        }

        // dbManager.getDB().dropDatabase();
    }

    private int countRowsInDBCollection(String name) {
        return (int) dbManager.getDBCollection(name).getCount();
    }

    @Test
    public void testFindById() throws Exception {
        // Your test code and assertions here...
    }

}
```

Simply set up your test fixtures using your service/repository classes or the MongoDB DbManager within the initTestData() method.

**No support for findByQuery repository method**

When building, I got errors such as:

```text
.../LinkAccessFactoryImpl.java:[21,66] cannot find symbol
symbol  : class MongoDbFindByQueryAccessImpl
location: package org.fornax.cartridges.sculptor.framework.accessimpl.mongodb
```

This is odd since LinkAccessFactoryImpl is a generated class. The cause of this error was that I have findByQuery as one of my scaffolding operations that is generated for every repository. But this type of method isn't supported by the MongoDb cartridge. In the future it'd be nice if there was a model validation that checked for this and generated an error before generating code. To fix this, remove findByQuery from the list of default scaffolding operations in scupltor-generator.properties, if you have it there at all:

```properties
#scaffold.operations=findById,findAll,save,delete,findByQuery,findByKey,findByCondition
scaffold.operations=findById,findAll,save,delete,findByKey,findByCondition
```

**Fix bidirectional associations between aggregate roots**

I had a bidirectional association between domain aggregate roots that caused problems. I had something along the lines of:

```text
Entity A {
aggregateRoot

- Set<@A> children <-> parent

- @A parent nullable <-> children
}
```

This resulted in an endless loop in the generated data access code, because it was following both the parent and children associations when mapping the objects to a MongoDB document.

In hindsight, I think this should _not_ be supported within Sculptor when using the MongoDB cartridge. It may make sense for relational databases, but since MongoDB doesn't support transactions across collections (ditto for most other NoSQL databases), it cannot be guaranteed that both sides of the association will be updated as a unit of work. This also makes distributing your database across many nodes much more complicated. I changed my model to make this a unidirectional association, problem solved.

An interesting point is that with MongoDB and similar databases, the association reference is stored on the "one" side of the association, rather than the "many" side as with relational databases. The document at the "one" side of the association contains a list of IDs of the "many" instances.

Tip: To see how Sculptor maps entities to MongoDB documents, see the "mapper" package within your app.

**Add DbManagerFilter to web.xml**

Lastly, I had to add the DbManagerFilter servlet filter to the web.xml file. This filter registers a DbManager instance in a thread local so that it may be used to lazy-load associations as needed within your JSF managed bean/Facelets code.

```xml
<filter>
  <filter-name>dbManagerFilter</filter-name>
  <filter-class>org.fornax.cartridges.sculptor.framework.accessimpl.mongodb.DbManagerFilter</filter-class>
</filter>
<filter-mapping>
  <filter-name>dbManagerFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

Overall the switch to MongoDB went very smoothly, and there were very few changes I had to make, largely thanks to Sculptor. The most significant change was switching the unit tests from using dbunit to using Java test fixtures.
