---
title: Less gender tracking, more gender hacking
description: Various problems with gender tracking in current research, and some thoughts for the future.
tags:
  - gender
  - machine learning
layout: layouts/post
---

This post is a Yet Another Critique of gender trackers. I want to preface this post by saying that literally nothing I say in here is new or hasn't been said before - by me on Twitter, on panels, in reviews, over coffee, etc., and by countless others in all these forms as well as brilliant papers, some of which are cited at the end of this post. It is just that (as evidenced by the proliferation of papers in this area and the recurring problems that come up), the system builders who should read these ideas are not reading them, or not internalizing them. Hopefully some of them read my blog.

## Positionality

We should start by addressing my positionality as I write this, not just because I have a social-scientist-pleasing complex but also because it is very relevant to the trajectory of my views on gender trackers. Let's start with the fact that I worked on a gender tracker myself and even co-authored a paper about it. I also used to be a cis brown woman, and now I'm trans and nonbinary (still brown though).



This project seeks to quantify gender bias in the media by counting the proportion of people quoted in news text who are women. To do so, we developed a system that analyzes articles published online by certain English-language Canadian news outlets, using parts we built in combination with off-the-shelf NLP tools.

## The problem with "social good"

...is that there is never a "for whom?" at the end of it.

Easy and “social good”
“If i could build a 98% accurate system with a binary model of gender why wouldn’t i”
Relegate the “edge cases” to unknown, or unimportant, or a footnote
“Easy” methodologies (name classifiers), easy data that is binary-coded (ACL he said, she said database), just 2 options to consider, English pronouns, German pronouns, etc.
who is left out? why don't they matter? why do they matter less?
This argument won’t work on most people but: the premise is bad! Capitalist idea of “you need a critical mass of people to be worth it” - prefer to orient towards more community-based models of everyone mattering and of harm mattering
If it’s a process that puts disproportional errors on minority communities and they bear the burden of doing work for redress, that’s… not a good process

HEGEMONY

Gender is fluid and personal, and therefore "gender recognition" as a concept is impossible to do. At the same time, equitable representation in the media is important, and all previous manual attempts at quantifying this gender gap in media quotes have required orders of magnitude more time and labour, while still suffering from many of the same assumptions (e.g., correlating certain names with a gender, assuming pronouns unambiguously tell you someone's gender, etc.). Self-reported gender for speakers quoted in newspaper articles is not information that reporters collect, though this would be how to do this research in a perfect world.

Nota bene: This project uses gender analysis that has some notable flaws. Although we have three categories of gender—male, female and other—the 'other' category lumps together cases where the speaker's gender is unknown as well as where the speaker's gender is known to fall outside the binary. Furthermore, our system depends on databases that encode binary gender (which erases nonbinary people) and on other NLP systems, e.g., for coreference analysis, that are known to have significant performance gaps for resolving instances of singular they and for English neopronouns (ze/hir, xe/xyr, etc.). We have manual overrides for (famous) people whom we know are systematically misgendered by these systems we depend on, but for most cases, we make probabilistic guesses at a person's gender based on their name - a problematic and cissexist practice. This impacts the accuracy of all reported results and we discuss these ethical considerations and more in our paper.

white feminism, trickle down economics

## The slice-and-dice problem and computer science culture

Few exceptions - genuinely think a lot of people do not know non-binary gender is a possibility, or they think it is such a minority as to be insignificant
In a field that is so statistical and cares about accuracy and thinks the exceptions are insignificant or the harm is not that bad, or the good outweighs the harm
But you see, I think this level of systemic exclusion and misgendering is harmful
They want to apply the same methods to non-binary people like “let’s make a database of nonbinary people and then we can balance our gender detectors more!”  and then we say no you’ve entirely missed the point

SOCIOTECHNICALLLL

I mean, everything? Like the more I learn about the construction of gender, the more I see how tightly intertwined it is with the construction of race, ability, etc. A lot of people separate these things but it doesn’t actually make sense to, and you CAN’T. So if de-emphasizing or removing a binary of gender to me means a much broader dismantling of oppressive systems, or even just a recognition of that. And if gender is the gateway that people need to start seeing the sociotechnical in the problems we try to solve in computing, then that’s awesome.

TECHNOSOLUTIONISM

## Praxis-free citation

ethicswashing and citing things that tell you not to do the thing, then doing it anyway >:( or like, saying oh we have to be very careful with these things and these are the issues but then doing it anyway. which my paper totally did! it's better than many horrendous things i've seen because it is at least (to some degree) power-aware, but it is not counter-power. and that argument is weak anyway it's like being canada and saying "well at least we're better than the US" while having almost exactly the same legacy of slavery, Indigenous genocide, colonialism, etc. like well done, the bar is in hell lmao.

## A (tentative) future

ask people!!1!1 open form text boxes, yes i get tracking metrics is important. i am aligned on the goal not the methods or the slice-and-diciness of the results.

no more gender classifiers by name, by pronoun, by face. I do not believe that the benefit of them outweighs the multiple ways in which they take away security and autonomy, and enforce hegemony on so many axes besides gender even when that’s all they’re claiming to do.

Neopronouns! Broader conceptualization of gender! Intersectionality built in (the real intersectionality, not the weird version some people come up with)! Katta Spiel’s imaginative works! Moving beyond transnormativity!
Neopronouns, for sure
Story generation
Ontologies of gender and what they miss - e.g., intersex people, “deadname” => highly localized specific things, community, etcg.
It’s a process not an end result (especially with systems)

More nonbinary people altogether so we’re un-ignorable :)
Anarchist data annotation
Don’t build stuff :) never again tech pledge, Rachel Tatman What I Won’t Build talk
Solidarity and community, not a thing you can do individually

## Further reading


    The Coloniality of Gender - María Lugones

    Nuance and normativity in trans linguistic research - Lex Konnelly

    Welcome to the Modern World of Pronouns: Identity-Inclusive Natural Language Processing beyond Gender - Anne Lauscher, Archie Crowley, Dirk Hovy

    The Misgendering Machines: Trans/HCI Implications of Automatic Gender Recognition - Os Keyes

    Theories of “Gender” in NLP Bias Research - Hannah Devinney, Jenny Björklund, Henrik Björklund

    You Keep Using That Word: Ways of Thinking about Gender in Computing Research - Os Keyes, Chandler May, Annabelle Carrell

    Feeling fixes: mess and emotion in algorithmic audits - Os Keyes, Jeannie Austin

    "Why are they all obsessed with Gender?" — (Non)binary Navigations through Technological Infrastructures - Katta Spiel

    Harms of Gender Exclusivity and Challenges in Non-Binary Representation in Language Technologies - Sunipa Dev, Masoud Monajatipoor, Arjun Subramonian, Jeff Phillips, Kai-Wei Chang

    Gender as a Variable in Natural-Language Processing: Ethical Considerations - Brian Larson

    Gender Recognition or Gender Reductionism?: The Social Implications of Embedded Gender Recognition Systems - Foad Hamidi, Morgan Klaus Scheuerman, Stacy M. Branham

    Rebuilding Trust: Queer in AI Approach to Artificial Intelligence Risk Management - QueerInAI Organizers, Ashwin S, William Agnew, Hetvi Jethwani, Arjun Subramonian

    Revisiting Gendered Web Forms: An Evaluation of Gender Inputs with (Non-)Binary People - Morgan Klaus Scheuerman, Jialun Aaron Jiang, Katta Spiel, Jed R. Brubaker

    Stone Butch Blues - Leslie Feinberg

    Evan Greer

    The Hirs Collective

    HCI gender guidelines

If you are considering doing similar work or just generally examining gender as a variable, I encourage you to look at the following references: this blog post on trans-inclusive AI, this excellent talk by Kirby Conrod on How To Do Things With Gender, the Cao-Daumé paper on gender-inclusive coreference resolution which includes some great examples and new datasets, and this paper by Brian Larson on gender as a variable in NLP, informed by the Belmont Report. Look up Kirby Conrod, Os Keyes, Lauren Ackerman and Ártemis López. For gender and facial recognition, read this paper evaluating commercial facial recognition technologies, and this Os Keyes paper about the impact of gender recognition using facial analysis on trans folks. Also follow this guide for HCI researchers on how to do better with gender on surveys.

https://towardsdatascience.com/towards-trans-inclusive-ai-a4abe9ad4e62

https://www.youtube.com/watch?v=jVr8NJwcMH4

https://aclanthology.org/W17-1601/

https://dl.acm.org/doi/abs/10.1145/3359246

https://dl.acm.org/doi/10.1145/3274357

https://interactions.acm.org/archive/view/july-august-2019/how-to-do-better-with-gender-on-surveys

more katta!!

TODO (guidelines for asking about gender (various)
