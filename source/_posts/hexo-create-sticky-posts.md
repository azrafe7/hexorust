---
title: 'hexo: create sticky posts'
sticky: 15
date: 2017-02-19 01:19:14
tags: 
 - hexo
---
Here's how I worked around the _apparent_ inability of hexo to make sticky posts (ones that are listed at the top):

<!-- more -->

... without resorting to modify code in js files.

**IMPORTANT**: Make sure that any past or future post (md file in the `source\_posts` folder) has a `sticky` property with a value.
I made it default to `false` for newly created posts by modifying the `scaffolds/post.md` file to:

```
---
title: {{ title }}
date: {{ date }}
tags:
sticky: false
---
```

and changed my already published ones to have `sticky: false`.

Then at the end of the site's `_config.yml` I've added another section to instruct the index generator:

```
# Index generator
index_generator:
  per_page: 10
  order_by: -sticky -date
```

This forces the post listings to be sorted by sticky values, and then by date. 
To further control which sticky post has to come first you can give them an integer value representing the priority.
The higher the value, the higher the importance of the related post (and therefore the need to be the topmost one).


As an example I've given this post a sticky value of `15`, which sould put it between `hello-world` and `pako_notes`.

One downside is that I've yet to find a way to make this same approach work while using `{% raw %}{{ list_posts() }}{% endraw %}`, but that's for another time.


**UPDATE**:

I've managed to make `list_posts()` work by making a few modifications.
 
In `\node_modules\hexo-generator-index\lib\generator.js`, after [posts.sort(...)](https://github.com/hexojs/hexo-generator-index/blob/e18483358079b7ad4a7ad608caedaff94e3327ca/lib/generator.js#L7), add:

{% codeblock added lines lang:js https://github.com/hexojs/hexo-generator-index/blob/e18483358079b7ad4a7ad608caedaff94e3327ca/lib/generator.js#L7 generator.js on github %}
  posts.each(function(post, i) { 
    post.custom_idx = i;
  });
{% endcodeblock %}

This defines a `custom_idx` var for each post that reflects the order in which the posts are sorted.


And then in your view (f.e. `\themes\next\layout\_custom\sidebar.swig`) you can use something like:

```js
{{ list_posts({amount:15, transform:truncate, orderby:'custom_idx', order:1}) }}
```
