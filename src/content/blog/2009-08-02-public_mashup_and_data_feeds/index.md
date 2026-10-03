---
title: "Public mashup and data feed APIs"
date: 2009-08-02
categories: 
  - "software-dev"
  - "web"
---

I'm doing some research for a possible venture.  A part of this venture would fall into the mashup category - pulling information from other sites and services, and combining it in a unique way.  Following are my initial notes on some interesting APIs and information feeds:

[Programmable Web](http://www.programmableweb.com/) is a great resource for those building mashups - it has a directory of APIs and Mashups that make use of those APIs.  The blog post "[Top Twenty Open APIs and Mashup Resources for Web Developers](http://compassioninpolitics.wordpress.com/2009/06/03/best-free-apis-for-web-developers/)" lists some of the most popular APIs.

[Google Transit Feed Specification](http://www.google.com/url?sa=t&source=web&ct=res&cd=1&url=http%3A%2F%2Fcode.google.com%2Ftransit%2Fspec%2Ftransit_feed_specification.html&ei=_BJ1Sv-hFo2csgPEgrX0CA&usg=AFQjCNGgPEnU4imJ3Z-gjXzAYe3IsJr0sA)

- Provides information on stops, routes, calendar, fares, frequencies, usage policies
- Unfortunately, only available for a limited set of metro areas

[Google Maps AJAX API](http://code.google.com/apis/maps/):

- AJAX API
- Display map with road, satellite, hybrid, and terrain, by latitude & longitude
- Can respond to user events within the map - e.g. clicking, zooming in/out, panning, etc
- Can manipulate map via JavaScript - adding markers, changing location, zoom, etc
- Can create various types of overlays on the map
- Includes google street view

[Google AJAX Feed API](http://code.google.com/apis/ajaxfeeds/)

- Include any RSS or ATOM feed on your site, with various presentation options

[OpenSocial](http://code.google.com/apis/opensocial/)

- Common API for multiple social networking sites, including hi5, LinkedIn, MySpace, Netlog, Ning, orkut, and Yahoo.  Unfortunately Facebook is not one of them.
- JavaScript APIs for client side and REST/RPC APIs for server side
- Can be used to create apps that are embedded in social networking sites, as well as use user social information (user profile, friend lists, events) from social networks in your site.
- [OAuth](http://oauth.net/) is used to allow users to authorize use of their social network information

[YouTube APIs](http://code.google.com/apis/youtube/overview.html)

- Integrate YouTube functionality into your site: video searches, upload videos, etc
- Integrate video player into your site
- Allow users to see/manage their favorites on your site
- RSS/ATOM data feeds from YouTube

[YELP APIs](http://www.yelp.com/developers/documentation)

- REST APIs
- Retrieve business info and reviews for a geographic region and business category.  This includes the business location, and their categories.
- Retrieve neighborhood name and info by location
- Retrieve reviews for a particular business
- Retrieve business info and pictures
- It looks like this isn't a complete directory - only those businesses and features that have been rated are listed

[Zillow APIs](http://www.zillow.com/howto/api/APIOverview.htm)

- "Neighborhood and city affordability statistics: Zillow Home Value Index, Zestimate distribution, median single family home and condo values, average tax rates, and percentage of flips."
- Demographic data at the city and neighborhood level - local market data, affordability, household income, average age, commute time, etc.
- Home Valuation: "Search results list, Zestimate® home valuations, home valuation charts, comparable houses, and market trend charts."
- Property Details: "Property-level data, including historical sales price and year, taxes, beds/baths, etc."
- Lists of counties, cities, ZIP codes, and neighborhoods, as well as latitude and longitude data for these areas so you can put them on a map.
- "boundaries for nearly 7,000 neighborhoods and 150 cities"  available via Creative Commons license.
- License restricts site from charging money for Zillow data

[Yahoo! Local Web Services](http://developer.yahoo.com/local/)

- REST APIs
- Provides access to public collections created with Yahoo! Local Collections
- Can perform local searches based on location, radius, route, categories: returns results with location info, ratings, categories, etc
- Yahoo Local search web site: http://local.yahoo.com/ - You can see some of the information that's available

[Walkscore API](http://www.walkscore.com/api.shtml):

- Get walk score by location

