# My website

This is the code for my personal website, which lives at [dippedrusk.com](https://dippedrusk.com/).

It is currently built with the static site generator [11ty](https://www.11ty.dev/), which uses [Node.js](https://nodejs.org/en/) and templates in Nunjucks, markdown and some raw HTML too. The primary programming language in this repo is JavaScript and it is deployed with [Netlify](https://www.netlify.com/).

## Goals

This project has multiple goals:

- The finished product (the website itself) should act as a first point of information about me to folks in industry and academia, with a consolidated list of the things I've done
- My design goals are to build a website that is accessible, aesthetically pleasing, fast and secure
- Having never had a formal education in front-end development, this is also a project to help me learn a bit more about how to do it and to get comfortable enough to build someone else's website if they wanted me to

## History

The history of this repository (which my README has unfortunately not kept up with) includes the original website that I wrote entirely in HTML, JavaScript and CSS. I used [Bootstrap](https://getbootstrap.com/) to make my website responsive, a dependency that I have now removed.

Then for a while I decided to try [Flask](https://flask.palletsprojects.com/en/2.0.x/) to make a Python webapp using [Jinja](https://www.palletsprojects.com/p/jinja/) templates. At that point I was using Heroku to deploy my site and I was managing my SSL certificates myself, which turned out to be a giant pain in the ass. Heroku was also expensive and did not have enough support for my Python package management tool, [poetry](https://python-poetry.org/).

That's why I eventually migrated to my current setup which has, so far, been working pretty well for me! It even allowed to me to add a blog to my website which was fairly easy to set up and has been very good for my writing.

## License

This project used to be licensed with an [Apache license](https://choosealicense.com/licenses/apache-2.0/) because I didn't know what I was doing. It is now licensed with the more permissive [MIT license](https://choosealicense.com/licenses/mit/). I've benefitted hugely from the open-source projects online whose code I've studied and learned from and lifted from, and I hope you can too from mine!

## Inspiration

My site's design/layout, content and sitemap have changed a fair bit over time and I've had some consistent sources of inspiration from other people's sites. A few sites that I go back to fairly often are:

- [Kevin James' website](https://thekev.in/)
- [Tyanna Slobe's website](https://www.tyslobe.com/)
- [Os Keyes' website](https://ironholds.org/)
- [EJ Mason's website](https://www.ejmason.com/)
- [The 11ty base blog](https://github.com/11ty/eleventy-base-blog)
- [The 11ty high performance blog](https://github.com/google/eleventy-high-performance-blog)

I was also inspired by many of the replies to [my Tweet asking people to share their websites](https://twitter.com/DippedRusk/status/1419362120953581569).
