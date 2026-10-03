---
title: "Java multiple dispatch / multimethod libraries"
date: 2011-06-23
categories: 
  - "java"
---

Multiple dispatch (aka multimethods) is a method dispatch feature of some languages whereby the method that is dispatched to is based on the _runtime_ type of the method arguments, not just the runtime type of the class being called (single dispatch polymorphism), and compile-time type of the method arguments.

Java doesn't support multiple dispatch at a language level, but fortunately, it can be implemented in a library.

A simple test program to show Java behavior:

\[java\] public class Mapper {

static abstract class Content {}

static class Link extends Content {} static class Message extends Content {} void map(Content c) { System.out.println("shouldn't get here!"); } void map(Link l) { System.out.println("It's a Link"); } void map(Message m) { System.out.println("It's a message"); } public static void main(String\[\] args) { Mapper mapper = new Mapper(); Content c1 = new Link(); Content c2 = new Message(); mapper.map(c1); mapper.map(c2); } }

\[/java\]

The output for the above test program is: \[shell\] shouldn't get here! shouldn't get here! \[/shell\]

Java is dispatching to the overloaded _map_ method based on the compile-time type of c1 and c2, which is the Content class. The above example is a bit contrived, but it shows that when working with base class references, for instance if you are working with a List of Content objects, Java won't dispatch based on the runtime type.

I set out looking for a library that would implement multiple dispatch. I was a bit surprised the Google Guava library didn't implement it. This seems to be right up their alley. What I did find was the following implementation: [jmultimethod](http://logand.com/blog/jmultimethod/index.html)

Nice and simple, multiple dispatch using annotations and reflection.

Using jmultimethod, our test program becomes:

\[java\] package org.sculptor.mapprovisions.domain;

import jmultimethod.Multi; import jmultimethod.Multimethod;

public class Mapper {

// Object responsible for doing the dispatching protected static Multimethod mapMM = new Multimethod("map", Mapper.class);

static abstract class Content {}

static class Link extends Content {} static class Message extends Content {} @Multi("map") public void map(Content c) { System.out.println("shouldn't get here!"); } @Multi("map") public void map(Link l) { System.out.println("It's a Link"); } @Multi("map") public void map(Message m) { System.out.println("It's a Message"); } public static void main(String\[\] args) { Mapper mapper = new Mapper(); Content c1 = new Link(); Content c2 = new Message(); // Invoke the multiple-dispatch method "map" on mapper, passing c1 as an argument mapMM.invoke(mapper, c1); // Invoke the multiple-dispatch method "map" on mapper, passing c2 as an argument mapMM.invoke(mapper, c2); } } \[/java\]

The new output is: \[shell\] It's a Link It's a Message \[/shell\]

I'd still prefer to have it directly supported by Java, but it's good to have this solution when needed.
