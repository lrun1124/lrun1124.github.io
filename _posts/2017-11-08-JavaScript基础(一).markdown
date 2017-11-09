---
layout:     post
title:      "JavaScript基础(一)"
subtitle:   ""
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

### JS内置对象

Object对象：所有对象的父对象，原型链最上层
数据封装对象：Array, Boolean, String, Number, Object
其他： Math, Date, RegExp, Error, Function

### null, undefined区别

null表示一个对象没有值，一般是程序员显示声明，Js不会自己设置为null，typeof(null)为Object

undefined表示一个变量声明了，但还没有初始化， typeof(undefined)为undefined

null === undefined 为true, null == undefined为false，目前的JS环境中，它们的差别很小，同时存在是因为历史原因，Js初期的设计参考了C等语言，在C中，null可以自动转型为0，由于JS的设计者Brendan Eich认为‘无’的概念最好不是一个对象，并且JS早期缺乏错误处理机制，null自动转型为0可能会造成一些不被察觉的错误，所以设计了undefined

### JS原型，原型链

原型: JavaScript借鉴了面向对象语言‘一切皆是对象’的思想，对于每一个对象都存在一个prototype对象，也就是原型，prototype属性默认有一个constructor属性指向对象本身。

<img src="http://127.0.0.1:4000/lrun1124.github.io/img/jsbase/prototype.png"/>

以内置对象Object为例，其prototype对象如下

<img src="http://127.0.0.1:4000/lrun1124.github.io/img/jsbase/objectPrototype.png"/>

可以看到其中包括了很多常用内置方法，在其他object调用这些方法的时候就是通过原型链生效的

原型链: JS的继承是通过原型链实现的。当JS的对象需要某个属性的时候，首先会从当前对象的属性中去找，找不到就会到原型prototyoe中去找，还是找不到就会沿着原型链向上寻找，直到找到Object.prototype，如果最终找不到，则返回null

### JS作用域和作用域链
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

造成结果的原因都是因为JS的函数作用域，所谓函数作用域：变量在其所声明的函数内的任意位置都是可访问的，这里就引出了JS变量的函数提升，对于code1，其实际的执行code可以改写如下:

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

