---
title: "Grails security"
date: 2009-06-01
categories: 
  - "grails"
tags: 
  - "grails"
---

I'm working an a Grails-based project which requires security, as pretty much every web application does. My high level requirements are:

- Role-based access control
- Database-based authentication (passwords stored in database)
- Simple to use
- Good documentation
- Ability to model permissions for finer granularity authorization than role (nice to have)
- Captcha support (nice to have)
- OpenID support (nice to have)
- Facebook Connect support (nice to have)

From browsing the list of Grails plugins, it looks like there are two that fit the bill, each based on well-established Java security frameworks. Here are my notes on each:

**[JSecurity plugin](http://www.grails.org/plugin/jsecurity)**

- Based on [JSecurity](http://www.jsecurity.org/) framework (now [Apache Ki](http://incubator.apache.org/ki/))
- API includes classes for user, roles, and permissions.
- Support for role and permission-based authorization, which I prefer to use[](http://www.grails.org/JSecurity+Plugin+-+Quick+Start)
- [Quick Start Guide](http://www.grails.org/JSecurity+Plugin+-+Quick+Start) has example of users and roles being created
- Access control is declaratively configured, pointing to the controller & action
- AuthController is responsible for common auth functions (logout, login) & login page-
- Different authentication schemes (e.g. LDAP, database based auth) supported via realms
- Supports database-based authentication (passwords stored in database)
- OpenID support : not directly supported in JSecurity yet, but people have gotten it working at Grails level by integrating with OpenID plugin
- Documentation looks good, but not as much available as the Spring Security plugin

**[Spring Security plugin](http://www.grails.org/plugin/acegi)**

- Based on [Spring Security](http://static.springframework.org/spring-security/site/index.html) (Acegi security) framework
- Supports database-based authentication (passwords stored in database)
- Supports OpenID and Facebook connect for authentication
- Also supports LDAP, Kerberos, CAS, NTLM for authentication
- Support for role-based authorization
- User and Role Groovy classes are generated. These may be customized after generation (e.g. to add attributes).
- Generates a simple registration page with password confirmation and CAPTCHA support
- Pages and actions security mappings (which pages/actions should be access controlled) can be stored in database, as annotations in the Controller, or using the standard URL string mapping supported by Spring security
- Good [documentation](http://www.grails.org/AcegiSecurity+Plugin)

Both plugins look very capable and meet my core requirements. Support for OpenID is a big plus for me so I went with Spring Security. I've been using it for about a week now. I may jot down some notes on it in a future post.

BTW, this to me is one of the huge advantages of dynamic language frameworks on the JVM; the ability to tap into mature, very full-featured existing Java frameworks, libraries, and drivers. This is particularly true for Grails, since it so heavily leverages existing frameworks (e.g. Spring, Hibernate).
