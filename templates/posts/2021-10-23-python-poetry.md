---
title: How Dialpad Moved Its Python AI Development from Pip to Poetry
description: Technical blog post co-authored with Kevin James about Dialpad's switch from pip to poetry for Python package management, as seen on The New Stack.
coauthors:
  - name: Kevin James
    email: KevinJames@TheKev.in
    uri: https://thekev.in/
tags:
  - python
additionalcss:
  - "static/css/code.css"
layout: layouts/post
---

_This piece originally appeared in [The New Stack](https://thenewstack.io/how-dialpad-migrated-its-ai-development-from-pip-to-poetry/)._

[[toc]]

_Vagrant Gautam was a Speech Recognition Engineer at Dialpad who recently left to begin a PhD in computer science at Saarland University, where xe will continue to feed xyr passions for code, language and building equitable speech recognition systems. In xyr free time, xe likes to sing, play piano and go birding._

_Kevin James is a staff engineer and tech lead for the AI Engineering team at Dialpad. When not finding exciting new ways to (ab)use kubernetes in solving his team's problems, he enjoys experimenting in the kitchen, at the cocktail counter, or with an instrument._

---

It was a dark and stormy day indeed when, by a stroke of luck, our intrepid heroes stumbled across an entry in the pip changelog:

**Maintainers are preparing to release pip 20.3, with the new resolver on by default.**

Confusion and curiosity struck their hearts! They asked themselves: _What is this new resolver? Will this affect us? How can I learn more? Did I leave the oven on?_ For Dialpad's AI teams, Python and its usage is central to the bulk of our development efforts: the wrong change at the wrong time could spell disaster.

After hunting down the arcane tomes and nigh-illegible scribbles describing the new behavior, the answer was clear: the new resolver had a laundry list of incompatibilities with our workflows. It would prevent us from deploying our new machine learning models, would cause our CI/CD platform to burn through hours of credits attempting in vain to reconcile incompatible truths of the universe, and would even prevent us from being able to build our development environments.

Something needed to be done. Some brave souls needed to discover a new way, a new style of Python package management for Dialpad, which could lead them into a brighter future — the future of package management that some feel is [Poetry](https://python-poetry.org/).

This is their story.

## Why and How Did We Pick Poetry?

The journey towards filling Dialpad with more poetry begins, as do so many, with an RFC (Request for Comments). The AI teams at Dialpad use RFCs — originally named for [the documents which encapsulate the specifications for the internet](https://en.wikipedia.org/wiki/Request_for_Comments) — to discuss proposals for changes to tools, workflows, and our own internal processes. These RFCs get debated on by any interested engineers until all the issues have been worked out and we've reached a consensus on the best way forward.

In this case, the RFC included a few major themes:

### What is the problem we're trying to solve?

What are the particular issues caused by our current workflow with pip and how will they affect us? In our case, the changes were several but most notably:

- the new resolver acted at installation time rather than development time (meaning we could not know if our dependencies would conflict until we'd already submitted code changes to be built), and;

- It could not recalculate previous dependencies (so anywhere we attempted to add a new package as a later step in our build — which we often do to include our AI models as a blackbox on top of our platform code — might find a conflict where none exists)

Additionally, though not quite as important, there was no way to break from the pip process early: if a conflict was found, we wouldn't be able to find out until after pip had exhausted every potential choice, downloading all possibly compatible options in the matrix of potential dependency versions. Since we were not keen to spend our entire yearly budget on a week of added compute time and network usage, this wasn't a great option for us.

### What options do we have?

The Python Packaging Authority maintains a list of [all available tools in this space](https://packaging.python.org/key_projects/). On top of that, they even have a more trimmed-down [set of suggested practices](https://packaging.python.org/guides/tool-recommendations/) one could adopt. Unfortunately, these suggestions tend to be narrow or specific in scope and are mostly updated by the folks who build new tools — most naturally listing their own new tool as the suggestion. We wanted to determine what would fit best for our particular use cases and adopt a tool that matched us rather than match ourselves to a newly adopted tool. As such, we started from the list of all possible tools, scoured the internet for relevant blog posts or Hacker News articles, and eventually trimmed down our list to what appeared to be the most notable and relevant choices nowadays: pip (with several workarounds for our issues), Pipenv, pip-tools, buildout, flit, and Poetry.

Each had its pros and cons, handled a different subset of the lifecycle of the development of a Python package, and would in some way be able to solve the problems we faced. For each of them, we investigated how others had used them, what their development cycle looked like, and what overall goals they were meant to solve.

### How do those options fit in our workflows?

On the [artificial intelligence](https://thenewstack.io/category/machine-learning/) (AI) team, we like automated tooling: if we can avoid needing humans to focus on some repetitive task or worry about some solvable issue, that's a big win in our books. We use tools like [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) to ensure we don't need to micromanage updates to our dependencies, [pre-commit](https://pre-commit.com/) to run an ever-growing litany of linters, and [CircleCI](https://circleci.com/) to automatically run those linters, tests, and everything involved with the continuous delivery of our code; we build applications and libraries (and scripts which act somewhere in between!), run our code on Knative and Kubernetes and some serverless platforms, write code in Python which can interface with our other code in C++, Elixir, Java, … needless to say, there were a whole bunch of boxes to check on this one.

Our ideal tool would be one that worked seamlessly with everything else in our system, functioned in all possible cases with no issues whatsoever, and folded our laundry while it was at it. A bit more realistically, a tool that would be easy for us to integrate and require little in the way of changes to our other setups or large OSS contributions to bridge the gap would be our best bet.

### What's the plan for safely migrating to the new solution?

In this case, how could we avoid breaking absolutely everything or spending quarters porting over every individual system one at a time? Would any of these tools be easier or more difficult than the others to make work? Could the migrations be formulaic enough to script the changes rather than needing to write them all manually?

We're ardent believers in there being a safe path to migrate between any two possible systems, but some cases are certainly much easier than others. Ideally, we'd be able to transition from our previous workflow to our final choice without too much in the way of detours or temporary hacks.

In the end, converging towards Poetry as the final choice here was surprisingly frictionless — it would be a migration, yes, but not one we couldn't easily tackle. It would solve all the problems we faced as well as a few more, such as helping to make our virtual environment management a bit easier. All of the other alternatives came with their own larger set of gotchas and limitations, requiring changes to how we do unrelated things or adding yet more tools and complexities to our system.

Though Poetry attempts to solve multiple problems at once (package management, version constraints, virtual environments, et cetera), it does so in a way that lines up pretty nicely with the system we'd been cobbling together since we wrote our first line of code. We generally try to stick with "the right tool for the job" over "the one tool that does everything", but when the "one tool" also happens to do everything right, well, the decision was easy.

Once the RFC was accepted and a couple of those specifics were worked out, it was on to the actual changes.

## Migrating to Poetry

Since the AI teams have a number of codebases spread across several teams with varying levels of complexity and importance to our users, it was important to carefully plan how to make our changes. Using some of our less mission-critical systems (such as internal tooling or hackathon-style research on new feature ideas) as a first pass to ensure we'd worked out any difficulties, we then prioritized production-facing code first and worked our way backward. It was most important to get these issues solved first for our most important systems in case our timeline estimate was wildly off and the pip-ageddon happened before we were ready.

In some cases, we made the decision not to upgrade code because the cost-to-benefit ratio was too low. For instance, on the data science teams we commit code from ad-hoc experiments, which sometimes include Jupyter notebooks and other code that isn't packaged and doesn't have unit tests. Packaging experimental code from ~~eons ago~~ 2018 and also manually testing it to ensure that it still worked just didn't seem worth it, especially when most of our experimental code has either not been used after the experiment or has been converted to production code in other repositories already.

Since we were systematically going through and modifying almost all of our code, we tried to fix other problems along the way; though we want to be careful in adding scope creep to an already complicated project, in simpler cases we think it's better to leave things you notice better than you found them. It ended up not being a 1-to-1 migration for this reason, but poetry made it easy enough to package code that it didn't extend the migration time at all. Some of the issues we fixed included:

- Renaming badly named packages
- Updating / adding package descriptions
- Standardizing our Dockerfile conventions and documenting these standards
- Fixing any folder name inconsistencies and clarifying best practices in the docs
- Checking that dependencies were actually necessary and trimming those which weren't
- Expanding version ranges of dependencies we could and exactly pinning those that did not use semantic versioning or any other useful schema (our legal team regrets to inform us that linking to a few popular packages here would not be a great idea)

We focused on solving problems only once and in a composable way. For example, rather than creating custom CircleCI workflows on each of our repositories, we created a reusable [CircleCI orb](https://circleci.com/developer/orbs/orb/talkiq/poetry) with jobs to deploy arbitrary packages to a package index, run commands in a poetry environment, and so on. We could then use this orb in all of our repositories without having duplicated code.

Overall, switching our packages from pip to poetry was fairly simple and quick to do, but we wanted to distribute the work so everyone would have the opportunity for hands-on experience working with poetry. Education around this took a lot of time and effort, especially since we work with teammates who have varying backgrounds and levels of comfort with software. The bulk of the time spent on our migration ended up being intentional, to leave room for all our team members to learn the new system as we introduce it rather than absorb the changes over time.

## Education, Documentation, Presentations

Our primary methods of education were through presentations and documentation.

The presentations were useful for getting the whole team on the same page about what was going on with pip, why we chose poetry, and what the migration process was going to look like. We had collaborative meetings where we went through a list of all our packages and assigned each of them to one of its code owners to handle its migration. By delegating the work out to the entire team in a balanced way, having completion milestones with quick turnaround, and clearly communicating the priority of this work, we were able to ensure the migration was smooth. In some cases, teams elected to have short development freezes for a particular repository, so they could put their heads down and focus on this one change without needing to worry about other ongoing priorities.

We also had to generate a large amount of documentation in a short time. For most of our internal documentation, we use [Sphinx](https://www.sphinx-doc.org/en/master/) and have all our repositories configured to automatically build and publish our documentation from text files on every new change. That makes it easy to include or update our documentation with every change and to easily cross-reference information from multiple sources across multiple teams. It also makes it easy to review these docs or to help give each AI team an easy point of reference to understand what the others have accomplished; by using text files stored in git, reviewing documentation is exactly the same as reviewing code, which is something we all do regularly.

For the speech recognition team, Vagrant created a document outline on a branch that xe shared with the team immediately even though it was incomplete. The team was to start with upgrading packages before upgrading Dockerfiles and testing Docker images, so xe first filled out the section with step-by-step instructions for package upgrades. While the rest of the team worked on that, xe filled out the remaining sections; this parallel work allowed for the upgrade process not to be blocked by a lack of documentation. Another way in which we unblocked ourselves on updating the documentation was to keep this particular document on a git branch rather than pushing to `main` every time, as that would require reviews and potentially become a bottleneck.

Of course, documentation is never perfect on the first attempt and so based on requests for clarification that came up in the team Slack channel, Vagrant refined the instructions and merged in questions, suggestions, and thoughts from others. We ended up having to add an FAQ section on the document as well, because some questions and gotchas came up regularly and did not necessarily fit with the instructions.

## Frequently (Asked and Answered) Questions

Some of what was in the FAQ section were answers already available in the [official poetry docs](https://python-poetry.org/docs/) or in the command line usage. For example, one question that came up often was how to delete a poetry virtual environment and start from scratch (the [poetry env remove](https://python-poetry.org/docs/managing-environments#deleting-the-environments) command). Another one that came up a few times was that people were unable to use the poetry command even though they had just pip-installed it: this was because they had missed the bit of output of the pip install command that said they had to add a folder to their PATH environment variable. When questions were asked more than once in a team channel or a private message, they were added to the FAQ section of the poetry migration guide and answered there, along with a link to the official place with the answers.

We also had some frequent questions from intrepid engineers who wanted to go beyond the minimum level of understanding required to complete the migration. For example, we recommended against using caret syntax when specifying dependencies and many people wanted more detail as to why we made that recommendation.

Let's take the hypothetical example of a package named `aardvark`. Let's say that I propose this change on your PR and you are confused because according to the official poetry documentation, they both mean the same thing.

```diff
-aardvark = "^1.2.0"
+aardvark = ">=1.2.0,<2.0.0"
```

Right now we are definitely good for versions 1.2.0 to 2.0.0 (not inclusive) because of [semantic versioning](https://semver.org/). Let's say `aardvark` version 2.0.0 is released and we test it and everything works. Now we'd want to expand the upper end of the range, but there is no good reason to lose the lower end of the range — after all, we're not using any features exclusive to v1.3.0!

You simply can't do this with caret syntax. ^1.2.0 always only means >=1.2.0,<2.0.0. To get it to include 2.0.0 you would necessarily have to lose the 1.x.x versions — you'd have to change it to, say, ^2.0.0.

On the other hand, if you had >=1.2.0,<2.0.0, you could just change this to >=1.2.0,<3.0.0.

It's easier to read and reason about >=1.2.0,<2.0.0 than the caret syntax, it's consistent with all the other code, and therefore our documentation recommended the ">=,<" style in all examples of `poetry add` commands. Fortunately, this is the sort of thing easy enough to add to our linting rules and never need to worry about again, since Poetry's use of the TOML configuration language is very simple to write rules against.

Other FAQs were about gotchas relating to poetry use.

## Poetry Gotchas

There was one common user experience gotcha related to configuring poetry with an authentication token for our private package index. When the configuration command was run, people either saw no output or they saw the following:

```bash
ModuleNotFoundError: No module named 'keyring.util.escape'
No suitable keyring backends were found
Using a plaintext file to store and retrieve credentials
```

Both options confused many people because there wasn't a clear indication of success. So we had to explain that both were actually successful cases — in one case, the credentials are stored in a system keyring and in the other case, where it fails to find one that's properly configured, poetry defaults to storing the credentials in a plaintext file.

Perhaps the biggest gotcha (and the one that required the hackiest fix) was poetry's behavior within Docker images and with virtual environments disabled. If you've installed poetry using pip, poetry's behavior of having `poetry install –no-dev` _uninstall any unmanaged packages_ means that poetry actually uninstalls itself _and all of its dependencies_, which are sometimes required by other packages. Adding poetry as an optional dependency to all Docker images that used poetry packages was our workaround, despite the fact that we never used poetry itself after that step.

```toml
poetry = {version = "^1.1.4", optional = true}
```

## The Future of Poetry

Fast forward several months and the dust has long settled. Poetry is simply the way of the world now and the old ways have vanished with nary a pip. There have been a couple of hurdles along the way, such as a few [incredibly niche issues](https://github.com/renovatebot/renovate/issues/8547) caused by a half dozen simultaneous edge-cases, but none of which weren't resolved quickly and easily. We've submitted a couple of contributions to [fix some issues with Poetry's terminal output](https://github.com/python-poetry/poetry/pull/3881) and to [aid in supporting keyring-style authentication](https://github.com/python-poetry/poetry/pull/4120), but for the most part, everything has been fast and functional; in fact, it's been easy to forget this was once a problem which could have impacted us so wildly.

Being able to forget this was once a Big Deal™ is, of course, the goal; all in all, we've been happy with the new system and have been able to spend less time worrying about our packaging and more time working on that whole "big data and AI" thing people seem to be excited about.
