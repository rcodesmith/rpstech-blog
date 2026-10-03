---
title: "Type-checked JavaScript : TypeScript and Flow"
date: 2015-10-02
categories: 
  - "software-dev"
tags: 
  - "javascript"
---

The last couple systems I've been working on have been almost completely JavaScript, with a bit of Python thrown in where it made sense.

Working in a dynamic language like JavaScript, small mistakes like mistyping a symbol name don't get caught by a compiler as they do in statically typed languages. Instead they come up during runtime when that code is executed, or worse, they won't fail right away, leading to incorrect results or failure somewhere else. To mitigate this, it becomes even more important to use unit testing extensively. If you have an extensive set of unit tests that verify almost every line of code, they'll catch these syntax/typing bugs in addition to functional bugs.

But verifying almost every line of code with unit tests is very difficult, and I've rarely seen it done. Also, it'd be nice to get more immediate feedback of a syntax error, in the IDE/editor, even before running unit tests. Additionally, static typing serves as a form of documentation in the code, and enables IDEs to more accurately auto-suggest completions, which cuts down on the amount of time you spend looking up function and variable names from other modules.

That's not to say the answer is to only use statically-typed languages. There's many benefits to dynamic languages and reasons we're using them in the first place.

Ideally, I'd like to have an optional typing system where typing can be specified where it makes sense, and not where it doesn't add enough value or is impossible due to the dynamic nature of the code. Additionally, the system should be smart, using type inference to cut down on the amount of type annotations that need to be made.

Lucky for us, JavaScript has a couple excellent options that aim to do just that.

One option is [TypeScript](http://www.typescriptlang.org/), backed by Microsoft. TypeScript supports React via a plugin, and is used by Angular 2. TypeScript has been around for several years, and has a rich set of [type definitions available for popular JavaScript libraries](https://github.com/borisyankov/DefinitelyTyped).

TypeScript is a separate language that transpiles to JavaScript. It's a superset of JavaScript, so anything that works in JavaScript should work in TypeScript, and they've worked to keep up with JavaScript and supporting ES6 features.

Another option is [flow](http://flowtype.org/), backed by Facebook. Coming from Facebook, it has good support for React. Flow is a relatively new option, released in 2014, so doesn't have as much of an ecosystem as Typescript and doesn't have many type definitions for 3rd party libraries, although [supporting TypeScript's definitions](https://github.com/facebook/flow/issues/7) is on their roadmap.

Flow makes more extensive use of type inference, so it's able to infer types and detect errors without requiring as much explicit type annotations.

Flow has a different philosophy than TypeScript. The philosophy behind flow is to make the minimal amount of additions to JavaScript to facilitate type checking. Rather than being a separate language, flow is based on JavaScript, only extending the language with type annotations. These type annotations are stripped out by a simple transformer or via a transpiler such as [Babel](https://babeljs.io/) if you're using that already. Also, it's easier to gradually adopt Flow for an existing codebase as you can enable it module by module, use a 'weak' mode for adapting existing modules, and gradually add annotations.

My project is starting with a significant ES6 code base. We're pretty happy with ES6 as it is, so the main thing I'm looking for is to add type checking rather than a new language. Based on these factors, we decided to try out flow.

In a future post I'll write about our experience with trying out flow, and steps to adopt it into an existing codebase.
