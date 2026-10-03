---
title: "Apache Spark Experiments"
date: 2016-12-05
categories: 
  - "python"
  - "scala"
tags: 
  - "apache-spark"
---

I'm in the process of learning [Apache Spark](http://spark.apache.org/) for processing and transforming large data sets, as well as machine learning. As I dig into different facets of Spark, I'm compiling notes and experiments in a series of [Jupyter](http://jupyter.org/) notebooks.

I published these notebooks to a github repo, [spark-experiments](https://github.com/rcodesmith/spark-experiments). Right now it has some basic and spark-sql based experiments. I'll be adding more as I go.

Rather than setting up Jupyter, Spark, and everything else needed locally, I found an existing Docker image, [pyspark-notebook](https://github.com/jupyter/docker-stacks/tree/master/pyspark-notebook), that contains everything I needed, including [matplotlib](http://matplotlib.org/) to visualize the data as I get further along. If you have Docker installed, you just run the Docker container via a single command, and you're off and running. See the [spark-experiments installation instructions](https://github.com/rcodesmith/spark-experiments#installation) for details.

Initially, I was going to create my own sample data sets for the experiments. I'm mostly interested in learning the operations and process rather than executing with a large data set across a cluster of servers, so it's ok to use a small data set. But I hit on the idea of using publicly available data sets such as those from [data.cms.gov](https://data.cms.gov/) instead. Maybe we'll turn up something interesting, and it'll be more real-worldish.
