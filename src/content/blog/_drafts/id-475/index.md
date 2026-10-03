---
title: "gson: serializing type hierarchies"
draft: true
---

http://code.google.com/p/google-gson/source/browse/trunk/extras/src/main/java/com/google/gson/typeadapters/RuntimeTypeAdapter.java?r=836

http://stackoverflow.com/questions/5800433/polymorphism-with-gson

RuntimeTypeAdapter, and my own TypeAdapter yielded stack overflow, due to -this-

In the end, what worked was http://code.google.com/p/google-gson/source/browse/trunk/extras/src/main/java/com/google/gson/typeadapters/RuntimeTypeAdapterFactory.java

At first, wasn't working because the type adapter wasn't getting called on serialization, but was on deserialization.

val resDtoAdapterFactory = RuntimeTypeAdapterFactory::of(typeof(ResDto), "type") RES\_DTO\_SUBCLASSES.forEach\[resDtoAdapterFactory.registerSubtype(it)\]

gsonBuilder.registerTypeAdapterFactory(resDtoAdapterFactory) val gson = gsonBuilder.create();

val json = gson.toJson(resDto) writer.write(json)

serializer NOT called, and JSON doesn't include type attribute JSON for website: {"websiteUrl":"http://some1.com","id":"5169ee7e0364a923b48a8c7d", ...}

Trick: val json = gson.toJson(resDto, typeof(ResDto)) writer.write(json) Now: JSON for website: {"type":"WebsiteDto", "websiteUrl":"http://some1.com","id":"5169ee7e0364a923b48a8c7d", ...}
