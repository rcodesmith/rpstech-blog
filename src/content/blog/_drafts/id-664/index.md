---
title: "documentation chain"
draft: true
---

Getting error like:

```
! LaTeX Error: Unknown graphics extension: .dot.png.
```

Problem is that it's interpreting everything after the first . as the extension.

From http://tex.stackexchange.com/questions/110513/unknown-graphics-extension-1-png, one solution is to use the grffile package:

```
\usepackage{graphicx}
\usepackage{grffile}
```

I haven't delved into LaTex before, so this is something new.

If you want to customize pandoc templates, easiest way is to clone following and track it with your changes in a separate branch:

```
https://github.com/jgm/pandoc-templates
```

Latex engine xelatex doesn't have this engine. Can specify to use via following pandoc option:

```
--latex-engine=xelatex
```
