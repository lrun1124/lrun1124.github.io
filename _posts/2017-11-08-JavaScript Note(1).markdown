---
layout:     post
title:      "JavaScrip Note(1)"
subtitle:   "类型，原型，原型链，作用域，作用域链，闭包"
date:       2017-11-07 11:00:00
author:     "Run"
header-img: "img/jsbase1-bg.jpg"
tags:
    - JavaScript
---

> “Step 1. ”

## 前言

转前端工作一年多后对JS的一些基础仍然存在盲区，记录一些note查漏补缺

## 正文

### JS基本数据类型

* Boolean, null, undefined, String, Number
* ES 2015 新增 : Symbol
	- 独一无二的变量，由于对象中的方法属性可能在传递分享时被不小心修改或覆盖，用Symbol可以保证唯一性。let s = Symbol();
* 储存结构
	- 基本(原始)数据类型在栈(stack)中存储，空间较小，大小固定，会被频繁调用；
	- 引用数据类型大小不固定，放在堆中存储

<img src="http://lrun1124.github.io/img/jsbase/database.jpg"/>

### JS内置对象

Object对象：所有对象的父对象，原型链最上层<br />
数据封装对象：Array, Boolean, String, Number, Object<br />
其他： Math, Date, RegExp, Error, Function

### null, undefined区别

null表示一个对象没有值，一般是程序员显示声明，Js不会自己设置为null，typeof(null)为Object

undefined表示一个变量声明了，但还没有初始化， typeof(undefined)为undefined

null === undefined 为true, null == undefined为false，目前的JS环境中，它们的差别很小，同时存在是因为历史原因，Js初期的设计参考了C等语言，在C中，null可以自动转型为0，由于JS的设计者Brendan Eich认为‘无’的概念最好不是一个对象，并且JS早期缺乏错误处理机制，null自动转型为0可能会造成一些不被察觉的错误，所以设计了undefined

### JS原型，原型链

原型: JavaScript借鉴了面向对象语言‘一切皆是对象’的思想，对于每一个对象都存在一个prototype对象，也就是原型，prototype属性默认有一个constructor属性指向对象本身。

<img src="http://lrun1124.github.io/img/jsbase/prototype.png"/>

以内置对象Object为例，其prototype对象如下

<img src="http://lrun1124.github.io/img/jsbase/objectPrototype.png"/>

可以看到其中包括了很多常用内置方法，在其他object调用这些方法的时候就是通过原型链生效的

原型链: JS的继承是通过原型链实现的。当JS的对象需要某个属性的时候，首先会从当前对象的属性中去找，找不到就会到原型prototype中去找，还是找不到就会沿着原型链向上寻找，直到找到Object.prototype，如果最终找不到，则返回null

### 作用域
* 全局作用域
	- 最外层定义的变量
	- 未定义直接赋值的变量
	- 顶层对象windows下的变量
* 局部作用域

JS的作用域和Java,C++之类语言最大的区别就在于它的函数作用域，对于一些熟悉Java,C++语言的人，会造成一些难以理解的结果。可以通过几个例子来看一下：

code1：

```JS
var i = 'out';
var test = function(){
	console.log(i);
	var i = 'in';
	console.log(i);
}
test();
```
这里运行结果是<br />
undefined<br />
in<br />
而不是<br />
out<br />in

code2：

```JS
var i = 'out';
if(true){
	var i = 'in'
	console.log(i);
}
console.log(i);

test();
```
这里运行结果是<br />
in<br />
in<br />
而不是<br />
in<br />
out

造成结果的原因都是因为JS的函数作用域，所谓函数作用域：<strong>变量在其所声明的函数内的任意位置都是可访问的</strong>，这里就引出了JS变量的函数提升，对于code1，其实际的执行code可以改写如下:

```JS
var i = 'out';
var test = function(){
	var i;
	console.log(i);
	i = 'in';
	console.log(i);
}
test();
```

可以看到变量i的声明在函数内部是被提升到了开始的位置，但是赋值的位置确是不变的。类似的code2可以改写为:

```JS
var i;
var i; 
i = 'out';
if(true){
	i = 'in'
	console.log(i);
}
console.log(i);

test();
```
i在if中被修改了

### 作用域链

当代码在环境中执行的时候，会创建变量对象的一个作用域链（scope chain）。其用途是<strong>保证能够有序访问当前环境中的变量和函数</strong>。作用域链的前端始终是当前代码所在的变量对象，下一个变量对象总是外部环境的变量对象。<strong>标识符解析时,总是沿着作用域链从前端向后逐层的搜索</strong>。

环境之间的联系是<strong>线性有序</strong>的,内部环境是可以通过作用域链访问所有外部环境，但是外部环境不能访问内部环境。所以引发了<strong>闭包</strong>的概念

- 另使用with可以在作用域顶端添加某个对象，因为有可能造成混淆和兼容错误，所以不被推荐使用，不过在某些情况下可以减少不必要的作用域链搜索过程并简化代码，当然，这种简化方式用一个指针也可以做到。

```JS
var a, x, y;
var r = 10;

with (Math) {
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}
```

### 闭包

<strong>闭包就是能够读取其他函数内部变量的函数</strong>, 本质上是将函数内部和外部联系起来的桥梁。

```JS
function f1(){
	var n=999;
	function f2(){
		n++;
		alert(n);
	}
	return f2;
}
var result=f1();
result();//1000
result();//1001
```

以上代码通过内部的add在函数f1之外操作内部变量n，这里还体现了一个闭包的特点，可以看到在f1执行一次后n的值是被保存的，这是因为f2第一次在调用时被赋给了一个全局变量，而f2依赖于f1，所以f1的环境也始终被保存在内存中，不会被垃圾回收机制回收，所以<strong>大量使用闭包内存消耗很大，会导致性能下降</strong>>，第二个要注意地方时<strong>函数内部的值可能会被修改</strong>。
