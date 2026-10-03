---
title: "Using Mercurial"
date: 2007-11-25
categories: 
  - "software-dev"
  - "tools"
---

As I posted earlier, I've been looking at some of the decentralized version control systems and started using Mercurial. There are several decentralized VCSs, including [Bazaar](http://bazaar-vcs.org/), [GIT](http://git.or.cz/), [Mercurial](http://www.selenic.com/mercurial/wiki/), and others. Out of the decentralized VCSs, Mercurial and GIT seemed to have the greatest momentum and adoption rate. GIT is being used by the Linux Kernel, Wine project, and [others](http://git.or.cz/gitwiki/GitProjects). Mercurial is being adopted by OpenJDK, OpenSolaris, Mozilla, among [others](http://www.selenic.com/mercurial/wiki/index.cgi/ProjectsUsingMercurial). Having wide adoption and momentum are important to me because I want to use something that'll be around several years from now and will be supported by GUI tools, build and continuos integration tools, and IDEs.

After looking into both, I ended up going with Mercurial over GIT. Both Mercurial and GIT seem to fit my needs; decentralized, fast, and flexible, but GIT didn't seem as well supported on non-Linux platforms and the Java IDE plugins are further behind. Mercurial has binaries available for Mac, Windows, and of course Linux. On the Mac and Windows side, there are a couple different options for how to install Mercurial; using a ports packaging system such as Cygwin on Windows or MacPorts on Mac, or installing natively on the OS. The Eclipse IDE plugin is still early in development, but it sounds like the NetBeans plugin is pretty full featured.

When working with Mercurial, everything is a copy of the repository, including branches and the local repository that developers work out of. Each repository is as fully capable as any other and includes all of the change history. It sounds inefficient to have a full copy of the repository on each workstation, but it turns out that Mercurial repositories are usually smaller than a Subversion working directory. This is partly because Mercurial stores changes to files in a very efficient manner, and partly because Subversion stores a significant amount of extra data in a working directory in order to avoid accessing the server for some operations.

In Mercurial, changes to files are committed to a local repository as a unit of work, called a change set. The change sets can then be pushed or pulled from other repositories in order to share work with others. It's then up to you how you organize your work and manage the exchange of change sets between repositories. You can have a single master repository that everyone pushes/pulls from, you can have multiple masters for better performance and reliability, you can have a hierarchical model where committers receive change sets from the community, then pass it up to module owners, who pass them up to release owners (from what I've heard the Linux Kernel is organized in this way), or even have no master and have members of the team exchange change sets directly with each others' repositories (this sounds like too much work though).

Most of all, I was impressed with Mercurial's attention to details in their design decisions:

- Mercurial never makes updates to a revision log of a file, just appends to it. This minimizes the opportunities for data getting corrupted; if you never update or delete data, there is very little chance of it being accidentally corrupted beyond repair.

- Mercurial stores the diffs to files (text and binary) rather than storing the full copy of a file for every revision. It then "replays" the diffs in order to reconstruct the full copy of a revision of a file when needed. This is much more efficient than it may seem, but after a large number of changes it can become expensive. To compensate for this, Mercurial stores a snapshot copy of a file revision for fast access when the chain of diffs becomes too long.

- Minimize locking - read and update operations have been ordered in such a manner that locking isn't necessary for most commands. Reads and clone/pull operations don't lock the repository at all. Mercurial uses locks to ensure only one process writes to a repository at a time, but read and clone/pull operations are not affected by this.

- Minimizing filesystem seek operations - Seek operations are relatively expensive, so Mercurial has been designed to minimize this. This is one of the reasons that Mercurial keeps repository metadata in a single directory (.hg at the root) rather than stored with each directory as Subversion does (.svn directories) - having separate metadata directories would require a seek for every directory.

I'll follow up later with a post on setting up & working with Mercurial.
