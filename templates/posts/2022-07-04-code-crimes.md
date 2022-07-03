---
title: "Code crimes: mama and beer"
description: Why replace substrings in a string in a normal way, when you could instead do it with jiggery-pokery?
tags:
  - python
additionalcss:
  - "static/css/code.css"
  - "static/css/poem.css"
layout: layouts/post
---

It all started with Simon saying, in classic sarcastic fashion:

<poem>I have another amazing fact: If you change only four letters in the word mama, it spells beer!
</poem>

Now, of course there are plenty of boring ways to do this in Python, but we wanted what we always want: trickery, fuckery, jiggery-pokery.

Disappointingly Kevin couldn't think of any way to hack the [str.replace](https://docs.python.org/3/library/stdtypes.html#str.replace) implementation enough such that `'foo'.replace('o', x)` returned a different value of x for each char. Obviously I took this as a challenge.

## Solution 1

Here's a solution to that problem.

<figure><img width="593px" height="107px" src="/static/img/2022-07-04-code-crimes/solution1.png"></figure>

The secret here is wildly cursed monkeypatching with the [Forbidden Fruit Python package](https://pypi.org/project/forbiddenfruit/).

Here's the code. The trick is to "curse" the in-built Python string replace function with my redefined replace function that picks a random letter every time. Yes, it's evil. But it's also easy.

```python
from forbiddenfruit import curse
import string
import random

def replace(self, a, b):
    new_str = ''
    for i in self:
        if i == a:
            new_str += random.choice(string.ascii_letters)
        else:
            new_str += i
    return new_str

curse(str, 'replace', replace)

'mama'.replace('m', 'x')
```

## Solution 2

This is a solution to the original problem. It's less internally devious but it ends up looking kludgier as a result.

<figure><img width="875px" height="188px" src="/static/img/2022-07-04-code-crimes/solution2.png"></figure>

As you might guess from the syntax there, yes, it does use classes!

```python
class S1:
    def __init__(self):
        self.x = ['a', 'mama']
    def __get__(self, i, o):
        return self.x.pop(0)

class S2:
    def __init__(self):
        self.x = ['b', 'beer']
    def __get__(self, i, o):
        return self.x.pop(0)

class Box1:
    s = S1()

class Box2:
    s = S2()

my = Box1()
myother = Box2()

print(my.s, myother.s)
'mama'.replace(my.s, myother.s)
```

It's not very neat or concise code, and it's even brittle because it relies on elements being popped from an array and therefore you have to call the get methods exactly once before doing the replacement for everything to work perfectly. But it's certainly less crimey than the other solutions.

## Solution 3

Of course I couldn't stop there. I wanted to write code that would do the original cursed thing, i.e., replace 'mama' with 'beer' by hacking string replace. So I did that!

<figure><img width="734px" height="104px" src="/static/img/2022-07-04-code-crimes/solution3.png"></figure>

"In fact," I said, "I'll do ya one better, I'll prove I'm not monkeypatching with forbidden fruit anymore."

<figure><img width="762px" height="373px" src="/static/img/2022-07-04-code-crimes/solution3_proof.png"></figure>

People were perplexed. Some replies:

<poem>BUTT HOW?! Wait a sec ... did you monkey patch sys.modules?
Or string?
This is approximately as bad as time travelling and changing history
I dunno Jonas — I think it's worse. I think it's reaching in and monkey patching pi to be exactly 3
True, more like actually changing laws of physics
</poem>

I told them that what I had actually done was sneaky as hell (a sneaky combination of a few things, in fact) and that they were all going to hate me when I told them.

Some more replies:
<poem>lol it's just manually typed in an editor
PHOTOSHOP
python3 is aliased to a small program that just prints out the above text.
Speaking Latin while waving a wand?
</poem>

The secret is two things. I'll let you have a look at the code first before I explain (bash first, then Python):

```bash
alias python3='python3 -i -c "_b_='\''\b\b\b\bbeer\b'\''"'
python3
```

```python
print("mama".replace('a', _b_))
```

What I'm doing here is that I'm secretly aliasing python3 to first execute a variable assignment before opening up the interpreter. I have a variable `_b_` and I assign it a string with the word beer in it surrounded by some sneaky backspace control characters.

The second piece of the trick is that I installed [FontForge](https://fontforge.org/en-US/) on my computer and created a new custom font that would display underscore characters as single quotes. Then I made iTerm use this custom font.

That's why the second version of the code is the TRUE version, and the first version is _almost_ photoshop, but not quite. Personally I think it's cleverer than that!

Kevin and I discussed it for an inordinate amount of time before I arrived at this solution. He gets partial credit for reminding me that control characters exist. I had initially wanted to defeat the lexer and make it allow me to assign to a variable called `'b'` but I couldn't do it. I forget why (this is from December 2020, i.e., Too Long Ago).

That's all! Happy hacking!
