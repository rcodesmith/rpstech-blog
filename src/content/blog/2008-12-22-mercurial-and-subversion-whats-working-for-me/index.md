---
title: "Mercurial and Subversion : What's working for me"
date: 2008-12-22
categories: 
  - "software-dev"
  - "tools"
---

One popular use of DVCS systems such as Mercurial and GIT is as "super clients" to Subversion, at least until more projects get on the DVCS bandwagon. You get most of the benefits of the DVCS and can still work the rest of the team using Subversion.

I've been using Mercurial to work on a couple projects I'm involved with that have Subversion repositories. GIT has a good bridge to Subversion built in. Unfortunately, Mercurial is a little bit behind on this front, but it looks like things are getting better quickly.

I initially tried out [Tailor](http://progetti.arstecnica.it/tailor/), a general purpose version control bridge tool, which supports Mercurial and Subversion among a bunch of others. I had difficulty getting Tailor to work with the Subversion repository I was working on, and it didn't seem like Tailor was being used much for Mercurial-Subversion.

I've been using the [hgsvn](http://pypi.python.org/pypi/hgsvn) package lately and it's worked out pretty well. The only caveat is that hgsvn doesn't directly support uploading changes from Mercurial back to Subversion. hgsvn does a good job of downloading changesets from Subversion to Mercurial though, and there are a couple solutions to handle the other direction. I've been pushing changes back by using the excellent Mercurial MQ extension.

A new Mercurial-Subversion bridge, [hgsubversion](http://www.bitbucket.org/durin42/hgsubversion/wiki/Home), looks like it supports both downstream and upstream changes from Mercurial to/from Subversion, and looks very promising. I'm just waiting for it to support [importing starting at a particular Subversion revision](http://www.bitbucket.org/durin42/hgsubversion/issue/14/make-it-possible-to-import-history-starting-at-some) before I can start using it.

Until I can use hgsubversion, here is how I've been using hgsvn. I installed hgsvn as a Python egg package via [easy\_install](http://peak.telecommunity.com/DevCenter/EasyInstall):

sudo easy\_install hgsvn

The hgimportsvn command is used to import change sets from an existing Subversion repository into a local Mercurial repository it creates. You can optionally have it start at a particular Subversion revision if you don't need the full history imported:

hgimportsvn \[-r svn rev\] <svn URL> <local directory name>

This creates a combined Subversion working directory and Mercurial repository in the local directory you give it. Once this is done you can update the Mercurial repository with the latest Subversion changesets by executing the following in the local directory:

hgpullsvn

You run hgpullsvn anytime you want to refresh the Mercurial repository with the latest from Subversion. You can then do anything you would do with a Mercurial repository, except committing changes of your own. Cloning, MQ, revision histories, diffs, etc all work. I tried committing a change to the Mercurial repository, then committing the same changes to Subversion, then doing an hgpullsvn to update both from the Subversion repository. This worked at first but the Mercurial repository got out of sync after a while, so I wouldn't recommend it.

What I've been doing is managing the upstream changes via Mercurial Queues (MQ). This also helps me manage patches I want to apply on top of the latest code.

The first time using Mercurial Queues in a repository, you have to initialize the queue repository:

hg qinit -c

The -c option makes it so the queues repository is version controlled. You can then see what older versions of a patch were in case you need to roll back. I'm basically using patches as changesets, so it's useful for me to be able to version control and have a history for them.

Once you have the queue repository, you can create a patch before making any changes to files:

hg qnew -g <patch name>

When you create a new patch, it automatically becomes an active patch at the top of the queue. You can then edit files as you normally would. 'hg add' and 'hg remove' commands mark files to be added or removed in the patch.

Once you're ready to commit any changed/added/removed files to the patch, do a commit:

hg qcommit  

Once committed, you can look in your .hg/patches/ directory and see the patch file.

Whenever I want to update from SVN, I pop everything off the patch queue so the Mercurial repository & Subversion working directory are pristine, and do the update:

hg qpop -a

hgpullsvn

I can then push the patches I'm working on back on top:

hg qpush -a

Whenever I'm ready to push changes into Subversion, I export the patch, then apply it to a separate Subversion working directory for commit:

hg export -g <patch name> > ../my.patch

in separate Subversion working directory,

patch -p1 < ../my.patch
