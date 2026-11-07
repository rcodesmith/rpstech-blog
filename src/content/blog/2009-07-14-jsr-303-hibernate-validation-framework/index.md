---
title: "JSR 303 & Hibernate validation framework"
date: 2009-07-14
categories: 
  - "java"
tags: 
  - "validation"
---

I was recently looking for a validation framework, and came across the work that has been done lately for [JSR 303](http://jcp.org/en/jsr/detail?id=303) (latest version of the spec [here](http://people.redhat.com/~ebernard/validation/)). JSR 303 defines a standard meta-data model and API for validation of JavaBeans/POJOs. Basically, it's a standard way to describe constraints for Java POJOs, and an API to access those constraints.

From the JSR:

> "Validating data is a common task that is copied in **many different layers of an application, from the presentation tier to the persistentce layer**. Many times the exact same validations will have to be implemented in each separate validation framework, proving time consuming and error-prone. To prevent having to re-implement these validations at each layer, many developers will bundle validations directly into their classes, cluttering them with copied **validation code that is, in fact, meta-data about the class itself**."

I definetely agree - the validation metadata belongs to the domain class. This has been a hole in the Java space for quite a while. We've had validation frameworks such as [Commons Validator](http://commons.apache.org/validator/) (previously part of Struts) for many years, but we haven't had something that could be used across layers in a widespread manner. If you look at typical web applications with XML schemas , a persistence framework, and Web UI, you can easily see where you can end up re-implementing the same constraints multiple times.

```java
public class Address {
    @NotNull private String line1;
    private String line2;
    private String zip;
    private String state;

    @Length(max = 20)
    @NotNull
    private String country;

    @Range(min = -2, max = 50, message = "Floor out of range")
    public int floor;

        ...
}
```

As can be seen from the Hibernate Validator example above, the JSR allows you to specify the validation message as a part of the metadata. I think it's good to have the option, but I prefer to define the validation messages externally. I don't want to have to change my domain classes every time someone wants different wording on a validation message, and for those that need to support internationalization, you pretty much have no option but to define them externally.  From looking at the JSR, it looks like defining messages externally is also supported.

Like recent JSRs, I like that it supports annotations, but still supports overriding/extension via XML. I'm also glad this JSR works on Java SE. In the past too many JSRs were restricted to JEE.

[Hibernate Validator](https://www.hibernate.org/412.html) 4 (currently beta 1) is the reference implementation. It being a Hibernate project, you can guess that Hibernate core would be able to use the constraints to generate table definitions, etc.. But what about other layers - I'd really like to see UI frameworks taking advantage of this, and generating browser-side validation JavaScript as well as enforcing the constraints server side.

Here's what I was able to find in the JSF world:

- [MyFaces Extensions Validator](http://myfaces.apache.org/extensions/validator/) Planned support for JSR 303, but not currently supported. See [this](http://wiki.apache.org/myfaces/Extensions/Validator/) page.
- [RichFaces BeanValidator](http://livedemo.exadel.com/richfaces-demo/richfaces/beanValidator.jsf) RichFaces 3.2.2 supports constraints defined in Hibernate Validator. Presumably they'll switch to JSR 303 in the future. Since Hibernate Validator 4 is the reference implementation, hopefully switching from Hibernate Validator 3.X to JSR 303 is little/no work.
