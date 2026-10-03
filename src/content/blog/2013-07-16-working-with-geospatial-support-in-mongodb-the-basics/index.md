---
title: "Working with Geospatial support in MongoDB: the basics"
date: 2013-07-16
categories: 
  - "general"
  - "mdsd"
tags: 
  - "mongodb"
  - "sculptor"
---

A project I'm working on requires storage of and queries on Geospatial data. I'm using MongoDB, which has good support for Geospatial data, at least good enough for my needs. This post walks through the basics of inserting and querying Geospatial data in MongoDB.

First off, I'm working with MongoDB 2.4.5, the latest. I initially tried this out using 2.2.3 and it wasn't recognizing the 2dsphere index I set up, so I had to upgrade.

MongoDB supports storage of Geospatial types, represented as [GeoJSON](http://www.geojson.org/) objects, specifically the Point, LineString, and Polygon types. I'm just going to work with Point objects here.

Once Geospatial data is stored in MongoDB, you can query for:

- Inclusion: Whether locations are included in a polygon
- Intersection: Whether locations intersect with a specified geometry
- Proximity: Querying for points nearest other points

You have two options for indexing Geospatial data:

- 2d : Calculations are done based on flat geometry
- 2dsphere : Calculations are done based on spherical geometry

As you can imagine, 2dsphere is more accurate, especially for points that are further apart.

In my example, I'm using a 2dsphere index, and doing proximity queries.

First, create the collection that'll hold a point. I'm planning to work this into the [Sculptor code generator](https://github.com/sculptor/sculptor) so I'm using the 'port' collection which is part of the 'shipping' example MongoDB-based project.

```
> db.createCollection("port") { "ok" : 1 }
```

Next, insert records into the collection including a [GeoJSON](http://www.geojson.org/) type, point. According to [MongoDB docs](http://docs.mongodb.org/manual/core/2dsphere/), in order to index the location data, it must be stored as GeoJSON types.

```
> db.port.insert( { name: "Boston", loc : { type : "Point", coordinates : [ 71.0603, 42.3583 ] } })
> db.port.insert( { name: "Chicago", loc : { type : "Point", coordinates : [ 87.6500, 41.8500 ] } })

> db.port.find()

{ "_id" : ObjectId("51e47b4588ecd4e8dedf7185"), "name" : "Boston", "loc" : { "type" : "Point", "coordinates" : [  71.0603,  42.3583 ] } }
{ "_id" : ObjectId("51e47ee688ecd4e8dedf7187"), "name" : "Chicago", "loc" : { "type" : "Point", "coordinates" : [  87.65,  41.85 ] } }
```

The coordinates above, as with all coordinates in MongoDB, are in longitude, latitude order.

Next, we create a 2dsphere index, which supports geolocation queries over spherical spaces.

```
> db.port.ensureIndex( { loc: "2dsphere" }) >
```

Once this is set up, we can issue location-based queries, in this case using the 'geoNear' command:

```
> db.runCommand( { geoNear: 'port', near: {type: "Point", coordinates: [87.9806, 42.0883]}, spherical: true, maxDistance: 40000})

{
    "ns" : "Shipping-test.port",
    "results" : [
        {
            "dis" : 38110.32969523317,
            "obj" : {
                "_id" : ObjectId("51e47ee688ecd4e8dedf7187"),
                "name" : "Chicago",
                "loc" : {
                    "type" : "Point",
                    "coordinates" : [
                        87.65,
                        41.85
                    ]
                }
            }
        }
    ],
    "stats" : {
        "time" : 1,
        "nscanned" : 1,
        "avgDistance" : 38110.32969523317,
        "maxDistance" : 38110.32969523317
    },
    "ok" : 1
}
```

For some reason, a similar query using 'find' and the 'near' operator, which should work, doesn't:

```
> db.port.find( { "port" : { $near : { $geometry : { type : "Point", coordinates: [87.9806, 42.0883] } }, $maxDistance: 40000 } } )

error: {
"$err" : "can't find any special indices: 2d (needs index), 2dsphere (needs index),  for: { port: { $near: { $geometry: { type: \"Point\", coordinates: [ 87.9806, 42.0883 ] } }, $maxDistance: 40000.0 } }",
"code" : 13038
}
```
