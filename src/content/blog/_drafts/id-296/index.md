---
title: "Adding validations to xtext"
draft: true
---

Scope:

5011 ERROR AbstractExpressionsUsingWorkflowComponent - Error in Component guidslTransformation of type org.eclipse.xtend.XtendComponent: EvaluationException : Unexpected call to transformBehavior(DslUiBehavior) - base class behavior extensions::helper.ext\[24850,123\] on line 616 'String error(String msg)' transformation::GwtGuiDslTransformation.ext\[36666,82\] on line 799 'error("Unexpected call to transformBehavior(DslUiBehavior) - base class behavior")' transformation::GwtGuiDslTransformation.ext\[40840,43\] on line 893 'binding.behaviors.transformBehavior(module)' transformation::GwtGuiDslTransformation.ext\[23420,44\] on line 501 'dslWidget.behaviorBindings.transform(module)' transformation::GwtGuiDslTransformation.ext\[26038,39\] on line 559 'initFromDslWidget(this,widget,module)' transformation::GwtGuiDslTransformation.ext\[22094,36\] on line 472 'view.widgets.transformWidget(module)' transformation::GwtGuiDslTransformation.ext\[23918,87\] on line 511 'widget.toView.transformView((DslGuiModule)widget.toView.eContainer.for.transform())' transformation::GwtGuiDslTransformation.ext\[22094,36\] on line 472 'view.widgets.transformWidget(module)' transformation::GuiDslTransformation.ext\[6286,50\] on line 144 'module.views.transformView(module.for.transform())' transformation::GuiDslTransformation.ext\[1683,29\] on line 48 'gui.modules.transformModule()' nofile\[0,22\] on line 1 'transform(guiDslModel)'

5012 ERROR WorkflowRunner - Workflow interrupted. Reason: Unexpected call to transformBehavior(DslUiBehavior) - base class behavior 5012 ERROR WorkflowRunner - \[ERROR\]: file:/usr/local/workingArea/gwtSculptor/fornax-cartridges-sculptor-generator/target/test-classes/library-gwt-validation.guidesign(78): Couldn't resolve reference to DslUiBehavior 'populatePersonDetailsPanel'.(Element: -UNKNOWN-; Reported by: MweReader: loading file from classpath:/library-gwt-validation.guidesign) 5012 ERROR WorkflowRunner - \[ERROR\]: Diagnosis of org.fornax.cartridges.sculptor.gui.dsl.sculptorguidsl.impl.DslGuiApplicationImpl@366aa95b{file:/usr/local/workingArea/gwtSculptor/fornax-cartridges-sculptor-generator/target/test-classes/library-gwt-validation.guidesign#/}(Element: LibraryWeb; Reported by: MweReader: loading file from classpath:/library-gwt-validation.guidesign)

http://dev.eclipse.org/viewcvs/viewvc.cgi/org.eclipse.tmf/org.eclipse.xtext/plugins/org.eclipse.xtext/src/org/eclipse/xtext/validation/ValidatorTester.java?root=Modeling\_Project&view=co

http://www.eclipse.org/Xtext/documentation/2\_0\_0/060-validation.php still holds for XText 1

Couldn't find XText 1 jar containing ValidatorTester

Validation: SculptorguidslJavaValidator.java @Check public void checkFor(DslView view) { int featureCode = SculptorguidslPackage.DSL\_VIEW\_\_FOR; DslSimpleDomainObject forObj = view.getFor(); if(forObj != null) { DslGuiModule guiModule = (DslGuiModule)view.eContainer(); DslGuiApplication guiApp = (DslGuiApplication)guiModule.eContainer(); if(GuidslHelper.skipGuiDto(guiApp, forObj) == true) { error("View " + view.getName() + " has 'for' object that is GUI-skipped : " + forObj.getName(), featureCode); } } }
