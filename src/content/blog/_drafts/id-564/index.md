---
title: "grails security and CORS requests"
draft: true
---

https://developer.mozilla.org/en-US/docs/HTTP/Access\_control\_CORS

https://github.com/davidtinker/grails-cors

working fine, problem comes in with POST requests that cause the browser to "preflight" the request via an OPTION request that is first sent to check if the server allows CORS requests.

https://coderwall.com/p/2s9h3g

http://grails-plugins.github.io/grails-spring-security-core/docs/manual/guide/single.html#5.2%20Simple%20Map%20in%20Config.groovy

grails.plugins.springsecurity.rejectIfNoRule = true

Move security assertions into annotations in controller,

and allow options request.

```
    // RESTful resource mapping
    name restResource: "/rest/resource/$spaceId/$id" (parseRequest: false) {
        controller = "resource"
        action = [GET: "show", PUT: "update", POST: "update", DELETE: "delete", OPTIONS: "options"]
        constraints {
            spaceId matches: /\w+/
            id matches: /\w+/
        }
    }
```
