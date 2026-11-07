---
title: "ActiveJDBC: an implementation of the Active Record pattern for Java"
date: 2010-07-28
categories: 
  - "java"
---

Igor Polevoy, who I've had the pleasure of working with on a couple projects, has just posted his [ActiveJDBC](http://code.google.com/p/activejdbc/ "ActiveJDBC") project to Google code.  If you work on Java applications that access relational databases, you owe it to yourself to check it out.

ActiveJDBC implements the Active Record pattern, initially documented by Martin Fowler in his book [Patterns of Enterprise Application Architecture](http://www.amazon.com/Patterns-Enterprise-Application-Architecture-Martin/dp/0321127420/ref=sr_1_1?ie=UTF8&s=books&qid=1280276337&sr=8-1) and popularized by Ruby on Rails.

What's interesting about ActiveJDBC is how little baggage it brings with it, and how quickly one can get started using it.  It's pure Java, requires few other libraries (no Hibernate, JPA, etc), and requires no configuration (no mapping, etc).  All metadata is inferred from the database schema.

Some examples of ActiveJDBC in action:

**Persistent Book class definition:**

```java
import activejdbc.Model;

public class Book extends Model {}
```

**Adding a new Book:**

```java
Book b = new Book();
b.set("isbn", "0321127420")
  .set("title", "Patterns of Enterprise Application Architecture")
  .set("author", "Martin Fowler")
  .set("publisher", "Addison-Wesley Professional");
b.saveIt();
```

**Paging through Addison-Wesley books in sorted order**

```java
List<Book> books = Book.where("publisher = ?", ""Addison-Wesley Professional");
  .offset(11)
  .limit(10)
  .orderBy("author asc");
```

It looks like this framework strikes a good balance between a simple framework that works as you expect, and providing an elegant DSL for database access.  This is particularly impressive given Java as a language doesn't lend itself to implementing DSLs.

One thing I was curious about but didn't see an example of, was working with associations, which is listed on the features page.

For more info, see the [Getting Started Guide](http://code.google.com/p/activejdbc/wiki/GettingStarted "Getting Started Guide") on Google Code, [Igor's blog](http://igorpolevoy.blogspot.com/), and the [Productive Edge Java](http://www.productiveedge.com/java/) blog.
