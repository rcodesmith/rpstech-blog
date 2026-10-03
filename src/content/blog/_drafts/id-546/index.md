---
title: "Image scaling"
draft: true
---

Setting size in Preview while turning of scaling gave me what I wanted.

Not sure if anything here: http://stackoverflow.com/questions/244164/resize-an-image-in-java-any-open-source-library

Sips program: http://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/sips.1.html

This may be the way: http://stackoverflow.com/questions/321736/how-to-set-dpi-information-in-an-image

580 sips -g all temp.png

588 sips --setProperty dpiWidth 599.980 temp.png 589 sips --setProperty dpiHeight 599.980 temp.png
