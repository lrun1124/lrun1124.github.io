---
layout:     post
title:      "JavaScrip值传递和引用传递"
subtitle:   ""
date:       2019-07-24 11:00:00
author:     "Run"
header-img: "img/jsbase4/jsbase4-bg.jpg"
tags:
    - JavaScript
---

面试很容易碰到这个问题
* JavaScript是采用值传递还是引用传递的，并解释一下原理

很多人的回答应该是，基础类型采用值传递，Number其他采取引用查传递

今天和一个刚转做前端的同事解释JS的值传递和引用传递，发现这句话其实很有问题。


下面一段代码

```
function reset(nums) {
  nums = [];
}
var nums = [1,2,3];
reset(nums);
console.log(nums);

//output:
//[1,2,3]
```

Array属于引用传递，但是Array确并没有在reset函数中被重置。按照引用传递的含义，nums的引用（指针）被传递到函数内部，这个引用指向的内容变化了，nums也应该变化。所以这里存在问题。

实际上还有一种传递方式，叫共享调用（Call-by-sharing), 它和引用调用的不同在于，传递的是对象指针的拷贝，而不是指针本身，那就是说nums在reset函数中是函数外nums的指针拷贝。

从上面的解释可以看出，对于 JS 来说：

* 基本类型是传值调用（call by value）
* 引用类型传共享调用 (call by sharing)

传值调用本质上传递的是变量的值的拷贝。

传共享调用本质上是传递对象的指针的拷贝，其指针也是变量的值。所以传共享调用也可以说是传值调用。

所以《JavaScript 高级程序设计》说 JavaScript 参数传递都是按值传参也是有道理的。





