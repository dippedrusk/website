---
title: "Predicting gender from names: Don't."
description: Just don't do it! Here are some reasons why, with citations, and some alternatives.
tags:
  - gender
  - machine learning
layout: layouts/post
---

It usually starts off something like, "We want to use machine learning to quantify the number of women and men who are XYZ." In my case, the XYZ was: quoted in Canadian news publications.

What about non-binary people?

Oh right, they exist. Okay, I'll add a non-binary category for people who I can't be sure are men or women.

How exactly are you defining this category? "people who you can't be sure are men or women," how exactly are you deciding that?

Sounds like apart from non-binary people, this also conflates people whom you perceive as gender-ambiguous and people who don't disclose their gender to you. How are you going to collect this data anyway?

I'm going to keep a database of people's names and their genders!

I think names and genders are personal information under GDPR regulations so I hope you no one in the EU lol. Btw how are you going to get people to give you their names and genders anyway?

Oh, I'm going to scrape people's names using named entity recognition and then use a website that makes probabilistic guesses at their gender based on their names.

Okay, there are several problems with this, but let me raise my issues one at a time, starting with: these tools typically encode gender on a binary so we're back to "What about non-binary people?" What about people named Rain and Moss? I'm not even sure named entity recognition will get those.

Well, that's the magic of my database, right? I can override people who are obviously non-binary. Like Janelle Monae! (I love her—I mean them!!!)

There's a lot riding on your definition of "obviously" non-binary. What do you mean by that exactly? You name Janelle Monae. So do you mean famous non-binary people?

Yeah, by 'obvious' I mean that it's really well-known that they're non-binary. So yeah, I suppose that's famous non-binary people.

Okay, have you considered the hegemony of that? Specifically, of deciding and then encoding in your database that only the famous non-binary people "count" as non-binary?

Okay fine, how about I add a rule for noun names? You gave the examples Rain and Moss, right? That'll be pretty easy to account for. And it should fix anything that the named entity recognition misses, as well. Boom. The magic of engineering.

Okay, but do you see how reducing non-binary people to "the famous ones" and "the ones who have noun names" is also hegemonic, and how it delegitimizes all the non-binary people who DON'T fall into one or both of those categories? Have you considered that?

Hm, not really.

Yeah. Not really. It's clear that you haven't been thinking about non-binary people a lot or for very long, so let's try something easier. There are plenty of men and women who have names like Alex. What does your gender tool do to them?

I don't know but I guess it would pick a side based on 


Hegemony

Also in cultural aspects

Bayesian priors about people's names and genders doesn't allow them to exist. "Machine learning" / big data isn't the right way to quantify this.

"That's pretty cissexist" isn't it?

[human analysis of stuff]

[okay a lot of the same problems]

[self-declaration!]
["counted as for the purposes of this survey"]

and while you're at it, if people are willing to disclose their race, etc., you can also see other problems with this.



Does caring about this level of detail even matter? Non-binary people are such a tiny fraction of the population, and all these problems with gender-neutral names are also so small, and the cultural names as well, probably. With big data won't you still get the general patterns?

If all you care about is the general pattern then why don't you just look at decades of work in multiple other fields that show (without machine learning) that, yes, sexism does in fact exist.

More seriously, there are two perspectives from which you can look at this. One is that to have any idea how accurate your model of the world is, you need to be able to reasonably assess exactly where the inaccuracies seep in and by how much. But you see, you have no ground truth here to work with. You have no clue how big your error bars are. Anyway, this is the boring perspective and it's not one I particularly care for. I'm just sharing it with you because I can tell from things you've said that you would immediately see the value in this perspective. This is your epistemological baggage.

Anyway, the second perspective is: it matters for political and ethical reasons. Your premise at the start was that you wanted to "quantify gender bias." I assume that, as is the case for most well-meaning computer scientists who start asking questions like this, it's because you see inequality in society and want to do something about it - name it, measure it, fix it. Well the thing is, you can't pick and choose inequalities. Or, well, you can, but it isn't coherent. Or, well, it's coherent, if you assume that all the other categories have their "default" values, i.e., white, able-bodied, etc., in our shared Canadian and German context.

Well the thing is, it's incoherent to "pick and choose" inequalities. You're currently working with a definition of gender that expects names to correlate with gender, be gendered in a binary way, and be well-represented in NLP tools and gender databases. This is the sort of definition that only works for cisgender white people with Anglo names. Basically, what you do will end up helping white women and no one else. If you're comfortable acknowledging that, well, then you and I have some major political differences. If you're uncomfortable naming that but you want to build your tool anyway, you're being dishonest.





It is just that (as evidenced by the proliferation of papers in this area and the recurring problems that come up), the system builders who should read these ideas are not reading them, or not internalizing them. Hopefully some of them read my blog.

## Positionality

We should start by addressing my positionality as I write this, not just because I have a social-scientist-pleasing complex but also because it is very relevant to the trajectory of my views on gender trackers. Let's start with the fact that I worked on a gender tracker myself and even co-authored a paper about it. I also used to be a cis brown woman, and now I'm trans and nonbinary (still brown though).

I do computer science. I do machine learning even. It is my bread and butter and has been for years now.

My background is in computer science and linguistics and it is very quantitative. I did not do sociolinguistics in school. The way I was taught how to be a computer scientist was with all the usual principles of reducing complexity and modelling things simply, elegantly. No matter who you stomp over in the process.


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

the gender binary (male, female) -> gender binary (cis, trans) -> gender ternary (cis, trans, nonbinary) -> quantum gender (demigirl, nonbinary woman) -> hyperdimensional gender (purple, moon, rustling leaves) -> gender annihilation (gender non-compliant, no, NULL, &c) pipeline

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


you might disagree with this. if you think xyz then idk what to tell you but not everyone agrees with you. it isn't an "i'm right and you're wrong" thing but it's more like my values are different and i'm not even sure everyone understands the values they're espousing let alone saying it with their chest.
