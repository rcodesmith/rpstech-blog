---
title: "XText 2: Packages support and code generation"
draft: true
---

Adding support for packages and imports: http://www.eclipse.org/Xtext/documentation.html#\_6

Add rules for package declaration and importing to our language, and update DslAbstractGuiElement to include these new rules. The xtext file now looks like:

\[code\] grammar org.GuixDsl with org.eclipse.xtext.xbase.Xbase

generate guixDsl "http://www.GuixDsl.org"

DslModel: elements+=DslAbstractGuiElement\*;

DslAbstractGuiElement : DslPackageDeclaration | DslImport | DslGuiModule | DslView;

DslPackageDeclaration: 'package' name=QualifiedName '{' elements+=DslAbstractGuiElement\* '}';

DslImport: 'import' importedNamespace=QualifiedNameWithWildCard;

QualifiedNameWithWildCard : QualifiedName ('.' '\*')?;

DslGuiModule: (documentation=STRING)? 'Module' name=ID '{' ("hint" "=" hint=STRING)? '}';

DslView: (documentation=STRING)? 'View' name=ID '{'

'}';

\[/code\]

Create a new Java project,
