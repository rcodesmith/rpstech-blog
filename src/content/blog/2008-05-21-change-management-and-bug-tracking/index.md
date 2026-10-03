---
title: "Change Management and Bug Tracking"
date: 2008-05-21
categories: 
  - "software-dev"
  - "tools"
---

A project I'm involved with is in need of a change management tool, so I'm in the process of re-evaluating the landscape of open source change management tools, and testing a couple out.

Change management is one of those software software development practices that I rarely see implemented in IT projects, although it helps to organize development and cuts down on the more tedious project management activities (gathering status, updating detailed project plans). Change management is similar to defect tracking, which is frequently used, but is broader is scope. Defect tracking is really a subset of change management.

In a change management process, every proposed and actual change to an artifact is recorded and tracked in a change management tool. I say artifact rather than code because it can be used to track changes to requirements, test scripts, documentation, design; not just code. Every change to an artifact and commit to VCS has an associated record in the change management tool associated with it, describing the nature of the change, who requested it, what release it was planned for, etc.

Open source projects seem to more frequently use change management, which isn't surprising considering they are made up of distributed teams who need a good way to keep track of what changes are planned for, and tracking the progress of those changes.

There's a bunch of open source change management tools out there. [Roundup](http://roundup.sourceforge.net/), [JTrac](http://jtrac.info/), [XPlanner](http://www.xplanner.org/), [Scarab](http://scarab.tigris.org/), [Mantisbt](http://www.mantisbt.org/), [ITracker](http://www.itracker.org/), [Trac](http://trac.edgewall.org/), and [Bugzilla](http://www.bugzilla.org/) are the tools I took a look at.

I have several criteria for a change management tool, including:

- Ability to link one change request to another

- This can be used to set up dependencies between changes or defects (this bug has to be fixed before that one can) or to break up large changes into smaller ones to be worked on by different people (e.g. have a change request to track the development of a feature, linked to smaller change requests to track the changes to implement the feature).

- RSS feeds for reports/searchs

- Support for representing enhancements and defects

- Support for components, with the ability to assign change requests to components, and to assign owners for each component

- Easy to administer - Ability to administer products, components, and users through a web UI

- Ability to authenticate against LDAP

- Active development community

- Easy to use, web-based on-demand reporting and charting

- Can run on Windows (it's the box I have)

- Support by [Mylyn](http://www.eclipse.org/mylyn/)

I narrowed the choice down to Bugzilla and Trac, and settled on Bugzilla after installing both. I've used and installed Bugzilla before, so I was already pretty comfortable with it. The Bugzilla Windows installation has come a long way since the last time I tried it (~2001). Back then I gave up and ended up installing Linux on a box just to be able to run Bugzilla. It still requires quite a few steps, but it worked without too much trouble.

I installed stable version 3.0.4 following the instructions at [http://www.bugzilla.org/docs/win32install.html](http://www.bugzilla.org/docs/win32install.html). At a high level, the steps were:

- Download and unpack tarball

- Install MySQL 5.0.51a

- Create Bugzilla database and database user

- Installe ActiveState Perl 5.8.8

- Installed a bunch(!) of Perl packages via bundled PPM tool

- Install & Configure Apache 2.2

- Had to upgrade Email and Mime related Perl packages (see [this](http://ayria.livejournal.com/33438.html) blog posting).

- Download and install Graphviz, and tell Bugzilla where the 'dot' executable can be found (Bugzilla parameters->Dependency Graphs)

- Execute perl collectstats.pl (not sure if this is doing anything)

- I had to execute the following to get graphical reports to work: ppm install Template-GD
