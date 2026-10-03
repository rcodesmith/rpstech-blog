---
title: "Adding mongodb to cloudforge"
draft: true
---

http://grails-plugins.github.com/grails-cloud-foundry/docs/manual/guide/index.html

Install plugin into Grails app: > grails install-plugin mongodb

\> grails cf-apps

> +--------------+----+---------+-------------------------------+---------------+ | Application | # | Health | URLs | Services | +--------------+----+---------+-------------------------------+---------------+ | topicoGrails | 1 | RUNNING | topicograils.cloudfoundry.com | mysql-780f19a | +--------------+----+---------+-------------------------------+---------------+

\> grails cf-services shows available services, and what services you have created:

> +------------+---------+---------------------------------------+ | Service | Version | Description | +------------+---------+---------------------------------------+ | rabbitmq | 2.4 | RabbitMQ message queue | | mongodb | 2.0 | MongoDB NoSQL store | | mysql | 5.1 | MySQL database service | | postgresql | 9.0 | PostgreSQL database service (vFabric) | | redis | 2.2 | Redis key-value store service | +------------+---------+---------------------------------------+
> 
> 24-11-2012 18:17:56,905 DEBUG ClientWrapper - Last Request: \[{"name":"mysql-780f19a","type":"database","vendor":"mysql","provider":"core","version":"5.1","tier":"free","properties":{},"meta":{"created":1348375799,"updated":1348375799,"tags":\["relational"\],"version":1}}\] =========== Provisioned Services ============
> 
> +---------------+---------+ | Name | Service | +---------------+---------+ | mysql-780f19a | mysql | +---------------+---------+

\> grails cf-create-service mongodb

Will create a mongodb service, and automatically generate a name for it.

> Service 'mongodb-9e2f8d2' provisioned.

\> grails cf-bind-service mongodb-9e2f8d2 topicoGrails

One thing that may be a bit confusing, is that the Grails cloudforge plugin overwrites whatever data source configuration you have with data based on the services you have configured. http://blog.springsource.org/2011/04/12/one-step-deployment-with-grails-and-cloud-foundry/

It replaces the URL, user and password credentials, but still uses other options, like the MySQL engine type to use, and the dbCreate option. So it's still useful to have the configuration for the data sources in your DataSources.groovy file.

http://springsource.github.com/grails-data-mapping/mongo/manual/guide/2.%20Getting%20Started.html#2.2%20Combining%20Mongo%20and%20Hibernate:

> If you have both the Hibernate and Mongo plugins installed then by default all classes in the grails-app/domain directory will be persisted by Hibernate and not Mongo. If you want to persist a particular domain class with Mongo then you must use the mapWith property in the domain class
