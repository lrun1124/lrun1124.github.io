---
layout:     post
title:      "实现call,apply,bind"
subtitle:   ""
date:       2019-09-02 11:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - code
---

> “Move on. ”

## call
```js
Function.prototype.myCall = function(context, ...arg) {
  const s = Symbol('temp');
  context.s = this;
  context.s(...arg);
  delete context.s;
}
```

## apply
```js
Function.prototype.myApply = function(context, arg) {
  const s = Symbol('temp');
  context.s = this;
  context.s(...arg);
  delete context.s;
}
```

## bind
```js
Function.prototype.myBind = function(context, ...arg1) {
  return (...arg2) => {
      this.myApply(context, arg1.concat(arg2))
  }
}
```

```js
Function.prototype.myBind = function(context, ...arg1) {
  return (...arg2) => {
      return this.myApply(context, ...arg1, ...arg2)
  }
}
```

```js
//不用前面的function
Function.prototype.myBind = function(context, ...arg1) {
  return (...arg2) => {
      const s = Symbol('temp');
      context.s = this;
      let fn;
      fn = context.s(...arg1, ...arg2);
      delete context.s;
      return fn;
  }
}
```