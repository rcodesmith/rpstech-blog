---
title: "Custom scopes in XText 1.X"
draft: true
---

SculptorguidslScopeProvider.java

`/** * DslView.for reference should only refer to domain objects that have a corresponding DslGuiModule */ IScope scope_DslView_for(DslView ctx, EReference ref) { Scope myScope = new Scope(); List elements = new ArrayList(); myScope.setElements(elements);  DslGuiModule module = (DslGuiModule) ctx.eContainer(); DslGuiApplication guiApp = (DslGuiApplication) module.eContainer(); addDomainObjectsInGuiApp(elements, guiApp); return myScope; }`

To test, select DSL project (in my case org.fornax.cartridges.sculptor.gui.dsl), and select Run As -> Eclipse Application
