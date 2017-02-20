---
title: 'hexo: notes about inner workings'
sticky: 200
date: 2017-02-20 00:28:22
tags:
 - hexo
---
Some quick notes about what I found out while trying to make hexo do what I wanted...

<!-- more -->

Debugging my attempts with `node debug node_modules\hexo\bin\hexo g` I set up to see what a post object is.

(you see `posts` and `post` passed around quite a bit in the js files)

Well a `post` object is something like this:

```
{% raw %}
> console.dir(post, {depth:0})
< Document {
<   title: 'New Post',
<   date: [Object],
<   sticky: false,
<   _content: '',
<   source: '_posts/New-Post-0.md',
<   raw: '---\ntitle: New Post\ndate: 2017-01-10 17:44:27\nsticky: false\ntags:\
n---\n',
<   slug: 'New-Post-0',
<   published: true,
<   updated: [Object],
<   comments: true,
<   layout: 'post',
<   photos: [],
<   link: '',
<   _id: 'cizd7zwro0000a0o54dv4zxoy',
<   content: '',
<   excerpt: '',
<   more: '',
<   path: [Getter],
<   permalink: [Getter],
<   full_source: [Getter],
<   asset_dir: [Getter],
<   tags: [Getter],
<   categories: [Getter],
<   prev: [Object],
<   next: [Object],
<   __post: true,
<   lang: 'en',
<   canonical_path: '2017/01/10/New-Post-0/index.html' }
{% endraw %}
```

This, instead, is what `posts` looks like:

```
{% raw %}
> console.dir(post, {depth:1})
< Document {
<   title: 'New Post',
<   date:
<    { [Number: 1484066667000]
<      _isAMomentObject: true,
<      _i: 2017-01-10T16:44:27.000Z,
<      _isUTC: false,
<      _pf: [Object],
<      _locale: [Object],
<      _d: 2017-01-10T16:44:27.000Z,
<      _isValid: true,
<      _z: null },
<   sticky: false,
<   _content: '',
<   source: '_posts/New-Post-0.md',
<   raw: '---\ntitle: New Post\ndate: 2017-01-10 17:44:27\nsticky: false\ntags:\
n---\n',
<   slug: 'New-Post-0',
<   published: true,
<   updated:
<    { [Number: 1487464789176]
<      _isAMomentObject: true,
<      _i: 2017-02-19T00:39:49.176Z,
<      _isUTC: false,
<      _pf: [Object],
<      _locale: [Object],
<      _d: 2017-02-19T00:39:49.176Z,
<      _isValid: true,
<      _z: null },
<   comments: true,
<   layout: 'post',
<   photos: [],
<   link: '',
<   _id: 'cizd7zwro0000a0o54dv4zxoy',
<   content: '',
<   excerpt: '',
<   more: '',
<   path: [Getter],
<   permalink: [Getter],
<   full_source: [Getter],
<   asset_dir: [Getter],
<   tags: [Getter],
<   categories: [Getter],
<   prev:
<    Document {
<      title: 'pako_notes',
<      date: [Object],
<      description: 'desc',
<      sticky: 1,
<      _content: 'Thing to look for trying to optimize it...\n<!-- more -->\n -
array _get (should be unsafe)\n - rshift might be unnecessary\n - int32 in crc32
 and adler (and related vars) maybe necessary (find minimum number of changes)\n
 - search for "signed" in zlib.inflate (should be ok to use "+" instead of "|")\
n - minimize "_hx_local*" and "index*" (py)\n - avoid pre/post inc/dec\n - zswap
 is inlined or not?\n - double check throw/err messages\n - (py) see if I can re
pro promoting Int32 to Long using | and check source\n - there\'s a clamp() in S
td.haxe.Int32\n \n \n\n```haxe\npackage;\n\nimport haxe.Int32;\n\nclass Test {\n
  static function main():Void {\n    var i32:Int32 = 15459750;\n    var arr = [1
78,0,0];\n    var next = 0;\n    \n    trace(i32);\n    // i32 = 15459750 | (178
 << 24)\n    i32 |= (arr[next++] << 24);\n   \n    trace(i32);\n  }\n}\n```\n\nl
ongest_match\nhttp://try.haxe.org/#fe974',
<      source: '_posts/pako-notes.md',
<      raw: '---\ntitle: pako_notes\ndate: 2017-01-11 23:45:31\ndescription: des
c\nsticky: 1\ntags:\n---\nThing to look for trying to optimize it...\n<!-- more
-->\n - array _get (should be unsafe)\n - rshift might be unnecessary\n - int32
in crc32 and adler (and related vars) maybe necessary (find minimum number of ch
anges)\n - search for "signed" in zlib.inflate (should be ok to use "+" instead
of "|")\n - minimize "_hx_local*" and "index*" (py)\n - avoid pre/post inc/dec\n
 - zswap is inlined or not?\n - double check throw/err messages\n - (py) see if
I can repro promoting Int32 to Long using | and check source\n - there\'s a clam
p() in Std.haxe.Int32\n \n \n\n```haxe\npackage;\n\nimport haxe.Int32;\n\nclass
Test {\n  static function main():Void {\n    var i32:Int32 = 15459750;\n    var
arr = [178,0,0];\n    var next = 0;\n    \n    trace(i32);\n    // i32 = 1545975
0 | (178 << 24)\n    i32 |= (arr[next++] << 24);\n   \n    trace(i32);\n  }\n}\n
```\n\nlongest_match\nhttp://try.haxe.org/#fe974',
<      slug: 'pako-notes',
<      published: true,
<      updated: [Object],
<      comments: true,
<      layout: 'post',
<      photos: [],
<      link: '',
<      _id: 'cizd7zwtf000ba0o59wlbtpw3',
<      content: '<p>Thing to look for trying to optimize it…<br><a id="more"></a
></p>\n<ul>\n<li>array _get (should be unsafe)</li>\n<li>rshift might be unneces
sary</li>\n<li>int32 in crc32 and adler (and related vars) maybe necessary (find
 minimum number of changes)</li>\n<li>search for “signed” in zlib.inflate (shoul
d be ok to use “+” instead of “|”)</li>\n<li>minimize “_hx_local<em>“ and “index
</em>“ (py)</li>\n<li>avoid pre/post inc/dec</li>\n<li>zswap is inlined or not?<
/li>\n<li>double check throw/err messages</li>\n<li>(py) see if I can repro prom
oting Int32 to Long using | and check source</li>\n<li>there’s a clamp() in Std.
haxe.Int32</li>\n</ul>\n<figure class="highlight haxe"><table><tr><td class="gut
ter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3<
/div><div class="line">4</div><div class="line">5</div><div class="line">6</div>
<div class="line">7</div><div class="line">8</div><div class="line">9</div><div
class="line">10</div><div class="line">11</div><div class="line">12</div><div cl
ass="line">13</div><div class="line">14</div><div class="line">15</div><div clas
s="line">16</div><div class="line">17</div></pre></td><td class="code"><pre><div
 class="line"><span class="keyword">package</span>;</div><div class="line"></div
><div class="line"><span class="keyword">import</span> haxe.Int32;</div><div cla
ss="line"></div><div class="line"><span class="class"><span class="keyword">clas
s</span> <span class="title">Test</span> </span>&#123;</div><div class="line">
<span class="keyword">static</span> <span class="function"><span class="keyword"
>function</span> <span class="title">main</span></span>():<span class="type">Voi
d </span>&#123;</div><div class="line">    <span class="keyword">var</span> i32:
<span class="type">Int32 </span>= <span class="number">15459750</span>;</div><di
v class="line">    <span class="keyword">var</span> arr = [<span class="number">
178</span>,<span class="number">0</span>,<span class="number">0</span>];</div><d
iv class="line">    <span class="keyword">var</span> next = <span class="number"
>0</span>;</div><div class="line">    </div><div class="line">    <span class="b
uilt_in">trace</span>(i32);</div><div class="line">    <span class="comment">//
i32 = 15459750 | (178 &lt;&lt; 24)</span></div><div class="line">    i32 |= (arr
[next++] &lt;&lt; <span class="number">24</span>);</div><div class="line">   </d
iv><div class="line">    <span class="built_in">trace</span>(i32);</div><div cla
ss="line">  &#125;</div><div class="line">&#125;</div></pre></td></tr></table></
figure>\n<p>longest_match<br><a href="http://try.haxe.org/#fe974" target="_blank
" rel="external">http://try.haxe.org/#fe974</a></p>\n',
<      excerpt: '<p>Thing to look for trying to optimize it…<br>',
<      more: '</p>\n<ul>\n<li>array _get (should be unsafe)</li>\n<li>rshift mig
ht be unnecessary</li>\n<li>int32 in crc32 and adler (and related vars) maybe ne
cessary (find minimum number of changes)</li>\n<li>search for “signed” in zlib.i
nflate (should be ok to use “+” instead of “|”)</li>\n<li>minimize “_hx_local<em
>“ and “index</em>“ (py)</li>\n<li>avoid pre/post inc/dec</li>\n<li>zswap is inl
ined or not?</li>\n<li>double check throw/err messages</li>\n<li>(py) see if I c
an repro promoting Int32 to Long using | and check source</li>\n<li>there’s a cl
amp() in Std.haxe.Int32</li>\n</ul>\n<figure class="highlight haxe"><table><tr><
td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div cl
ass="line">3</div><div class="line">4</div><div class="line">5</div><div class="
line">6</div><div class="line">7</div><div class="line">8</div><div class="line"
>9</div><div class="line">10</div><div class="line">11</div><div class="line">12
</div><div class="line">13</div><div class="line">14</div><div class="line">15</
div><div class="line">16</div><div class="line">17</div></pre></td><td class="co
de"><pre><div class="line"><span class="keyword">package</span>;</div><div class
="line"></div><div class="line"><span class="keyword">import</span> haxe.Int32;<
/div><div class="line"></div><div class="line"><span class="class"><span class="
keyword">class</span> <span class="title">Test</span> </span>&#123;</div><div cl
ass="line">  <span class="keyword">static</span> <span class="function"><span cl
ass="keyword">function</span> <span class="title">main</span></span>():<span cla
ss="type">Void </span>&#123;</div><div class="line">    <span class="keyword">va
r</span> i32:<span class="type">Int32 </span>= <span class="number">15459750</sp
an>;</div><div class="line">    <span class="keyword">var</span> arr = [<span cl
ass="number">178</span>,<span class="number">0</span>,<span class="number">0</sp
an>];</div><div class="line">    <span class="keyword">var</span> next = <span c
lass="number">0</span>;</div><div class="line">    </div><div class="line">    <
span class="built_in">trace</span>(i32);</div><div class="line">    <span class=
"comment">// i32 = 15459750 | (178 &lt;&lt; 24)</span></div><div class="line">
  i32 |= (arr[next++] &lt;&lt; <span class="number">24</span>);</div><div class=
"line">   </div><div class="line">    <span class="built_in">trace</span>(i32);<
/div><div class="line">  &#125;</div><div class="line">&#125;</div></pre></td></
tr></table></figure>\n<p>longest_match<br><a href="http://try.haxe.org/#fe974">h
ttp://try.haxe.org/#fe974</a></p>',
<      path: [Getter],
<      permalink: [Getter],
<      full_source: [Getter],
<      asset_dir: [Getter],
<      tags: [Getter],
<      categories: [Getter],
<      prev: [Object],
<      next: [Circular],
<      __post: true,
<      lang: 'en',
<      canonical_path: '2017/01/11/pako-notes/index.html' },
<   next:
<    Document {
<      title: 'new-post',
<      date: [Object],
<      sticky: false,
<      _content: '',
<      source: '_posts/new-post.md',
<      raw: '---\ntitle: new-post\ndate: 2017-01-10 17:43:06\nsticky: false\ntag
s:\n - another tag\n - not\n - why not\n---\n',
<      slug: 'new-post',
<      published: true,
<      updated: [Object],
<      comments: true,
<      layout: 'post',
<      photos: [],
<      link: '',
<      _id: 'cizd7zwt20007a0o51nunnbwx',
<      content: '',
<      excerpt: '',
<      more: '',
<      path: [Getter],
<      permalink: [Getter],
<      full_source: [Getter],
<      asset_dir: [Getter],
<      tags: [Getter],
<      categories: [Getter],
<      prev: [Circular],
<      next: [Object],
<      __post: true,
<      lang: 'en',
<      canonical_path: '2017/01/10/new-post/index.html' },
<   __post: true,
<   lang: 'en',
<   canonical_path: '2017/01/10/New-Post-0/index.html' }
{% endraw %}
```

**UPDATE**:

`list_posts()` can be used adding these lines:
 
In `\node_modules\hexo-generator-index\lib\generator.js`:

```raw
{% raw %}
  posts.each(function(post, i) { 
    post.custom_idx = i;
  });
{% endraw %}


And then in `\themes\next\layout\_custom\sidebar.swig`:

{% raw %}
  {{ list_posts({amount:15, transform:truncate, orderby:'custom_idx', order:1}) }}
{% endraw %}
```