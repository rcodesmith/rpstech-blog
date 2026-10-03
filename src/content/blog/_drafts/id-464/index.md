---
title: "markdown and pandoc"
draft: true
---

\--from=markdown --toc -s markdown/eligibility\_setup\_screens.md -o ~/Desktop/test.pdf pandoc: pdflatex not found. pdflatex is needed for pdf output.

Based on http://johnmacfarlane.net/pandoc/installing.html

Install BasicTex http://www.tug.org/mactex/morepackages.html

adds pdflatex to path, and then the following works: da-nile-2:site ron$ pandoc --from=markdown --toc -s markdown/eligibility\_setup\_screens.md -o ~/Desktop/test.pdf

Writing to Word doc format da-nile-2:site ron$ pandoc --from=markdown --toc -s markdown/eligibility\_setup\_screens.md -o ~/Desktop/test.docx

Images in docx too large... how to scale just for this format?

PDF... margins too wide.. how to decrease?

Reformatting tables

Pandoc extensions: auto\_identifiers implicit\_header\_references

pandoc --from=markdown+auto\_identifiers+implicit\_header\_references --to=html --toc -s markdown/eligibility\_setup\_screens.md -o xhtml/eligibility\_setup\_screens.xhtml

\-N to number sections

Title header

% Eligibility Setup Screens % Ron Smith % 3/5/2013

\--css psa\_site.css
