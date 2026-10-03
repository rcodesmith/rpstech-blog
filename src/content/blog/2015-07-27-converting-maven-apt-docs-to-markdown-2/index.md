---
title: "Converting Maven APT docs to Markdown"
date: 2015-07-27
categories: 
  - "general"
  - "software-dev"
  - "tools"
tags: 
  - "apt"
  - "markdown"
  - "maven"
---

In a project I worked on many moons ago we were writing documentation in the [APT](https://maven.apache.org/doxia/references/apt-format.html) format, and publishing to HTML and PDF using a [Maven](https://maven.apache.org/)\-based toolchain.

APT served us well, but it hasn't been supported or improved by the community in a long time. When the time came to update the documentation for a major release, we decided to switch to using [Markdown](http://daringfireball.net/projects/markdown/), which was a format everyone was already familiar with, and allowed the team to take advantage of all the tools, such as Sublime plugins, that support Markdown.

Converting APT documents to Markdown is a two step process of APT -> XHTML -> Markdown using the [Doxia](http://maven.apache.org/doxia/index.html) converter which can be downloaded [here](http://repo.maven.apache.org/maven2/org/apache/maven/doxia/doxia-converter/) and the excellent swiss-army document format conversion tool [Pandoc](http://pandoc.org/):

```
# Converting over the existing APT docs to XHTML via Doxia converter
> java -jar ~/Downloads/doxia-converter-1.2-jar-with-dependencies.jar -in your_doc.apt \
  -from apt -out ./ -to xhtml

# Convert resulting XHTML to Markdown
> pandoc -o your_doc.md your_doc.apt.xhtml
```

The end result will require a bit of manual fixing up, but in my experience it was pretty minimal and beats doing it manually or writing your own converter.
