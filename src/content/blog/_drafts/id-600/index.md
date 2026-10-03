---
title: "Bower and components with coffeescript"
draft: true
---

[Writing Reusable AngularJS Components with Bower](http://briantford.com/blog/angular-bower.html)

When using components, the expectation seems to be that the application including the components, will 'compile' (minify, uglify, etc) their code. The files to be processed are listed in the index.html with directives like:

```
<!-- build:js scripts/plugins.js -->
<script src="bower_components/jquery/jquery.js"></script>
<script src="bower_components/bootstrap-sass/js/bootstrap-affix.js"></script>
<script src="bower_components/bootstrap-sass/js/bootstrap-alert.js"></script>
<script src="bower_components/bootstrap-sass/js/bootstrap-dropdown.js"></script>
<script src="bower_components/bootstrap-sass/js/bootstrap-tooltip.js"></script>
...
<!-- endbuild -->
```

For development, use 'bower link' so changes in the component code are automatically picked up when running the parent application.

'bower link' is very simplistic; it simply creates a symbolic link to the working directory of the linked-to component. This is different than how it works when including the distributed artifacts of an app, so you should be mindful of the differences (e.g. you'll see a 'dist' directory when using 'bower link', which you won't see in the distributed version).

If you want to use the distributed version of a component, but not push to a remote repository, you can also use locally registered packages. See [stackoverflow: bower registering local git package](http://stackoverflow.com/questions/13114781/bower-registering-local-git-package)

You can run your app in development mode using:

```
grunt server
```

If you want to test it out exactly as it'll be in production, just serve up the files in 'dist' using a web server. I'm using python SimpleHTTPServer, which is built into MacOS and every Linux distro.

```
$ cd /home/somedir
$ python -m SimpleHTTPServer
```

Small trick, in bower.json, you can specify a specific git branch for your dependencies:

```
"topicoAngularService": "git@bitbucket.org:rsmith72/angular-topico-services.git#rontest"
```
