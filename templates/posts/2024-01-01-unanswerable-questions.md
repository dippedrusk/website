---
title: Efficiently teaching computers to know what they don't know
description: "A non-technical overview of Gautam et al. 2023, our latest paper about making question answering systems more robust: A Lightweight Method for Unanswerable Question Generation in English."
tags:
  - nlp
  - phd
  - question answering
additionalcss:
  - "static/css/fonts.css"
layout: layouts/post
---

I've hit a PhD milestone - my first first-author paper! This is a non-technical post explaining what it's about.

<center>

TL;DR We use simple swaps to turn answerable questions into unanswerable ones, and we use this extra data to create better question answering systems. Our method to create unanswerable questions is better than previous computer-based methods in almost every way, despite being simpler, so new methods should be compared to ours. Simpler is better; don't invent sledgehammers to crack nuts.

</center>

[toc]

## Answering questions with computers

Have you ever wondered what the capital of Saarland is?

If you wanted to answer that question, I imagine you would go to the Wikipedia page for Saarland and then perhaps skim the first few paragraphs until you found the answer in the following sentence:

> **_Saarbrücken_** is the state capital and largest city.

A common way to build question answering systems using machine learning is to follow the same 2-step pipeline:

1. Picking the most relevant document given the question (the Wikipedia page for Saarland, for instance)
2. Then extracting the answer by "reading" the document

But <r>what if your system picked the wrong first document?</r> The Wikipedia page for [Capital (Marxism)](<https://en.wikipedia.org/wiki/Capital_(Marxism)>), for instance, rather than [Saarland](https://en.wikipedia.org/wiki/Saarland).

Or <r>what if your system only had access to documents from an ancient copy of Wikipedia</r>, one with the [2002 entry for Saarland](https://en.wikipedia.org/w/index.php?title=Saarland&oldid=187500), which didn't contain any information about the capital?

Or <r>what if you wanted to know the capital of [Lewis Carroll's Wonderland](<https://en.wikipedia.org/wiki/Wonderland_(fictional_country)>)</r>, a fictional country that doesn't have a (known) capital at all?

All of these cases are failure modes for the typical question answering system, where we would expect it to tell us that it can't answer the question but most systems tend to guess at an answer anyway. Sometimes this may be okay, like in a trivia game with no negative points, but in other cases, like if people were taking health advice from such a system, this could have a serious impact on people's lives.

## Teaching computers to know what they don't know

The reason that these systems always attempt to answer questions is because they are built and trained with the assumption that every question _can_ be answered. One way to fix this is to train these systems with negative samples as well, i.e., questions that cannot be answered with a given document.

To train and evaluate question answering systems, researchers have curated lots of high-quality datasets of answerable questions, but very few datasets exist that contain both answerable and unanswerable questions. There are a few ways to augment only-answerable datasets with unanswerable questions, each with its own advantages and disadvantages:

- **Human annotators** - <g>high-quality</g>, but <r>_slow_</r> and <r>_expensive_</r>
- **Machine learning models trained to generate unanswerable questions** - <g>fast</g>, but <r>_low-quality_</r> and <r>_needs expensive computers_</r> (GPUs)
- **Simple word swaps** - <g>medium-quality</g>, <g>fast</g> and <g>cheap</g>!

## Examples of methods to create unanswerable questions

Let's see how these methods compare when they're all given the same document about Bermuda and an answerable seed question.

> **Document:** <br/>
> The only indigenous mammals of Bermuda are five species of bats, all of which are also found in the eastern United States: ...

> **Answerable seed question:** <br/>
> What are the only native mammals found in Bermuda?

Other than the human annotators, all methods below are computer-based methods to create unanswerable questions. UNANSQ and CRQDA are two machine learning models specifically designed to generate unanswerable questions, and antonym and entity swaps are the lightweight swaps that we recommend using instead. When a method has more "training parameters," that means it requires more expensive computers to run.

<center>

**Human annotators[^rajpurkar-et-al]:** What is one of five indigenous mammals of Bermuda?

**UNANSQ[^zhu-et-al]:** what is the only native mammals found in bermuda ? <br/>
(<g>relevant</g> and <g>partially grammatical</g>, but <r>_answerable_</r> and has <r>_1 million training parameters_</r>)

**CRQDA[^liu-et-al]:** What are the only native mammals are found in?What? </br>
(<g>relevant</g> and <g>unanswerable</g>, but <r>_ungrammatical_</r> and has <r>_593 million training parameters_</r>)

**Antonym-swapped:** What are the only <mark>foreign</mark> mammals found in Bermuda? <br/>
(<g>relevant</g>, <g>grammatical</g>, <g>unanswerable</g> and has <g>0 training parameters</g>!)

**Entity-swapped:** What are the only native mammals found in <mark>United States?</mark> <br/>
(<g>relevant</g>, <g>partially grammatical</g>, <g>unanswerable</g> and has <g>0 training parameters</g>!)

</center>

## Creating unanswerable questions with simple swaps

As the examples in the previous section show, antonym-swapped questions are created by swapping a word for its antonym, and entity-swapped questions are created by swapping an entity (i.e., a proper noun for a person, place or organization) with another entity of the same type.

> **Document:** <br/>
> Saarland is a state of Germany in the southwest of the country. It is the smallest and least populous German state apart from the city-states. Saarbrücken is the state capital and largest city...

> **Answerable seed question:** <br/>
> What is the capital of Saarland?

> **Entity-swapped unanswerable question:** <br/>
> What is the capital of <mark>Germany</mark>?

> **Answerable seed question:** <br/>
> What is the least populous state of Germany?

> **Antonym-swapped unanswerable question:** <br/>
> What is the <mark>most</mark> populous state of Germany?

Reminder: "Unanswerability" here only means that a question is unanswerable _given a certain document_. The swapped questions are unanswerable only because they are paired with the above document about Saarland.

It's very intuitive to see why swaps create questions that make sense. It also helps that getting antonyms and identifying entities are very well-known tasks in the field of natural language processing. Machines are quite good at this in English, which makes the quality of the swapped data better.

## How good are simple swaps?

### Data quality

Since our method and the computer-based methods that came before us all involve creating unanswerable questions, we want to evaluate the quality of all these questions and compare them to ones written by humans. Our method's unanswerable questions turned out to be high-quality along 3 axes that are important for question answering:

1. **Less data noise**: our questions are unanswerable more often than the other computer-based methods, and almost as often as human-written ones
2. **Higher relatedness**: our questions are more relevant to the document
3. **Higher readability**: our questions are more human-readable and grammatical than other computer-based methods, but not as good as human-written ones

These results are especially impressive when you consider that I can run our method on my 2017 MacBook Air, whereas the other methods require much more powerful GPUs.

### More robust question answering

No machine is omniscient, and the big-picture goal of work like this is to build question answering systems that are humbler. To evaluate this, we take two question answering datasets and we augment them with unanswerable questions created using all the computer-based methods. We build question answering systems using all of these versions of each dataset[^extras] and then we test them. If a system trained with one of our swap-augmented datasets does better on the test than a system trained on the original dataset, that means that our swaps make question answering systems more robust.

1. **More robust question answering**: swap-augmented systems do (statistically significantly) better than models trained on the original datasets
2. **Better than the other computer-based methods**: swap-augmented systems are (statistically significantly) more robust

### The catch(es)

My post so far paints a rosy picture of swaps but they definitely aren't perfect. One of the main problems is that swaps create heuristically unanswerable questions, i.e., sometimes we accidentally get questions that _can_ actually be answered with the document, but we put them in the unanswerable box.

> **Document:** <br/>
> On April 4, 2008, Beyoncé and Jay-Z married without publicity...

> **Answerable seed question:** <br/>
> When did Beyoncé get married?

> **Entity-swapped unanswerable question:** <br/>
> When did <mark>Jay-Z</mark> get married?
> (<r>_answerable_</r> because the marriage involves _both_ Beyoncé and Jay-Z)

Human annotators do this too but they do it just a little less often than our method does. Human-written questions are also more creative and diverse than a simple method like this. This is a noticeable qualitative difference which we mention in our paper but don't look at in detail, and we don't really know how question creativity impacts question answering systems anyway.

We're also fairly limited in the domains and languages we can work with, because swapping names and antonyms may not work quite so well when dealing with sources of information that are not Wikipedia. Swapping is also very reliant on the quality of tools you have for recognizing entities and finding the right antonym, and also on syntactic features of the English language. If we didn't have high-quality tools for this in English or if we were operating in German, for instance, a lot of things just wouldn't work.

## The bigger picture

Recently I've been thinking about broader questions that didn't make it into the paper at all.

Our definition of unanswerability hinges on picking a wrong document in step 1, but what if you had a question answering system that doesn't use the 2-step pipeline at all? ChatGPT doesn't rely on access to a document store or to the internet but simply has all its "knowledge" baked in. In this context, it's interesting to look at unanswerability as a property inherent to the question, e.g., if you had a question that assumes something about the state of the world that isn't actually true.

> When was the asteroid that destroyed Australia first spotted?

I've also been thinking about how the world is constantly changing and it is expensive, impractical and plain absurd to up and build a brand new ChatGPT every time a fact changes. There are different, more practical ways to handle this (with varying advantages, disadvantages and degrees of success). I'm curious about how these approaches stack up in the context of question answering, and I've been thinking about the "stickiness" of facts: country capitals change significantly less often than government leaders do. Does this make systems more adaptable to information updates in the latter case?

Quantifying the answers to these questions lets us better understand where these technologies are useful, where a different technical solution might be better, and where we should just keep computers out of the equation altogether. I feel that not enough people are considering this last possibility or thinking critically about the tradeoffs and (social, environmental, etc.) impact of getting a computer to do something, but I'm glad I know and work with many who do. I hope 2024 holds more papers and blog posts about these collaborations - stay tuned!

## Further reading

If you want to read a more technical version of this post, our paper is now available (open access!) in the ACL Anthology:

**[A Lightweight Method to Generate Unanswerable Questions in English](https://aclanthology.org/2023.findings-emnlp.491/).**<br>
Vagrant Gautam, Miaoran Zhang, Dietrich Klakow.<br>
_Findings of EMNLP, 2023._

[^rajpurkar-et-al]: Rajpurkar, P., Jia, R., & Liang, P. (2018). Know What You Don't Know: Unanswerable Questions for SQuAD.
[^zhu-et-al]: Zhu, H., Dong, L., Wei, F., Wang, W., Qin, B., & Liu, T. (2019). Learning to Ask Unanswerable Questions for Machine Reading Comprehension.
[^liu-et-al]: Liu, D., Gong, Y., Fu, J., Yan, Y., Chen, J., Lv, J., Duan, N., & Zhou, M. (2020). Tell Me How to Ask Again: Question Data Augmentation with Controllable Rewriting in Continuous Space.
[^extras]: Not only do we vary the datasets and augmentation methods, but we also use different machine learning models as the backbone for our question answering systems and we average results over 3 random seeds. It's hard to explain these last two concepts without getting into the weeds with technical information that's not really necessary for the overall point so I'm not going to bother.
