---
title: "Groovy: declared collection types not working as expected and other surprises"
draft: true
---

I love the Groovy, but using it after being away from it for a while, I keep getting surprised by little things. These are probably known and not considered bugs, but I don't think they're what most developers would expect.

Came across this after refactoring some types from Long to String \[code lang="groovy"\] java.util.List<Long> aList = \['a', 'b'\] println "aList: ${aList}" \[/code\] I'd expect an exception, but instead it outputs: \[code gutter="false"\] aList: \[a, b\] \[/code\]

This on the other hand: \[code lang="groovy"\] Long aNum = 'a string' println "aNum: ${aNum}" \[/code\] Does yield an exception: \[code gutter="false" wraplines="true"\] Caught: org.codehaus.groovy.runtime.typehandling.GroovyCastException: Cannot cast object 'a string' with class 'java.lang.String' to class 'java.lang.Long' \[/code\]

This probably has to do with Java generics type erasure, and Groovy not doing compile-time type checking on the elements being added to the collection. So you can see why it's probably the way it is, but still, it's surprising that you can declare generics types for your collections, but apparently there's no checking occurring.

Another one that's surprising, is that by default the Grails test runner eats stdout and stderr. So any useful log statements and printlns in your code don't go anywhere. To be able to see them, you have to add '-echoOut -echoErr' as options to the test runner command line. Can't imagine why in the world this isn't the default behavior like it is in every other test runner I've used.
