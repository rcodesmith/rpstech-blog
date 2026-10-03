---
title: "This blog is now an OpenID"
date: 2007-10-04
categories: 
  - "web"
tags: 
  - "security"
---

\[update: when I switched to WordPress, I made [http://rpstechnologies.net/ron](http://rpstechnologies.net/ron) my OpenID page - see that URL instead of this blog for the OpenID headers\]  

This blog is now my [OpenID](http://en.wikipedia.org/wiki/OpenID). OpenID is a decentralized single sign-on system for the web. I'd been hearing about it for a while, and when I looked into it, I liked what I saw, so started using it for [Magnolia](http://ma.gnolia.com/) and [Plaxo](http://www.plaxo.com/). Unlike single sign-on systems such as MS Passport, OpenID is completely open in licensing and implementations, and is truly decentralized. Anyone can set up to be an OpenID provider, and there are several options including [myOpenID](https://www.myopenid.com/), [Verisign](https://pip.verisignlabs.com/), [AOL](http://dev.aol.com/aol-and-63-million-openids), and open source providers. I also like that it's a simple system and relatively easy to implement. There are several OpenID libraries, including libraries for Java, Python, Ruby, and PHP.

When using OpenID, a URL is your unique identifier, which you use to sign into websites that support OpenID. Normally the URL is hosted on a OpenID provider such as myOpenID (e.g. http://rsmith847.myopenid.com/). But OpenID also supports delegation, where you can use any web page as your OpenID. For this to work, the web page you want to use as your OpenID has to have some tags in the header that instruct any OpenID consumer (the site you're trying to log into) to go to your OpenID provider to sign you in. Why this extra level of indirection? So you can use the same web page as your OpenID even if you change OpenID providers. Simon Willison's [blog](http://simonwillison.net/2006/Dec/19/openid/) has clear instructions on how to set up any web page as an OpenID.

So if you look at the source for this web page, you'll see two tags at the bottom of the header, which point to my OpenID provider (myOpenID at the moment). For some reason Plaxo had problems accepting my web page URL as an OpenID, so I had to fall back to using my myOpenID URL. Magnolia had no problems with it.

Technorati Tags: [openid](http://technorati.com/tag/openid)  
  

