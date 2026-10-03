---
title: "git: pull latest changes for all submodules"
draft: true
---

git submodule foreach --recursive 'git fetch --all ;git reset --hard origin/master'
