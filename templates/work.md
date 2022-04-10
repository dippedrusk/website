---
title: Work
description: Work and research experience relevant to computational linguistics and NLP
layout: layouts/layout
---

[[toc]]

<div class="section">

## Dialpad, Inc.

Speech Recognition Engineer (previously Computational Linguist)

- **Integrated class-based and ngram language modelling** in a WFST
  architecture, for improved speech recognition of classes of English
  words
- Maintained code to **domain-adapt (at the word level) a generic
  English speech recognition model** to companies on-the-fly based on
  metadata
- **Expanded the scope of this domain adaptation to the user level**,
  increasing the recall of name transcription by 15% relative, without
  negatively impacting WER.
- Optimized the training algorithm for this domain adaptation,
  enabling a 288x speedup (including parallelizing with Kubeflow).
- **Maintained multi-dialectal English lexica** through manual review
  of entries; **wrote a syllabifier** to auto-flag entries that
  violate English syllable structure
- **Scoped speech recognition and scaling for languages other than
  English** and made a long-term plan for the company, weighing
  linguistic considerations, technical and data limitations, and
  financial constraints
- Spearheaded the **creation of a [policy about inclusive
  language](https://github.com/dialpad/inclusive-language) at the
  company, both technical and otherwise**
- Organized a computational linguistics olympiad for the data science
  teams
- Maintained linting, pre-commit, CI/CD code for automated deploys of
  packages and Docker images.

#### Select presentations

- Vowels (vowels in phonetics, phonology, acoustics and speech
  recognition)
- Ethics in NLP (introduction to concepts in ethical NLP)
- Catchy Title Goes Here: A metapresentation (how to make better
  presentations)
- Flagging Mispronunciations (introduction to phonology and
  syllabification)
- Intermediate RegEx Practice (writing effective regular expressions
  in multiple languages)
- Technical Changes and User Impact (how to communicate better about
  technical changes)
- How To: ARPABET (introduction to phonemic transcription using
  ARPABET)
- Git (introduction and intermediate topics to version control with
  git)
- RST workshop (writing good documentation in reStructured Text)
- Intro to observability

</div>

<div class="section">

## SFU Discourse Processing Lab

Research Assistant

#### Gender Gap Tracker

This project seeks to quantify gender bias in the media by counting the
proportion of people quoted in news text who are women. To do so, we
developed a system that analyzes articles published online by certain
English-language Canadian news outlets, using parts we built in
combination with off-the-shelf NLP tools.

_Nota bene: This project uses gender analysis that has some notable
flaws. Although we have three categories of gender—male, female and
other—the 'other' category lumps together cases where the speaker's
gender is unknown as well as where the speaker's gender is known to fall
outside the binary. Furthermore, our system depends on databases that
encode binary gender (which erases nonbinary people) and on other NLP
systems, e.g., for coreference analysis, that are known to have
significant performance gaps for resolving instances of singular they
and for English neopronouns (ze/hir, xe/xyr, etc.). We have manual
overrides for (famous) people whom we know are systematically
misgendered by these systems we depend on, but for most cases, we make
probabilistic guesses at a person's gender based on their name - a
problematic and cissexist practice. This impacts the accuracy of all
reported results and we discuss these ethical considerations and more in
our paper._

_Gender is fluid and personal, and therefore "gender recognition" as a
concept is impossible to do. At the same time, equitable representation
in the media is important, and all previous manual attempts at
quantifying this gender gap in media quotes have required orders of
magnitude more time and labour, while still suffering from many of the
same assumptions (e.g., correlating certain names with a gender,
assuming pronouns unambiguously tell you someone's gender, etc.).
Self-reported gender for speakers quoted in newspaper articles is not
information that reporters collect, though this would be how to do this
research in a perfect world._

_If you are considering doing similar work or just generally examining
gender as a variable, I encourage you to look at the following
references: this [blog post on trans-inclusive
AI](https://towardsdatascience.com/towards-trans-inclusive-ai-a4abe9ad4e62),
this excellent [talk by Kirby Conrod on How To Do Things With
Gender](https://www.youtube.com/watch?v=jVr8NJwcMH4), the [Cao-Daumé
paper on gender-inclusive coreference
resolution](https://aclanthology.org/2020.acl-main.418/) which
includes some great examples and new datasets, and this [paper by Brian
Larson on gender as a variable in
NLP](https://aclanthology.org/W17-1601/), informed by the
Belmont Report. Look up Kirby Conrod, Os Keyes, Lauren Ackerman and
Ártemis López. For gender and facial recognition, read [this paper
evaluating commercial facial recognition
technologies](https://dl.acm.org/doi/abs/10.1145/3359246), and this [Os
Keyes paper about the impact of gender recognition using facial analysis
on trans folks](https://dl.acm.org/doi/10.1145/3274357). Also follow
this [guide for HCI researchers on how to do better with gender on
surveys](https://interactions.acm.org/archive/view/july-august-2019/how-to-do-better-with-gender-on-surveys)._

- Paper: [The Gender Gap Tracker: Using Natural Language Processing to
  measure gender bias in
  media](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0245533) (2021). PLoS
  ONE 16(1). F. T. Asr, M. Mazraeh, A. Lopes,
  **V. Gautam**, J. Gonzales, P. Rao, and M. Taboada.
- Website: [Gender Gap
  Tracker](https://gendergaptracker.informedopinions.org/)
- Article: [Tracking the gender gap in Canadian
  media](https://theconversation.com/tracking-the-gender-gap-in-canadian-media-110082)
  (2019). M. Taboada, F. T. Asr.
- Press: [The future of women's voices in media: an interview with
  Gender Gap Tracker's lead SFU
  researcher](https://www.sfu.ca/sfunews/stories/2019/03/the-future-of-womens-voices-in-media-maite-taboada.html)
  (2019).
- Talk and panel discussion: Tracking the Gender Gap in Canadian Media -
  Taking a Big Data Approach (2019). SFU Big Data Hub. I was a
  panelist.
- Code: [Gender Gap Tracker GitHub
  repository](https://github.com/sfu-discourse-lab/GenderGapTracker)

#### TACT: Topic Analysis, Constructiveness and Toxicity

This project analyzed millions of online comments on English news
articles to examine toxicity, constructiveness, and content in this
genre and their interplay. Our results paint a more positive picture of
the internet than our lay perceptions because it turns out that
moderated comment sections are quite constructive. Our findings yield
insights for news outlets to moderate comments and advise commenters, as
well as for internet citizens looking to have more meaningful
interactions with others online.

- Technical report (PDF): Constructiveness and Toxicity in Online News
  Comments (2019). **V. Gautam** and M. Taboada.
- Article: [Tyee Commenters
  Assessed](https://thetyee.ca/Culture/2019/11/06/Tyee-Commenters-Assessed/)
  (2019). **V. Gautam** and M. Taboada.
- Radio: [Recent Study Finds Online Comments Surprisingly
  Constructive](https://archive.org/details/recentstudyfindsonlinecommentssurprisinglyconstructive)
  (2019). Redeye, Vancouver Cooperative Radio, CFRO 100.5FM. **V. Gautam**.
- Poster (PDF): Automatic comment moderation: topics and toxicity in
  online news (2019). SFU Linguistics Poster Session. **V. Gautam** and M. Taboada.
- Talk: Content moderation in social media (2018). SFU Public
  Discourse and Data Science Symposium. M. Taboada and **V. Gautam**.
- Talk: Automating Comment Moderation: Topics and Toxicity in Online
  News (2019). Undergraduate Research Symposium. **V. Gautam**.
- Code: [TACT GitHub
  repository](https://github.com/sfu-discourse-lab/TACT)

#### Adverbly Adjectives

This project aimed to create a semantic classification of the
\[adverb-ly adjective\] construction - an adjective modified by an
adverb ending in 'ly'. I used R and Python to computationally extract,
count and classify instances of these constructions in large corpora
([COCA](https://www.english-corpora.org/coca/),
[CORE](https://www.english-corpora.org/core/),
[SOCC](https://github.com/sfu-discourse-lab/SOCC), [CMU
Movie$](http://www.cs.cmu.edu/~ark/movie%24-data/), [Cornell movie
reviews](https://www.cs.cornell.edu/people/pabo/movie-review-data/),
[NYT
reviews](https://developer.nytimes.com/docs/movie-reviews-api/1/overview))

- Paper: Hilariously ridiculous and other adverb-adjective
  combinations: Classification and frequency distribution across
  registers (2018). 4th Meeting of the American Pragmatics
  Association. C. Goddard, M. Taboada and R. Trnavac.
- Poster: The English \[adverb-ly adjective\] construction:
  Classification and distribution across corpora and registers (2019).
  Canadian Linguistics Association. C. Goddard, M. Taboada and
  R. Trnavac.
- Code: [Adverbly Adjectives GitHub
  repository](https://github.com/sfu-discourse-lab/adverbly_adjectives)

</div>

<div class="section">

## GE Digital

Software Engineer (Intern)

- Developed software for Predix App Engine, a platform for the
  Industrial Internet of Things - added features, resolved bugs, wrote
  automated tests, and maintained documentation.
- Led the effort to write a comprehensive technical Installation Guide
  for on-premise installation of our multi-node, multi-service
  platform, which required broad knowledge of the platform services,
  networking, system administration and security.
- Helped overhaul the software architecture of authentication and
  access control for the product using Cloud Foundry User Account and
  Authentication (UAA).

</div>

<div class="section">

## SFU Phonological Processing Lab

Research Assistant

- Worked in a group led by Dr Ashley Farris-Trimble on several
  projects aimed at studying phonological processing by using
  eye-tracking experiments in the visual world paradigm
- Curated visual and auditory stimuli, created word lists, programmed
  the experiments with SR Research Experiment Builder and MATLAB
- Used an eye-tracker and an audiometer to run participants in
  experiments
- Organized and ran linguistics-themed day camps to recruit children
  for studies

</div>
