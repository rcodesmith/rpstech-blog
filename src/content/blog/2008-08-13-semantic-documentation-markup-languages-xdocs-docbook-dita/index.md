---
title: "Semantic documentation markup languages: XDocs, DocBook, Dita"
date: 2008-08-13
categories: 
  - "tools"
---

I've been using the Maven [XDoc](http://maven.apache.org/doxia/references/xdoc-format.html) markup language for documenting design on a client project. Looking into editors for XDoc led me to taking a closer look at [DocBook](http://www.docbook.org/), and [Dita](http://en.wikipedia.org/wiki/Darwin_Information_Typing_Architecture), a relative newcomer. All of these formats allow you to write documentation in a semantic manner, separate from the presentation. You can then generate HTML, PDF, RTF, etc from your document using your choice of transformers. DocBook has been around the longest, but is still active, with the 5.0 version recently released.

The best editor for these formats I've found is [XMLMind XMLEditor](http://www.xmlmind.com/xmleditor/). [Here](http://wiki.apache.org/velocity/EditXdocs) is information on using XMLEditor to edit XDoc documents. The latest version of XMLEditor supports DocBook v4 and v5 out of the box, and support for Dita can be downloaded as a plugin. Currently I'm leaning towards using DocBook for technical documentation due to its wider support, although Dita sounds interesting.
