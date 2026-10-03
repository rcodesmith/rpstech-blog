---
title: "Web development for iPhone"
date: 2007-07-06
categories: 
  - "general"
tags: 
  - "general"
---

Apple has posted [guidelines](http://developer.apple.com/iphone/) for developing web applications for the iPhone. Apple has not provided an SDK for developing applications, so for now this is the only way to create applications for the iPhone.

The guidelines tell us how to best construct web pages for Safari on the iPhone, how to optimize media served up to the iPhone, what technologies are in (JavaScript, AJAX, most rich media formats), and what technologies are out (Flash, Java applets, plugins). They also tell us how to create links in web pages to the phone, mail, and Google maps applications so that phone numbers in applications can automatically dial a phone number, etc.

I actually think this is a pretty good development model for many types of applications. Since everything is using standard web technologies (XHTML, JavaScript, DHTML, AJAX), there's an army of developers that already have the necessary skills, and adapting an existing web application to work well on the iPhone will be much less work than rebuilding it for a custom SDK. Due to AJAX and frameworks such as [GWT](http://code.google.com/webtoolkit/), the usability gap between desktop UIs and web application UIs has narrowed considerably.

To me, the one big missing piece in this model is the ability to store data offline, along the lines of [Google Gears](http://code.google.com/apis/gears/). Google Gears is a browser plugin and includes [SQLite](http://www.sqlite.org/), a very capable embedded RDBMS. This would allow applications to be delivered to the iPhone that can work online or offline, storing their data locally on the iPhone, and syncing up with servers when connected. I want my applications to work when there isn't good EDGE nor WiFI network coverage. I would think twice about choosing the iPhone as the platform for that new sales team application if I knew it would only work if the sales guy was in an EDGE-covered area. I would like to be able to use Google reader to catch up on my RSS feeds even if I'm on the train and I keep losing my net connection. The only downside that comes to mind is storing application data in this manner will tend to use up the iPhone's flash memory (4 GB or 8 GB).

Although I like the idea of developing applications for the iPhone using standard web technologies, I hope Apple will make an iPhone SDK available soon so developers can create applications that can take fuller advantage of the iPhone's resources. I can't create a voice memo application as a webapp.
