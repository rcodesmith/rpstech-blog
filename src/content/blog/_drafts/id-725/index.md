---
title: "trying gitlab ci"
draft: true
---

http://doc.gitlab.com/ci/yaml/README.html

https://gitlab.com/gitlab-org/gitlab-ce/issues/2648

\`\`\` ron@pichincha:~/Documents/workingArea/rps-gitlab$ sudo docker exec -it rpsgitlab\_gitlabrunner\_1 gitlab-runner register Please enter the gitlab-ci coordinator URL (e.g. http://gitlab-ci.org:3000/): http://gitlab/ci/ Please enter the gitlab-ci token for this runner: XYZ Please enter the gitlab-ci description for this runner: INFO\[0008\] 057c40e8 Registering runner... succeeded Please enter the executor: docker-ssh, ssh, shell, parallels, docker: \[shell\]\[/shell\]: INFO\[0034\] Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!

\`\`\`

http://doc.gitlab.com/ci/yaml/README.html

https://gitlab.com/gitlab-org/gitlab-ce/issues/3089
