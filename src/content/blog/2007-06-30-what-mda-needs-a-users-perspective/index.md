---
title: "What MDA needs: a user's perspective"
date: 2007-06-30
categories: 
  - "mdsd"
tags: 
  - "mdsd"
---

One of my areas of interest in software development is [model driven architecture](http://en.wikipedia.org/wiki/Model-driven_architecture) and model driven software development. I've successfully applied MDA to software projects and have seen the benefits first hand. Although MDA/MDSD tools and techniques can bring several benefits to software projects, including improving developer productivity, following are some features that I think would greatly increase the adoption of MDA/MDSD in the industry:

**Make it easy to write and customize code generation cartridges**

After working with MDA/MDSD tools for a while, it's common to need to customize the code generation cartridges and/or write entirely new ones. The MDA/MDSD tool should make it easy to do so. The model transformation and code generation process should be easy to understand and creating new transformations/generators should be straightforward. Creating new cartridges for AndroMDA 3 is fairly involved and not easy to get up to speed with. The process involves creating UML meta-models, using AndroMDA to generate code from the meta-models, then writing Java code to implement the model to model transformations. AndroMDA 4 looks to be simplifying the process greatly; you still define your meta-models, but the ATL language is used for model to model transformations rather than running generators and writing Java code. openArchitectureWare uses a similar process to AndroMDA 4.

**Fast transformation/code generation cycles**

Developers rightly don't have much patience for anything that significantly slows down the code-compile-test cycle. Agile development and refactoring techniques call for continuous code-compile-test cycles. Because in an MDA approach, the model (expressed as UML or some other form) _is_ part of the code, the model will be updated and transformed to code frequently. Practically, this means that MDA tools should support running transformation directly in the modeling tool and IDE, and should support incremental transformations, so the entire application does not have to be regenerated for small changes.

**Capable open source UML tools**

I'll happily fork over money for a commercial product that works well and is reasonably priced, but there are many people and software development groups that will be much less likely to try something out if there's a significant price tag involved, especially when you're not even sure it'll work for you long term. There's also a subset of open source developers for whom relying on a commercial tool, regardless of the price, is a non-starter. For MDA to gain wider adoption, a capable open source UML 2.0 tool is needed. That's not to say there shouldn't be commercial offerings, just that at least one viable open source option is needed. [ArgoUML](http://argouml.tigris.org/) is the closest candidate I've seen.

**Support for textual models**

Some types of models don't lend themselves to expression via UML. For these cases, the MDA tool should support models expressed via other formats, such as text-based models (e.g. a declarative language). The MDA tool should be able to combine information from multiple models, some in UML, and some in other formats, during a transformation cycle. The MDA developer can then use the format that best fits the model to be expressed. openArchitectureWare supports non-UML models, including text-based languages. It looks like AndroMDA 4 utilizes EMF, which supports models in various formats.

**Standardized meta-models**

A meta-model defines the language that is used to model a particular domain. In UML terms, it defines the stereotypes that may be attached to the various classes, attributes, associations, and other elements, as well as the tags that may be used to provide additional information to the MDA transformations. Currently, each MDA tool defines its own, different, meta-model. So although modeling an Entity class for one MDA tool may be very similar to modeling an Entity class for another MDA tool, they are incompatible. Wherever possible, MDA tools should start supporting each other's meta-models, creating de-facto standards over time. Where an existing meta-model doesn't meet their needs, MDA tools should attempt to extend an existing meta-model rather than creating a new one. This would allow development teams to more easily port a model from one MDA tool to another and would reassure teams their investment in a model will not be wasted.

**Intelligent refactoring**

Refactoring refers to techniques for making improvements to code without altering its behavior. "Improving the Design of Existing Code" as Kent Beck's [seminal book](http://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672/ref=pd_bbs_sr_6/105-0094902-1583648?ie=UTF8&s=books&qid=1181504432&sr=8-6) puts it. In an MDA-based system, refactorings frequently span both the model as well as the hand-written code. A simple example of this is the "Rename method" refactoring. If a method is renamed in a UML model, when the model-to-code transformation occurs, there very well may be hand-written subclasses that must also rename the method, and other classes that invoke the renamed method that need to be updated. Modern IDEs have built in support for the most common refactorings, and will apply those related changes for you. MDA tools should be able to detect the change in the model (the refactoring), and allow the developer to automatically apply the corresponding refactoring changes in their IDE. For this to work, MDA tools will likely have to be integrated more closely with IDEs such as Eclipse and NetBeans via plugins.

Finally, one thing MDA tools do not need:

**Round tripping**

When introducing MDA tools, I frequently get the remark "you know, I wish tool X would support round-tripping". Round tripping is a feature found in many modelling tools since the early 90's, where code could be generated from the UML model, then the code could be modified, and those changes could be synchronized back into the model. Round-tripping and reverse-engineering largely do not apply to MDA. Round-tripping is really only practical if there's a very close correspondence between the classes being modelled and the code being generated. In UML tools that generate code, there is frequently a single source module that is generated for each class that is modeled. In an MDA transformation, a single class in a UML model may result in several files being generated; a DAO interface, a DAO implementation class, a domain object interface, a domain object implementation class, a hibernate mapping file, and an SQL DDL file. In this case, how should changes to source code map back to the UML model? What if an attribute is added to the domain interface and class but not to the HBM file? What if an attribute is renamed in one but not the others? I think the request for this feature is really a band-aid for some other problem, such as: being too restrictive in who can update the model, code generation cycles that take too long, or unfamiliarity with UML and modeling.
