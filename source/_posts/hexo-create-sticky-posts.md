---
title: 'hexo: create sticky posts'
sticky: 215
date: 2017-02-19 01:19:14
tags: 
 - hexo
---
Here's how I worked around the _apparent_ inability of hexo to make sticky posts (ones that are listed at the top):

<!-- more -->

... without resorting to modify code in plugin files.

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


As an example I've given this post a sticky value of `215`, which sould put before everything else.

One downside is that I've yet to find a way to make this same approach work while using `{% raw %}{{ list_posts() }}{% endraw %}`, but that's for another time (**-> read following updates**).


**UPDATE #1**:

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


**UPDATE #2**:

Just found a way to shadow/override the default index-generator and use a custom one, without having to change the plugin code.


**&#x2460;** put the following file in the `scripts` folder (create one if it doesn't exist, f.e. mine is `themes\next\scripts`) of your theme (NOT in the root folder).

{% codeblock custom-index-generator.js lang:js %}
'use strict';

var assign = require('object-assign');
var pagination = require('hexo-pagination');


hexo.config.custom_index_generator = assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.custom_index_generator);


hexo.extend.generator.register('index', function index(locals) {
  console.log('custom index generator');
  
  var config = this.config;

  var posts = locals.posts.sort(config.custom_index_generator.order_by);
  
  posts.each(function(post, i) { 
    post.custom_idx = i;
  });
  
  var paginationDir = config.pagination_dir || 'page';

  return pagination('', posts, {
    perPage: config.custom_index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
  
});
{% endcodeblock %}

(which is almost all copy-pasted code from the original `generator.js`)

**&#x2461;** rename the `index_generator` (or comment it out) section in the root `_config.yml` to `custom_index_generator`:

```
# Index generator (works for the main index page vs archives page)
#index_generator:
#  per_page: 4
#  order_by: -sticky -date
  
# Custom index generator (works for the main index page vs archives page)
custom_index_generator:
  per_page: 4
  order_by: -sticky -date
```


**&#x2462;** now you should see `custom index generator` printed out in the console when you generate/serve:

```
>hexo s
INFO  Start processing
custom index generator
INFO  Hexo is running at http://0.0.0.0:4000/. Press Ctrl+C to stop.
custom index generator
```