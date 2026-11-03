---
title: "Case study: Building an agentic options trading copilot"
date: 2026-11-02
categories:
  - "software-dev"
tags:
  - "ai"
  - "agentic-development"
  - "claude"
  - "options-trading"
---

I trade options, and managing positions is close to a daily job. I couldn't find software that worked the way I wanted, so I built my own: the options trading copilot,
which tracks my positions, flags what needs attention, and helps me work out what to do next.

It's also a case study in applying generative AI to a real domain. The main lesson is that the hard part isn't adding AI, but knowing where it belongs.
Deterministic code handles the algorithms and rules, and AI takes on the judgment calls that rules can't express.
AI also changed how the system got built: this wouldn't have been practical for one person a few years ago.
Here's what I built, the technologies behind it, how AI development changed along the way, and what I took from it.

## The impetus


I've been investing and trading options for a long time.  What I like about options is that the trading is based on math and probabilities, which
lends itself to a mechanical style.  I owe most of what I know about options to the folks at [TastyLive](https://www.tastylive.com/) and,
more recently, [LossDog](https://lossdog.com/) ([trading YouTube channel](https://www.youtube.com/playlist?list=PLfMu8ghfRf2mtBrvmKz5w2_7vVonxQ4hm))
and [Grow Your Pile](https://www.growyourpile.com/).

Options trading requires frequent management of positions, daily in many cases.  This is time-consuming, and skipping a day can
lead to losses and missed opportunities.  Fortunately, a significant amount can be automated, and reasoning models can now help with the parts that used to need
my full attention.

I tried out some existing products for managing trades and tracking profits, but they just didn't work the way I wanted, or the interface
was awful.  Generative AI for software development had gotten much better, so I decided to see what I could build
myself.  Within a day, I had something basic working that I could use to track my trading campaigns (positions that are adjusted over time following some
strategy).
Over time I've added features and made it more 'production ready'.

## Architecture diagram

The diagram shows the overall shape of the system. Read it from top to bottom: the experience tier (the web app), the intelligence tier (deterministic rules and AI), and the data platform.

Blue boxes are ordinary code and rules, and purple boxes use AI. Notice that the AI doesn't calculate P&L, buying power, or anything else that can be done deterministically. 
It calls the Position Engine, the same code the rest of the app uses.

[![Architecture of the options trading copilot: experience, intelligence and data platform tiers, with the intelligence tier split into deterministic rules and AI](/images/options-copilot-architecture.svg)](/images/options-copilot-architecture.svg)

## Features / technologies mapping

The table below lists the main features and the type of technology behind each one. Rows marked ✦ use
technologies that only became practical in the last few years.

| Feature | Type of technology | Built with | New? |
| --- | --- | --- | :-: |
| **Trade Import**<br><sub>broker API · CSV upload · dedup</sub> | Deterministic rules | TastyTrade API, CSV importers | |
| **Fill Matching**<br><sub>suggests which campaign a fill closes or adjusts</sub> | Rule-based heuristics | Python | |
| **Position Engine**<br><sub>structures · campaigns · P&L · buying power</sub> | Deterministic algorithms over a domain model | Python, Reg T margin rules | |
| **Market Data Service**<br><sub>quotes · option chains · earnings · expected move, cached</sub> | Data pipeline + caching | ThetaData, Yahoo Finance, Alpha Vantage, Postgres/S3 | |
| **Risk Alerts**<br><sub>expiry · delta · extrinsic · loss</sub> | Rule engine | Python | |
| **AI Trading Assistant**<br><sub>chat · campaign advisor · market data, earnings and web search tools</sub> | Reasoning model + agentic tool use | Claude, LangChain | ✦ |
| **AI Alerts**<br><sub>judgment-based flags the rules can't express</sub> | Reasoning model (non-deterministic) | Claude | ✦ |
| **Agentic Trade Advisor**<br><sub>responds to alerts, analyzes conditions, recommends trades</sub> | Autonomous agent loop | Claude, LangChain | ✦ |
| **AI Fill Extraction**<br><sub>text / screenshot → draft fills</sub> | Multimodal (vision) model + structured extraction | Claude vision | ✦ |
| **Advisor Personas**<br><sub>strategy rules written in plain English, editable by me or the AI</sub> | Natural-language configuration (the prompt is the program) | Claude | ✦ |
| **Research Lab**<br><sub>backtesting · strategies · price prediction</sub> | Classical quant + machine learning | pandas, scikit-learn | |
| **Web UI**<br><sub>responsive, every screen</sub> | Web application stack | React, TypeScript, Ant Design, FastAPI | |
| **Sign-in**<br><sub>password, passwordless, social, 2FA</sub> | Managed identity (OIDC) | Zitadel | |
| **Observability**<br><sub>logs · metrics · LLM call tracing</sub> | Monitoring + LLM tracing | Grafana Cloud, LangSmith | |
| **Operations**<br><sub>deploys · supply-chain gated builds</sub> | Cloud infrastructure + CI/CD | AWS Graviton, Terraform, GitHub Actions | |



## Products and features made possible by AI

As the table shows, several major features in this project have only become possible in the last few years.  As builders, we've
been handed entirely new categories of capabilities that can be incorporated into products:

- Non-deterministic reasoning
- Advanced natural language
- Advanced image recognition
- Agentic tool use

Not only can we build significantly more per day with agentic development, but these new AI capabilities open up entirely new business opportunities: features that provide significant value and just weren't possible or practical
before.

## AI evolution

As I mentioned, I undertook this project because I could use AI to accelerate its development.  It wouldn't have been practical for me
to implement solo otherwise.  Over the past few years, development with AI has evolved tremendously, and most of that happened while I was building
this:

| Stage | Became practical | What the AI does | What the developer does |
| --- | --- | --- | --- |
| **Autocomplete** (GitHub Copilot) | 2021-2022, before this project | Suggests the next line or function while you type | Writes the code, accepting or rejecting suggestions |
| **AI edits the code directly** | By late 2024 | Writes and changes code across multiple files from a prompt | Describes the change, then reviews each edit |
| **Coding agent** (Claude Code) | 2025 | Reads the codebase, edits files, runs tests and commands, commits | Hands off whole tasks, stays in the loop, reviews the results |
| **Agentic development with specialized skills** | Late 2025 onward | Does all of the above, loading packaged instructions and scripts when a task calls for them | Decides what to build, sets the architecture and standards, directs the work and reviews it |

Currently, I'm playing the role of product manager, architect, and team lead.  


## Takeaways

- **AI has opened up entirely new capabilities and opportunities for software, but AI isn't the answer to everything.**

  We have capabilities that didn't exist a few years ago, and software companies should be thinking about what they make possible. But the starting point is still the customer's
  need and the best tool for meeting it. Most of this system is conventional engineering, and its calculations and rules should be deterministic. AI is there for what rules can't
  express. It should be obvious, but I've seen a fair amount of AI features bolted onto existing products with questionable customer value.

- **AI can help accelerate just about every aspect of building products.**

  I've used AI in every part of this project: fleshing out the trading domain model (which is sophisticated, and its terminology isn't consistent across the industry),
  brainstorming architecture, researching technologies and the market, writing infrastructure and product code, troubleshooting, testing, UI design and documentation. This keeps
  happening: I start doing something myself, then stop and think "wait, shouldn't I see if Claude can do this?" I try, and pretty much every time, it can.

- **Agents still need software engineers to direct them and review their work.**

  Claude can usually do the task, but it can't yet be trusted to do it unsupervised. I set priorities and goals, ask critical questions that frequently change the answer, redirect
  it when it's on a track I don't want, and review the results. Before implementation starts, I have Claude write out its questions and assumptions, which I answer and review. I hear
  people talk about setting up agents to do large swaths of work while they're away. Except for niche use cases like code conversion and prototypes, my experience is that a
  maintainable, performant, scalable, and secure implementation requires regular direction and review. Giving agents free rein just means more rework later.
  So my time is still the limiting factor, and software engineering is a ways from
  being fully automated. But when I hear people say they haven't seen much benefit from agentic development or that this is a fad, that hasn't been my experience at all.

- **Software development best practices matter even more than before.**

  The more things change, the more they stay the same. Multiple levels of automated tests, IaC, CI/CD pipelines, domain modeling, good abstractions,
  coding standards, clear documentation and observability have been preached for
  decades, and they're as important as ever, if not more so. Agents depend on verifiable feedback, understandable code, and clear standards and conventions to be effective.
  For significant projects, you should have been doing these already, and even more so now.

- **Agents need a "software factory": an environment where they can work autonomously, within bounds.**

  That takes a well-defined process, clear instructions, pipelines that give agents feedback, and a repeatable, isolated setup with the right tools and proper guardrails.
  Some of this was good practice before agents, but not really
  necessary, because human judgment and ingenuity could smooth over the rough edges. Agents can't be relied on for that.
  My setup for this project includes clearly documented process and standards, robust CI/CD pipelines, multiple
  levels of tests, an isolated container environment for agents to work in, Matt Pocock's skills (https://github.com/mattpocock/skills), and my own custom agent skills.

## Where this leaves me


I built the options trading copilot to keep up with my positions without giving up more of my day, and it's now how I manage my trades. It's also a solid platform
for building additional features.

More broadly, we have new kinds of technology to build with and new tools to build them. The opportunity is in knowing when they're appropriate and how best to use them.
Software development is changing rapidly; what I describe here
is a point in time, and I expect how we build software to change significantly in the months and years ahead.

If you're working on something similar, I'd like to hear about it.

