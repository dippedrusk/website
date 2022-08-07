---
title: Gentle intro to category theory
description: No-math introduction to the concept of a category and why this branch of math is useful
tags:
  - math
layout: layouts/post
---

We take a high-level look at why category theory matters before diving into the definition and then constructing two example categories with dogs and birds. We use zero math along the way, except for some mild name-dropping of fancy math terms when I give you context for why it matters.

[[toc]]

## Why does category theory matter?

This post is a math-free introduction to category theory, but the people who use and do category theory are generally doing a lot of math. They care less about the dog and bird categories we'll see here, and more about mathematical and abstract concepts, including sets, groups, rings, posets, stuff from algebraic geometry, topology, homology, and lots of other words from subfields of math that I don't know or understand. The definition of a category and various operations you can do on categories provide mathematicians with a system that lets them define and reason about all these other kinds of math, very much like how set theory (if you're familiar with it) provides a foundational system to define and reason about other types of math.

Category theory is also relevant to allied nerds, including some types of computer scientists and some types of linguists (not me on either count): it provides a natural way to think about functional programming, type theory, formal semantics, lambda calculus, etc. We'll revisit some of these ideas at the end to make the connections more concrete.

It's hard to convey the power of category theory in this blog post for two main reasons:

1. I am only showing you the definition of a category and some intuition for it, not any operations you can do with categories - including concepts such as isomorphisms, functors, natural transformations, limits, colimits, duality, exponentials, products, coproducts, the Yoneda lemma, etc. These operations give you interesting properties and ways of relating a category to itself as well as to others. This is the stuff that really allows you to do all the fancy math.
2. Category theory is extremely abstract and mathematical (no joke: it's actually been described as [abstract nonsense](https://en.wikipedia.org/wiki/Abstract_nonsense) by mathematicians!), and my entire goal in writing this blog post has been to try to explain it in as concretely imaginable a way as I could.
3. Bonus reason: The post got too long and I had to stop.

Even so, I hope that once I show you what a category is, I can draw the first few connections to related concepts so that if this interests you, you can go deeper into it. So without further ado, let's dive into the definition of a category.

## Category

You can think of a category essentially as a special mathematical container that contains two types of things ("objects" and "arrows") and the arrows must satisfy some conditions ("identity," "composition" and "associativity").

### Objects

Objects are just... objects! Of any kind. You could have shapes or numbers or cakes or animals in there. In general category theory cares less about specific objects and much more about the relationships between them (defined by the arrows). This is part of what makes category theory hard for me to think about - I'm used to thinking about real, tangible objects, whereas category theory wants to abstract that away.

### Arrows

Arrows (also called morphisms, but I'll keep using arrow in this blog post for consistency) are a way of specifying a relationship that goes from one object to another. In the world of categories, this relationship is just abstract. The arrows in a category do not have to _mean_ something, nor do they all have to mean the same thing. But in the less abstract world of this blog post, we'll look at arrows as representing more concrete relationships, e.g., in a category with people objects, an arrow from person A to person B could mean that A is B's parent, or that B has A's name, or that A is a neighbour of B, or just about anything you like. We just have to make sure that we have identity arrows and that composition and associativity work - which some of these examples fail to do, as we'll see.

### Identity

The identity arrow is an arrow that goes from an object back to itself. If we take our "arrows as relationships" metaphor from before, it's like saying that the object has that relationship with itself. Let's take a look at the examples we saw earlier and check if they have identity arrows:

- If we have arrows representing a parent relationship, person A cannot be their own parent - that's impossible. So we don't have an identity arrow there.
- On the other hand, if we are looking at the relationship of shared names, of course A shares a name with themself, as well as potentially with other people.
- As for whether you are one of your own neighbours, I think the answer is yes on a technicality - you definitely live in proximity to yourself. However, this is a very mathematical and perhaps unintuitive way of thinking about the neighbour relationship so it's fine if you're less convinced by this example having an identity relationship built in.

### Composition

Composition is about being able to stack arrows together. If there is an arrow from person A to person B, and an arrow from person B to C, then we want our category to automatically have an arrow from person A to C as well.

- This means that our parent relationship example doesn't work because if A's parent is B and B's parent is C, that doesn't automatically imply that C is also A's parent. So we do not have composition there.
- If A and B have the same name and B and C have the same name, then that means that A and C definitely have the same name, i.e., we have composition.
- With neighbours, once again it's sort of tricky and depends on your definition of neighbours. If you consider a neighbour to be someone who is at most one door away from you, then a neighbour of your neighbour need not be your neighbour and that means you don't have composition. On the other hand, if you have a looser interpretation of being neighbours then you might end up with a long chain of neighbours where at some point the analogy breaks down. You may be neighbours with your neighbour but you're probably not neighbours with your neighbour's neighbour's neighbour's neighbour's neighbour. So then either you don't have a composition (and therefore no category), _or_ you have composition but it doesn't accurately represent the neighbour relationship.

### Associativity

The last requirement of composable arrows in category theory is what's called 'associativity'. It's the idea that when you stack a bunch of arrows together in a fixed order, you can group the arrows in different ways that don't affect the end result. The classic example of this in mathematics is addition versus subtraction. Addition is associative: `(3 + 2) + 1 = 3 + (2 + 1)`. Subtraction is not: `(3 - 2) - 1 ≠ 3 - (2 - 1)`.

A real world analogy I like to use to describe non-associativity is making a science fair volcano. You have to combine diluted vinegar, baking soda and water to make your volcano explode. The critical thing is that it's the interaction of the vinegar and the baking soda that create the explosion. So if you build your volcano with vinegar and baking soda inside and plan to add water at the science fair, you're definitely not going to win because the explosion would've happened when you were building it at home. If you build your volcano with vinegar inside and add a slurry of baking soda and water on the day of the fair, then you stand a chance. In pseudo-mathematical notation:

<center>
<pre>(vinegar + baking soda) + water ≠ vinegar + (baking soda + water)</pre>
</center>

Note that the order of the addition of ingredients here is the same; it's just the order in which I combine the _substeps_ of that addition that changes the results and makes it non-associative.Because of Math Reasons I elaborate on in the appendix, associativity is automatically true for all the examples I use in this blog post, as long as they have composition. It will probably also feel fairly intuitive for that to be true, e.g., the relationship of having the same name (which we already saw was composable) is also associative! If person A, B and C all have the same name, then splitting that same-name relationship into different subgroups is not meaningful in the same way as combinations of chemicals. That's why for the rest of this blog post, we will just test whether our examples have composition or not, and if they do then we'll know that the associativity requirement is satisfied too.

## Dog categories

Let's try to build a category with dogs! So clearly I want the objects in my category to be dogs - all the dogs in the entire world of various species and ages and with various names and homes.

What about the arrows? Well, let's first try the older-than arrow. That would mean that there is an arrow from Max to Owie (both dogs) if Max is older than Owie. So now we have some candidate arrows, but we have to check that identity and composition are satisfied.

An identity arrow is an arrow from a dog to itself, so does this relation give us identity arrows for free? If an identity arrow on Max existed, it would imply that Max is older than... Max. This doesn't make much sense because a dog cannot be older than itself. So unfortunately that means that these candidate arrows do not work for us.

But all hope is not lost! A dog is definitely the same age as itself, so we could always use a slightly modified relationship - the older-than-or-same-age-as relationship! Here we definitely have identity arrows because Max is the same age as himself. We also have arrows to other dogs Owie, Cypress, etc., if Max is older than those dogs or if Max is the same age as those dogs.

Now we just have to check for composition. Composition means that if there's an arrow from Max to Owie and an arrow from Owie to Cypress we have to already have an arrow from Max to Cypress as well, by the definition of our arrows. So let's say Max is 13 years old and Owie is 11 years old. Since Max is older than Owie, there's definitely an arrow from Max to Owie. Let's say that we have a dog named Cypress who is also 11 years old. There's an arrow from Owie to Cypress because they are both the same age. Do we know that there's an arrow from Max to Cypress? Yes! Because 13 is older than 11, and therefore there must be an arrow from Max to Cypress as well. This means we have composition (and associativity because of our math hack I alluded to before), which means we just built our first category!

A fun observation about this category is that every single dog in the world will have arrows besides the identity arrow, either going from it to other dogs or from other dogs to it. All dogs are connected. This is because every single dog has to be younger than or older than or the same age as other dogs. The youngest newborn puppy just emerging into the world will have an arrow pointing to it from every other dog because they are all older than it (or the same age, if multiple puppies are being born at exactly the same time in different places around the world). The oldest alive Guinness-world-record-holding dog will have arrows going out from it to every other dog in the world because it's older than all of them. No dog is left arrow-less and isolated in this category.

## Bird categories

Let's try building another category. Because I'm me, we have to build a category with bird species as our objects. Note that here, unlike in our previous dog category, we don't have individual birds as objects, but just one object per _species_ of bird, so we'd have one California condor object in our category, as opposed to 537 (or so) objects for each of the California condors that exist globally.

As for arrows, I want to try something interesting - a mating arrow! By this I mean that there would be an arrow between bird species A and B if members of A and B have been known to mate successfully. Hybridization (or inter-species mating) happens sometimes among birds, particularly between gulls, terns, hummingbirds and various waterfowl species. So let's do our usual thing of checking these candidate arrows for identity and composition.

If an identity arrow on the species _Turdus migratorius_ existed, it would imply that members of _Turdus migratorius_ can mate with members of _Turdus migratorius_. This is definitely true because a species has to reproduce among its members so that it continues to exist as a species. So we have identity arrows!

Now let's check about composition. If western gulls and glaucous-winged gulls can interbreed, and glaucous-winged gulls and herring gulls can interbreed, does that automatically mean that western gulls and herring gulls can interbreed? Well, not quite, unfortunately. Western x glaucous-winged gulls and glaucous-winged x herring gulls are popular and often-spotted hybrids, but I don't know of a single western x herring gull, and it is not clear that that is a possible hybridization. So inter-species mating is not compositional and unfortunately this means that we can't build a category with this arrow definition.

So we have to try a different arrow. This time let's try the same-genus arrow. What this means is that there is an arrow from species A to species B if they are both in the same genus (the next higher level of classification). For example, there would be a arrow from the spectacled thrush to the bare-eyed thrush (and vice versa!) because both are in the Turdus genus.

We have identity arrows because a species is definitely in the same genus as itself. Now let's look at composition. If red-tailed hawks and ferruginous hawks are in the same genus, and ferruginous hawks and rough-legged buzzards are in the same genus, does that mean that red-tailed hawks and rough-legged buzzards are in the same genus? Yes (it's Buteo)! So that means we have a bird category.

One ornithological problem that we've ignored in our operationalization of this category here is that species and genera are not defined statically forever. Sometimes we find new species and new genera, sometimes species get reclassified together or varieties get separated out into distinct species, and sometimes a species gets moved into a different genus based on new DNA information. So really the world of classification is a lot messier than we're making it out to be in this toy example, but that's a slight tangent from category theory.

Something to notice about the structure of this category is that unlike our dog category, our bird category has all sorts of different clusters, including the possibility for a bird species to have no arrows to any others (other than itself; the identity arrow). This would imply that that bird species is the only one in its genus. This is true of many bird species, including for example the collared lory (a fun tongue-twister), the only one in its genus Phigys. On the other hand there would also be larger, fully-connected clusters representing genera which contain more species, e.g., the Turdus genus which has over 80 species classified under it.

## Connecting back to computer science and linguistics

Now that we know what categories, objects, arrows, and composition are, let's go back to the terms I'd mentioned earlier from computer science and linguistics and make those connections a bit more explicit in case they are useful reference points for you.

Functions are the fundamental unit of functional programming and you do things by composing different functions together. So category theory gives us a natural way to think about computer programs because we can treat functions as arrows that have composition. Category theory is also relevant to type theorists because a category whose objects are types is just a different way of viewing or defining a type theory, which means that we can then do category theory math on type theory stuff.

Formal semantics cares about compositionality in exactly the same way we do here, which is that we view predicates as functions (the arrows of a category) and subjects as arguments to those functions (the objects of a category). Lambda calculus and type theory are tightly connected, and they are both represented by what are called CCCs (Cartesian Closed Categories) in category theory.

If you're not a mathematician, computer scientist or a linguist, and I haven't managed to convince you of the importance and power of category theory because of my hand-waving the math away, that's okay. Regardless, if there's one fundamental idea I can leave you with, it would be this:

Category theory is all about the arrows. The magic is in the arrows. Category theorists don't care what specific objects they're dealing with, they just care about how you can do compositional operations on them. It's unlike set theory in this way because set theory does care about objects. It's ground-breaking and different specifically because it gives you this arrow-centric way of reasoning about math.

## Appendix (warning: math!)

All the examples I present in this blog post are binary relations on sets. If a binary relation is composable with another, then you get associativity for free! This of course does not apply to all sorts of other math, including (as I mentioned previously) subtraction.

Related to this, a bonus fact I learned was that you can do something called [demonic composition](https://en.wikipedia.org/wiki/Demonic_composition) of binary relations, which _isn't_ associative, but this isn't really composition. I find this term amusing.

## Resources

The following list is arranged in order of level of mathematical background assumed, mostly from my personal experience of using these resources. If you're interested in one of the books, I encourage you to try your library or a local bookstore rather than the union-busting warehouse-worker-abusing anti-antitrust panopticon company.

- Eugenia Cheng's book _Cakes, Custard and Category Theory_ (alternatively known as _How to Bake Pi_ in some countries; I've heard excellent things about this lay introduction to category theory - I haven't read it yet but I've read other books by her and I think she's a fantastic maths communicator)
- [Bartosz Milewski's Category Theory videos](https://www.youtube.com/user/DrBartosz/videos) (not all human-captioned; this is best for programmers, especially those already familiar with a bit of Haskell which is what he uses in all his examples - I find his style of explaining concepts accessible because he connects abstract math to actual code, but he talks too slowly for me so I play these at 2x)
- [Bartosz Milewski's book _Category Theory for Programmers_](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/) (I've read many of the blog posts that were turned into this book and they're great but the same caveat as before applies - they're better if you have some programming background, especially a bit of Haskell)
- [Linguistics Using Category Theory blog post](https://golem.ph.utexas.edu/category/2018/02/linguistics_using_category_the.html) (this post discusses linguistics and category theory specifically and has a vibrant reply section discussing lexicalist vs anti-lexicalist interpretations, semantics, NLP etc., and it's part of a larger blog called the n-Category Café that discusses category theory often, does it well, and is famous for it)
- [Chenchen (Julio) Song's Category Theory blog posts](https://blog.juliosong.com/tags/category-theory/) (these posts from a categorical linguist start with an exploration of category theory from a linguistics background and go on to discuss their current research - I don't recommend this as a resource to _learn_ content because it assumes familiarity with category theory and formal lingistics concepts, but I recommend it for observing someone's thoughts as they learn category theory and draw connections between it and various other fields)
- [Steve Awodey's Category Theory Foundations videos](https://www.youtube.com/playlist?list=PLGCr8P_YncjVjwAxrifKgcQYtbZ3zuPlb) (not human-captioned; I found the pace a little too fast for me, also perhaps because more mathematical background is assumed than I have)
- [The nLab's category theory wiki content](https://ncatlab.org/nlab/show/category+theory) (this wiki is a well-known resource for concepts related to category theory, homotopy theory, and type theory, and also draws connections to philosophy and physics)
- Steve Awodey's book _Category Theory_ (this book brands itself as being for non-mathematicians - as opposed to the classic Saunders Mac Lane textbook - but I've read this textbook as a non-mathematician and I found it hard)
- Saunders Mac Lane's book _Categories for the Working Mathematician_ (this is the original, classical category theory book, a textbook for mathematics grad students, written by one of the founders of category theory - I've read little excerpts of this textbook and can confirm that it's very mathematical and formal and not hand-wavey at all)
