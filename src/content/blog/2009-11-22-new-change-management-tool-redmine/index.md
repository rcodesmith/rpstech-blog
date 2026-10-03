---
title: "New change management tool: Redmine"
date: 2009-11-22
categories: 
  - "software-dev"
  - "tools"
---

I was starting a new project, needed a change management tool, and wasn't really satisfied with the tools available [last time I looked](http://rpstechnologies.net/ron/blog/2008/05/change-management-and-bug-tracking/), so I took a look at what was currently available.  One option I came across that hadn't been on my radar before was [Redmine](http://www.redmine.org/).  
  
Redmine has many of the features I like from [Trac](http://trac.edgewall.org/), such as the Roadmap view, version control integration, an Activity view, and built in Wiki.  It also has a bunch of [plugins](http://www.redmine.org/wiki/redmine/Plugin_List), [one of which](http://www.redmine.org/wiki/redmine/PluginCharts) looks like it'll generate burndown charts, which I'm planning to use.  
  
It looked like Redmine was fairly well supported on Windows (box I have available) so I decided to try it out.  Redmine is based on Ruby on Rails, so the first step to [installation](http://www.redmine.org/wiki/redmine/RedmineInstall) is to get Ruby and Rails installed.  
  
I started off trying to install Ruby and Rails under cygwin, but ran into problems with building mysql from source (no cygwin port for this!).  
  
So instead I went down the route of installing everything outside of cygwin.  Here's a summary of the steps:  

  
- Install the [Windows Ruby binary](http://rubyforge.org/frs/?group_id=167), along with Gem package system.
  
- Install the Rails 2.1.2 gem, which Redmine 0.8.X depends on
  
- Download and unpack the Redmine [distribution](http://rubyforge.org/frs/?group_id=1850)  
    
  
- Setup the database (running on MySQL in my case) and edit database.yml per [instructions](http://www.redmine.org/wiki/redmine/RedmineInstall#Database).
  
- I had to install older MySQL client library due to some Rails/MySQL library incompatibility (described [here](http://forums.aptana.com/viewtopic.php?f=20&t=7563&p=27407&hilit=libmysql.dll#p27407))
  
- Create the database schema for Redmine via:  
    \[bash gutter="false"\]rake redmine:load\_default\_data RAILS\_ENV=&amp;quot;production&amp;quot;\[/bash\]
  
- Populate a default configuration via:  
    \[bash gutter="false"\]rake redmine:load\_default\_data RAILS\_ENV=&amp;quot;production&amp;quot;\[/bash\]
  
- You can then run Redmine via:  
    \[bash gutter="false"\]ruby script/server webrick -e production\[/bash\]
  

  
  

