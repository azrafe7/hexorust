---
title: pako_notes
date: 2017-01-11 23:45:31
description: desc
tags:
---
Thing to look for trying to optimize it...
<!-- more -->
 - array _get (should be unsafe)
 - rshift might be unnecessary
 - int32 in crc32 and adler (and related vars) maybe necessary (find minimum number of changes)
 - search for "signed" in zlib.inflate (should be ok to use "+" instead of "|")
 - minimize "_hx_local*" and "index*" (py)
 - avoid pre/post inc/dec
 - zswap is inlined or not?
 - double check throw/err messages
 - (py) see if I can repro promoting Int32 to Long using | and check source
 - there's a clamp() in Std.haxe.Int32
 
 

```haxe
package;

import haxe.Int32;

class Test {
  static function main():Void {
    var i32:Int32 = 15459750;
    var arr = [178,0,0];
    var next = 0;
    
    trace(i32);
    // i32 = 15459750 | (178 << 24)
    i32 |= (arr[next++] << 24);
   
    trace(i32);
  }
}
```

longest_match
http://try.haxe.org/#fe974