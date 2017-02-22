---
title: Make chainable
sticky: false
date: 2017-02-22 02:07:16
tags:
 - haxe
---
I was just wondering about a possible use case for build-macros in haxe:

**make a whole class' methods chainable**

The idea is to _augment_ a simple class (such as a trivial impl. of `Point`), so that it can then be usable as a static extension via the `using` directive, by converting every _candidate_ function and: 
 - make it static
 - add an implicit first param 
 - return `self`

A concrete example can probably explain it better, so...


Imagine a macro able to transform something like this:

```haxe
@:build(macros.makeChainable())
class Point {
  public var x:Float;
  public var y:Float;
  
  public function new(x:Float, y:Float) {
    this.x = x;
    this.y = y;
  }
  
  @genChainable
  public function multiply(scalar:Float):Void {
    this.x *= scalar;
    this.y *= scalar;
  }
}
```

into:

```haxe
class Point {
  public var x:Float;
  public var y:Float;
  
  public function new(x:Float, y:Float) {
    this.x = x;
    this.y = y;
  }
  
  static public function multiply(p:Point, scalar:Float):Point {
    var self:Point = p;
    self.x *= scalar;
    self.y *= scalar;
    return self;
  }
}
```

or maybe explictly inlines the original call (a better way might be to add a param to pass to the macro):


```haxe
class Point {
  public var x:Float;
  public var y:Float;
  
  public function new(x:Float, y:Float) {
    this.x = x;
    this.y = y;
  }
  
  inline public function multiply(scalar:Float):Void {
    this.x *= scalar;
    this.y *= scalar;
  }
  
  static public function multiply(p:Point, scalar:Float):Point {
    var self:Point = p;
    self.multiply(scalar);
    return self;
  }
}
```

There are a bunch of unwanted side effects that could possibly crop up and to take care of (unexpected behaviour, etc.) but, if all is specified up-front, it could be very helpful in a lot of situations.

Not that I'm using it **:p**

{# **WARINING**: although I have some use cases for this approach, I wouldn't recommend it (too many gotchas: error handling, exposing unwanted functions, etc.). 
I just found it useful as an experimental use of macros. #}