---
title: "Version control systems: Going decentralized"
date: 2007-09-03
categories: 
  - "tools"
tags: 
  - "vcs"
---

I've used a number of version control systems over time, starting out with SCCS and RCS. I used CVS for many years for my own work and for client projects where CVS could be used. For the last 4 years I've been using and recommending Subversion, a relatively recent centralized version control system. Subversion is a big improvement over CVS, and I've found it to be a good VCS, but it still suffers from problems common to all centralized version control systems.

In a centralized version control system, there's a single repository that tracks the changes to all files, and any version control operations (check out, commit, merge, etc) must go through the central repository. Lately I've been tracking the decentralized version control systems that have come out and have been getting attention. As the name implies, in a decentralized version control system, there isn't a single central repository and server responsible for tracking changes to files. In a decentralized version control system, you can have any number of repositories tracking changes to the same set of files. Each repository is as fully capable as the next and able to carry out all of the version control operations (commit, checkout, merge, etc) on the files. No repository is inherently more important than another. The changes to files (change sets) can be pushed and pulled from one repository to another. Although no repository is inherently more important than another, when teams work with decentralized version control systems, they typically designate one repository as the "master" repository to which all changes ultimately get pushed and from which other repositories can pull changes. Another variation on this is to have two or more "master" repositories which exchange change sets between them. This model of having multiple repositories extends all the way down to the workstation. In most decentralized VCSs, developers work off a local repository, which is just as full fledged and capable as any "master" repository.

There are several real world "itches" I experienced that got me looking into decentralized version control systems:

**Working offline**

I sometimes work somewhere that doesn't have a connection to the central Subversion repository - either I'm working somewhere without an internet connection, or don't have a connection to the internal network where the Subversion repository resides. This is actually not that uncommon for me. With a central repository, this means I can't rename files in Subversion, commit changes, create a new branch to work on an independent change, merge work, etc. I'm basically limited to editing files without renames/moves. With a decentralized VCS, I could do everything I can do with a central repository while disconnected, because every developer has a full fledged repository they are locally working from. When I'm again connected with the "master" repository, I can push my changes up to it.

**Delays in getting central VCS repository set up**

Sometimes getting a new repository added to a centralized VCS for a new project can take quite a while. The repository has to be set up, permissions have to be granted, and the person responsible for it may be out, or have a million other things to do. Until the repository is set up, the team has to share source code by some other means (email, etc) which is error prone and no versioning information is captured. With a decentralized VCS, a team could start working together using their own repository, then push all of the changes into a "master" repository when it becomes available. The team is able to get work done without being blocked, and the system administrators are able to control access to the authoritative VCS.

**Distributed teams with poor network access**

When working with distributed teams, the network access for offsite teams has frequently been average to poor. Sometimes connectivity to the central repository goes down altogether, and when connectivity is up, operations such as commits, merges, and updates from the repository are painfully slow. Teams work around this by falling back to sharing code via email (error prone, cumbersome), or holding off sharing changes, which makes for muddled commits and makes integration more difficult.

**Moving a repository from one server to another**

Sometimes you need to switch a VCS repository from one server to another; maybe the server needed to be used for something else, a more powerful server was needed, or the VCS repositories were being consolidated onto fewer servers. With a centralized VCS, when this happens, the entire team needs to switch over at the same time. This means that any changes that are going on have to be committed (hopefully they don't break the build), the repository has to be copied over to the new location, the continuous integration process needs to be switched over, and all developers need to switch their workstations to point to the new repository. Needless to say this disrupts development and incurs a real cost.

With a decentralized VCS, the new repository could be set up with a copy of the old repository while the old repository is still being used. The continuous integration process and developers could gradually switch to the new repository when practical (e.g. after completing development of a story). All the while, the new repository can pull any changes that are committed to the old repository, ensuring the new repository is up to date. You could also have changes committed to the new repository flow back to the old repository while it is still in use. Whenever you have migrated all of the processes and people to the new repository, the old repository can be turned off. Everything has switched over without disrupting development.

**Repository going down**

Unfortunately, VCS servers do go down, more frequently than it seems they should. Usually you just need to restart the server process, but sometimes hardware failures can take the repository down for longer periods. If you are diligent about keeping backups of your repository, maybe you can get back up and running without much delay. The worst case of this I remember was when using ClearCase in a large development team where everyone used virtual views, which was recommended by the ClearCase admins. When the ClearCase server went down, no one could even access their code (since the files are served up from a virtual filesystem by ClearCase), so most of the development team just went home after a couple hours of being down. I've heard that ClearCase virtual views aren't recommended for this reason, but I don't know enough about the intricacies of ClearCase to say.

If using a decentralized VCS, you can set up one or more mirrors of the main VCS repository, so if one goes down, people can use one of the others without interrupting development. Also, since everyone has a full repository on their workstations, it's pretty easy to clone one of those repositories and set up a temporary main repository for everyone to push/pull changes to. But for short outages, the development team likely won't even notice since people mostly work off their local repository and holding off from pushing changes to the main server for a while isn't a big deal. In short, a decentralized VCS is much more fault tolerant than a centralized VCS.

There are several capable decentralized version control systems available, including [Bazaar](http://bazaar-vcs.org/), [Mercurial](http://www.selenic.com/mercurial/wiki/), [SVK](http://svk.bestpractical.com/view/HomePage), [GIT](http://git.or.cz/), and more. Some of these are being used on major open source projects such as the open source JDK, OpenSolaris, and the Linux kernel.

Since this post is getting lengthy, I'll follow up with another post on my experience after having switched to a decentralized VCS.
