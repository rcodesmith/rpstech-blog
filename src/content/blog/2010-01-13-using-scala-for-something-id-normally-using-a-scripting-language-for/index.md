---
title: "Using Scala for something I'd normally using a \"scripting\" language for"
date: 2010-01-13
categories: 
  - "scala"
---

From time to time, some repetitive task comes up that I can do quicker by writing a script to do it than to do it manually. Especially if it's something I may be needing to do again in the future.

Usually I'd turn to a "scripting" language like Python, Groovy, or back in the day, Perl for this type of thing.

Today such a need came up, and I decided to try tackling it with Scala since it has many of the features that make the above dynamic languages good for this:

- first-class support for map and list data structures
- an interactive shell
- minimal overhead to write a program, compile, and run it
- support for functional programming
- good regular expression support

The problem: A small performance test program ran a large number of tests, and measured the elapsed time for each execution. The program output a line like "request completed in 10451 msecs" for each test. I needed to parse the output, collect the elapsed time measurements, and get some basic statistics on them; simple average, minimum, and maximum.

I used a Scala 2.8 snapshot, and fleshed out the code using the Scala interactive shell. First, define a value with the raw output to be processed:

```scala
scala> val rawData = """request completed in 10288 msecs
     | request completed in 10321 msecs
     | request completed in 10347 msecs
     | request completed in 10451 msecs
     | request completed in 10953 msecs
     | request completed in 11122 msecs
... hundreds of lines ...
     | request completed in 11672 msecs"""
```

The above uses Scala's support for [multi-line string literals](http://langref.org/scala/strings/declaring-strings/multiline).

The next thing I needed to do was parse the above output, using a regular expression to extract just the milliseconds. There's several ways to create a regular expression in Scala. This is the one I like:

```scala
val ReqCompletedRE = """\s*request completed in (\d+) msecs"""r
```

There's a bit of magic in how the above string literal actually ends up becoming a regular expression. There's an [implicit conversion](http://www.scala-lang.org/node/130) in the Scala [Predef object](http://www.scala-lang.org/docu/files/api/scala/Predef$object.html) which turns a Java String into a RichString. RichString provides a 'r' method that returns a regular expression object. The members of the Predef object are automatically imported into every Scala module, so the Scala compiler will attempt to apply any conversions it finds in Predef when trying to resolve the 'r' method. So the above expression is creating a RichString from a String via an implicit conversion, then calling the 'r' method on it, which returns the regular expression.

To apply the regular expression to a line of the output and to extract the milliseconds, we can use an expression like:

```scala
scala> val ReqCompletedRE(msecs) = " request completed in 10451 msecs"
msecs: String = 10451
```

msecs gets bound to the first group in the regular expression (the part that matches (\\d+)). This takes place via the [Scala extractors](http://www.scala-lang.org/node/112) feature - the scala [regular expression class](http://www.scala-lang.org/docu/files/api/scala/util/matching/Regex.html) defines an extractor which extracts the grouping results.

The next step is to iterate over the lines of the output, extract the milliseconds, and turn the results into a list.

```scala
scala> val msecsVals = rawData.lines.map { line => val ReqCompletedRE(msecs) = line; Integer.parseInt(msecs);} toList
res11: List[Int] = List(10288, 10321, 10347, 10451, 10953, 11122, ..., 11672)
```

The above code is using the [RichString lines](http://www.scala-lang.org/docu/files/api/scala/runtime/RichString.html#lines), [Iterator.map method](http://www.scala-lang.org/docu/files/api/scala/Iterator.html#map%28%28A%29%3D%3EB%29), along with Scala closures.

Finally, to get the simple statistics:

```scala
scala> (msecsVals.sum / msecsVals.length, msecsVals.min, msecsVals.max)
res21: (Int, Int, Int) = (10736,10288,11672)
```

Putting the whole script together:

```scala
val ReqCompletedRE = """\s*request completed in (\d+) msecs"""r
val msecsVals = rawData.lines.map { line => val ReqCompletedRE(msecs) = line; Integer.parseInt(msecs);} toList
(msecsVals.sum / msecsVals.length, msecsVals.min, msecsVals.max)
```
