---
layout:     post
title:      "JS Summary"
subtitle:   ""
date:       2019-09-08 1:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - Summary
---

> “Move on. ”

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [JS](#js)
  - [JS基本数据类型及存储结构，内置对象](#js%E5%9F%BA%E6%9C%AC%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%8F%8A%E5%AD%98%E5%82%A8%E7%BB%93%E6%9E%84%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1)
  - [`null`, `undefined`区别, 未声明变量](#null-undefined%E5%8C%BA%E5%88%AB-%E6%9C%AA%E5%A3%B0%E6%98%8E%E5%8F%98%E9%87%8F)
  - [JavaScript是采用值传递还是引用传递的，并解释一下原理](#javascript%E6%98%AF%E9%87%87%E7%94%A8%E5%80%BC%E4%BC%A0%E9%80%92%E8%BF%98%E6%98%AF%E5%BC%95%E7%94%A8%E4%BC%A0%E9%80%92%E7%9A%84%E5%B9%B6%E8%A7%A3%E9%87%8A%E4%B8%80%E4%B8%8B%E5%8E%9F%E7%90%86)
  - [JS原型，原型链， 原型继承（prototypal inheritance）的工作原理](#js%E5%8E%9F%E5%9E%8B%E5%8E%9F%E5%9E%8B%E9%93%BE-%E5%8E%9F%E5%9E%8B%E7%BB%A7%E6%89%BFprototypal-inheritance%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)
  - [JS作用域，作用域链](#js%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE)
  - [`闭包（closure）`，为什么使用闭包](#%E9%97%AD%E5%8C%85closure%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8%E9%97%AD%E5%8C%85)
  - [请简述`JavaScript`中的`this`。](#%E8%AF%B7%E7%AE%80%E8%BF%B0javascript%E4%B8%AD%E7%9A%84this)
  - [`New`的过程](#new%E7%9A%84%E8%BF%87%E7%A8%8B)
  - [不会查找原型的函数](#%E4%B8%8D%E4%BC%9A%E6%9F%A5%E6%89%BE%E5%8E%9F%E5%9E%8B%E7%9A%84%E5%87%BD%E6%95%B0)
  - [for in和for of](#for-in%E5%92%8Cfor-of)
  - [Ajax流程，手动写，Ajax缓存](#ajax%E6%B5%81%E7%A8%8B%E6%89%8B%E5%8A%A8%E5%86%99ajax%E7%BC%93%E5%AD%98)
  - [把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？](#%E6%8A%8A-script-%E6%A0%87%E7%AD%BE-%E6%94%BE%E5%9C%A8%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%9C%80%E5%BA%95%E9%83%A8%E7%9A%84body%E5%B0%81%E9%97%AD%E4%B9%8B%E5%89%8D-%E5%92%8C%E5%B0%81%E9%97%AD%E4%B9%8B%E5%90%8E%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [延迟加载，defer，async，动态dom，分组加载](#%E5%BB%B6%E8%BF%9F%E5%8A%A0%E8%BD%BDdeferasync%E5%8A%A8%E6%80%81dom%E5%88%86%E7%BB%84%E5%8A%A0%E8%BD%BD)
    - [使用defer或async属性](#%E4%BD%BF%E7%94%A8defer%E6%88%96async%E5%B1%9E%E6%80%A7)
    - [动态DOM操作](#%E5%8A%A8%E6%80%81dom%E6%93%8D%E4%BD%9C)
    - [分组最后加载JS](#%E5%88%86%E7%BB%84%E6%9C%80%E5%90%8E%E5%8A%A0%E8%BD%BDjs)
  - [get和post](#get%E5%92%8Cpost)
  - [同步和异步](#%E5%90%8C%E6%AD%A5%E5%92%8C%E5%BC%82%E6%AD%A5)
  - [前端模块化，AMD/CMD/CommonJS](#%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96amdcmdcommonjs)
  - [内存泄漏](#%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F)
  - [==, ===, Object.is()区别](#--objectis%E5%8C%BA%E5%88%AB)
  - [===运算符判断相等的流程是怎样的](#%E8%BF%90%E7%AE%97%E7%AC%A6%E5%88%A4%E6%96%AD%E7%9B%B8%E7%AD%89%E7%9A%84%E6%B5%81%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84)
  - [==运算符判断相等的流程是怎样的](#%E8%BF%90%E7%AE%97%E7%AC%A6%E5%88%A4%E6%96%AD%E7%9B%B8%E7%AD%89%E7%9A%84%E6%B5%81%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84)
  - [对象到字符串的转换步骤](#%E5%AF%B9%E8%B1%A1%E5%88%B0%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E8%BD%AC%E6%8D%A2%E6%AD%A5%E9%AA%A4)
  - [对象到数字的转换步骤](#%E5%AF%B9%E8%B1%A1%E5%88%B0%E6%95%B0%E5%AD%97%E7%9A%84%E8%BD%AC%E6%8D%A2%E6%AD%A5%E9%AA%A4)
  - [<,>,<=,>=的比较规则](#%E7%9A%84%E6%AF%94%E8%BE%83%E8%A7%84%E5%88%99)
  - [运算符工作流程](#%E8%BF%90%E7%AE%97%E7%AC%A6%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
  - [函数内部 arguments 变量有哪些特性,有哪些属性,如何将它转换为数组](#%E5%87%BD%E6%95%B0%E5%86%85%E9%83%A8-arguments-%E5%8F%98%E9%87%8F%E6%9C%89%E5%93%AA%E4%BA%9B%E7%89%B9%E6%80%A7%E6%9C%89%E5%93%AA%E4%BA%9B%E5%B1%9E%E6%80%A7%E5%A6%82%E4%BD%95%E5%B0%86%E5%AE%83%E8%BD%AC%E6%8D%A2%E4%B8%BA%E6%95%B0%E7%BB%84)
  - [前端设计模式，单例，单体，工厂，策略，装饰者，适配器，观察者，门面](#%E5%89%8D%E7%AB%AF%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E5%8D%95%E4%BE%8B%E5%8D%95%E4%BD%93%E5%B7%A5%E5%8E%82%E7%AD%96%E7%95%A5%E8%A3%85%E9%A5%B0%E8%80%85%E9%80%82%E9%85%8D%E5%99%A8%E8%A7%82%E5%AF%9F%E8%80%85%E9%97%A8%E9%9D%A2)
    - [单体模式(Singleton)](#%E5%8D%95%E4%BD%93%E6%A8%A1%E5%BC%8Fsingleton)
    - [单例模式(Single)](#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8Fsingle)
    - [工厂模式(Factory)](#%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8Ffactory)
    - [策略模式(Strategy)](#%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8Fstrategy)
    - [装饰者模式（decrator）](#%E8%A3%85%E9%A5%B0%E8%80%85%E6%A8%A1%E5%BC%8Fdecrator)
    - [适配器模式（Adapter）](#%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8Fadapter)
    - [观察者模式（Observer）](#%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8Fobserver)
    - [门面模式（facede）](#%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8Ffacede)
  - [优雅降级和渐进增强](#%E4%BC%98%E9%9B%85%E9%99%8D%E7%BA%A7%E5%92%8C%E6%B8%90%E8%BF%9B%E5%A2%9E%E5%BC%BA)
  - [Node的优缺点](#node%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9)
  - [Cookie和Session](#cookie%E5%92%8Csession)
  - [cookie, loaclStorage, sessionStorage](#cookie-loaclstorage-sessionstorage)
  - [Javascript如何实现继承？](#javascript%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%BB%A7%E6%89%BF)
  - [javascript继承的6种方法](#javascript%E7%BB%A7%E6%89%BF%E7%9A%846%E7%A7%8D%E6%96%B9%E6%B3%95)
  - [一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？](#%E4%B8%80%E4%B8%AA%E9%A1%B5%E9%9D%A2%E4%BB%8E%E8%BE%93%E5%85%A5-url-%E5%88%B0%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E6%98%BE%E7%A4%BA%E5%AE%8C%E6%88%90%E8%BF%99%E4%B8%AA%E8%BF%87%E7%A8%8B%E4%B8%AD%E9%83%BD%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88)
  - [TCP三次握手，四次挥手](#tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B)
  - [JSON的了解](#json%E7%9A%84%E4%BA%86%E8%A7%A3)
  - [XML和JSON](#xml%E5%92%8Cjson)
  - [MVC和MVVM的理解](#mvc%E5%92%8Cmvvm%E7%9A%84%E7%90%86%E8%A7%A3)
  - [forEach循环和.map()循环的主要区别，它们分别在什么情况下使用？](#foreach%E5%BE%AA%E7%8E%AF%E5%92%8Cmap%E5%BE%AA%E7%8E%AF%E7%9A%84%E4%B8%BB%E8%A6%81%E5%8C%BA%E5%88%AB%E5%AE%83%E4%BB%AC%E5%88%86%E5%88%AB%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BD%BF%E7%94%A8)
  - [宿主对象（host objects）和原生对象（native objects）的区别是什么？](#%E5%AE%BF%E4%B8%BB%E5%AF%B9%E8%B1%A1host-objects%E5%92%8C%E5%8E%9F%E7%94%9F%E5%AF%B9%E8%B1%A1native-objects%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
  - [下列语句有什么区别：function Person(){}、var person = Person()和var person = new Person()？](#%E4%B8%8B%E5%88%97%E8%AF%AD%E5%8F%A5%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%ABfunction-personvar-person--person%E5%92%8Cvar-person--new-person)
  - [call和.apply](#call%E5%92%8Capply)
  - [Function.prototype.bind作用](#functionprototypebind%E4%BD%9C%E7%94%A8)
  - [功能检测（feature detection）、功能推断（feature inference）和使用 UA 字符串之间有什么区别？](#%E5%8A%9F%E8%83%BD%E6%A3%80%E6%B5%8Bfeature-detection%E5%8A%9F%E8%83%BD%E6%8E%A8%E6%96%ADfeature-inference%E5%92%8C%E4%BD%BF%E7%94%A8-ua-%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B9%8B%E9%97%B4%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [同源策略](#%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5)
  - [跨域问题](#%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98)
    - [JSONP](#jsonp)
    - [postMessage](#postmessage)
    - [CORS(Cross orign resource share)跨域资源共享](#corscross-orign-resource-share%E8%B7%A8%E5%9F%9F%E8%B5%84%E6%BA%90%E5%85%B1%E4%BA%AB)
  - [请解释变量提升（hoisting）。](#%E8%AF%B7%E8%A7%A3%E9%87%8A%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87hoisting)
  - [“attribute” 和 “property” 之间有什么区别？](#attribute-%E5%92%8C-property-%E4%B9%8B%E9%97%B4%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [为什么扩展 JavaScript 内置对象是不好的做法？](#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%89%A9%E5%B1%95-javascript-%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1%E6%98%AF%E4%B8%8D%E5%A5%BD%E7%9A%84%E5%81%9A%E6%B3%95)
  - [请解释单页应用是什么，如何使其对 SEO 友好。](#%E8%AF%B7%E8%A7%A3%E9%87%8A%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88%E5%A6%82%E4%BD%95%E4%BD%BF%E5%85%B6%E5%AF%B9-seo-%E5%8F%8B%E5%A5%BD)
  - [polyfill](#polyfill)
  - [你使用什么语句遍历对象的属性和数组的元素？](#%E4%BD%A0%E4%BD%BF%E7%94%A8%E4%BB%80%E4%B9%88%E8%AF%AD%E5%8F%A5%E9%81%8D%E5%8E%86%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%95%B0%E7%BB%84%E7%9A%84%E5%85%83%E7%B4%A0)
  - [什么是事件循环？调用堆栈和任务队列之间有什么区别？](#%E4%BB%80%E4%B9%88%E6%98%AF%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E8%B0%83%E7%94%A8%E5%A0%86%E6%A0%88%E5%92%8C%E4%BB%BB%E5%8A%A1%E9%98%9F%E5%88%97%E4%B9%8B%E9%97%B4%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [javascript 有哪些方法定义对象](#javascript-%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B9%E6%B3%95%E5%AE%9A%E4%B9%89%E5%AF%B9%E8%B1%A1)
  - [JS几种方法构建函数](#js%E5%87%A0%E7%A7%8D%E6%96%B9%E6%B3%95%E6%9E%84%E5%BB%BA%E5%87%BD%E6%95%B0)
  - [请解释`function foo() {}`和`var foo = function() {}`之间`foo`的用法上的区别。](#%E8%AF%B7%E8%A7%A3%E9%87%8Afunction-foo-%E5%92%8Cvar-foo--function-%E4%B9%8B%E9%97%B4foo%E7%9A%84%E7%94%A8%E6%B3%95%E4%B8%8A%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [使用let、var和const创建变量有什么区别？](#%E4%BD%BF%E7%94%A8letvar%E5%92%8Cconst%E5%88%9B%E5%BB%BA%E5%8F%98%E9%87%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [构造函数中使用箭头函数有什么好处？](#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E6%9C%89%E4%BB%80%E4%B9%88%E5%A5%BD%E5%A4%84)
  - [请给出一个解构（destructuring）对象或数组的例子。](#%E8%AF%B7%E7%BB%99%E5%87%BA%E4%B8%80%E4%B8%AA%E8%A7%A3%E6%9E%84destructuring%E5%AF%B9%E8%B1%A1%E6%88%96%E6%95%B0%E7%BB%84%E7%9A%84%E4%BE%8B%E5%AD%90)
  - [写一个通用的事件侦听器函数。](#%E5%86%99%E4%B8%80%E4%B8%AA%E9%80%9A%E7%94%A8%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8%E5%87%BD%E6%95%B0)
  - [防抖(debounce)和节流(throttle）](#%E9%98%B2%E6%8A%96debounce%E5%92%8C%E8%8A%82%E6%B5%81throttle)
    - [防抖](#%E9%98%B2%E6%8A%96)
    - [节流](#%E8%8A%82%E6%B5%81)
  - [e.getAttribute(propName)和e.propName](#egetattributepropname%E5%92%8Cepropname)
  - [height, clientHeight, offsetHeigh，scrollHeight](#height-clientheight-offsetheighscrollheight)
  - [mouseover/mouseout 与 mouseenter/mouseleave 的区别与联系](#mouseovermouseout-%E4%B8%8E-mouseentermouseleave-%E7%9A%84%E5%8C%BA%E5%88%AB%E4%B8%8E%E8%81%94%E7%B3%BB)
- [ES6](#es6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JS
### JS基本数据类型及存储结构，内置对象

* Boolean, null, undefined, String, Number
* ES 2015 新增 : Symbol
  - 独一无二的变量，由于对象中的方法属性可能在传递分享时被不小心修改或覆盖，用Symbol可以保证唯一性。let s = Symbol();
* 储存结构
  - 基本(原始)数据类型在栈(stack)中存储，空间较小，大小固定，会被频繁调用；
  - 引用数据类型大小不固定，放在堆中存储

内置对象

Object对象：所有对象的父对象，原型链最上层
数据封装对象：Array, Boolean, String, Number, Object
其他： Math, Date, RegExp, Error, Function

### `null`, `undefined`区别, 未声明变量

null表示一个对象没有值，一般是程序员显示声明，Js不会自己设置为null，typeof(null)为Object

undefined表示一个变量声明了，但还没有初始化， typeof(undefined)为undefined

null === undefined 为true, null == undefined为false，目前的JS环境中，它们的差别很小，同时存在是因为历史原因，Js初期的设计参考了C等语言，在C中，null可以自动转型为0，由于JS的设计者Brendan Eich认为‘无’的概念最好不是一个对象，并且JS早期缺乏错误处理机制，null自动转型为0可能会造成一些不被察觉的错误，所以设计了undefined

当你没有提前使用var、let或const声明变量，就为一个变量赋值时，该变量是未声明变量（undeclared variables）。未声明变量会脱离当前作用域，成为全局作用域下定义的变量。在严格模式下，给未声明的变量赋值，会抛出ReferenceError错误。和使用全局变量一样，使用未声明变量也是非常不好的做法，应当尽可能避免。

### JavaScript是采用值传递还是引用传递的，并解释一下原理
[JavaScrip值传递和引用传递](http://lrun1124.github.io/2019/07/24/JavaScript%E5%80%BC%E4%BC%A0%E9%80%92and%E5%BC%95%E7%94%A8%E4%BC%A0%E9%80%92/). 

### JS原型，原型链， 原型继承（prototypal inheritance）的工作原理

原型: JavaScript借鉴了面向对象语言‘一切皆是对象’的思想，对于每一个对象都存在一个prototype对象，也就是原型，prototype属性默认有一个constructor属性指向对象本身。

<img src="http://lrun1124.github.io/img/jsbase/prototype.png"/>

以内置对象Object为例，其prototype对象如下

<img src="http://lrun1124.github.io/img/jsbase/objectPrototype.png"/> 

可以看到其中包括了很多常用内置方法，在其他object调用这些方法的时候就是通过原型链生效的

原型链: JS的继承是通过原型链实现的。当JS的对象需要某个属性的时候，首先会从当前对象的属性中去找，找不到就会到原型prototype中去找，还是找不到就会沿着原型链向上寻找，直到找到Object.prototype，如果最终找不到，则返回null

### JS作用域，作用域链
* 全局作用域
	- 最外层定义的变量
	- 未定义直接赋值的变量
	- 顶层对象windows下的变量
* 局部作用域
  - var函数作用域
  - let, const

JS的作用域和Java,C++之类语言最大的区别就在于它的函数作用域，对于一些熟悉Java,C++语言的人，会造成一些难以理解的结果。可以通过几个例子来看一下：

### `闭包（closure）`，为什么使用闭包

<strong>闭包就是能够读取其他函数内部变量的函数</strong>, 即使被外部函数返回，依然可以访问到外部（封闭）函数作用域的函数。本质上是将函数内部和外部联系起来的桥梁。

 闭包的特性：

 1. 函数内再嵌套函数
 1. 内部函数可以引用外层的参数和变量
 1. 参数和变量不会被垃圾回收机制回收

```JS
function f1(){
	var n=999;
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

**为什么使用闭包？**

* 利用闭包实现数据私有化或模拟私有方法。
* 部分参数函数（partial applications）柯里化（currying）

### 请简述`JavaScript`中的`this`。

JS 中的`this`是一个相对复杂的概念，不是简单几句能解释清楚的。粗略地讲，函数的调用方式决定了`this`的值。

1. 在调用函数时使用`new`关键字，函数内的`this`是一个全新的对象。
1. 如果`apply`、`call`或`bind`方法用于调用、创建一个函数，函数内的 this 就是作为参数传入这些方法的对象。
1. 当函数作为对象里的方法被调用时，`this`指向直接调用者，函数内的`this`是调用该函数的对象。比如当`obj.method()`被调用时，函数内的 this 将绑定到`obj`对象。
1. 如果调用函数不符合上述规则，那么`this`的值指向全局对象（global object）。浏览器环境下`this`的值指向`window`对象，但是在严格模式下(`'use strict'`)，`this`的值为`undefined`。
1. 如果符合上述多个规则，则较高的规则（1 号最高，4 号最低）将决定`this`的值。
1. 如果该函数是 ES2015 中的箭头函数，将忽略上面的所有规则，`this`被设置为它被创建时的上下文。

### `New`的过程

1. 创建空对象；
	- var obj = {};
1. 将创建出对象的原型链引用指向所要构造函数的原型；
	- obj.\__proto__ = ClassA.prototype; 
1. 调用构造函数，this指向新实例对象：
	- ClassA.call(obj);　　//{}.构造函数();          
1. 将初始化完毕的新对象地址，保存到等号左边的变量中

### 不会查找原型的函数

object.hasOwnProperty(proName), 判断对象中是否有指定名称的属性

### for in和for of

1. for...in循环出的是key，for...of循环出的是value
1. for...of是ES6对于forEach的改善，for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。for of只可以循环可迭代对象的可迭代属性，不可迭代属性在循环中被忽略了（优点1）；可以与break、continue和return配合使用。（优点2）

结论：推荐在循环对象属性的时候，使用for...in,在遍历数组的时候的时候使用for...of。

### Ajax流程，手动写，Ajax缓存
Asynchronous JavaScript and Xml, 异步传输+JS+xml，异步的含义是在向服务器发送请求后，不必等待响应，可以先做其他的事，等相应返回可以根据设定的callback函数进行操作，于此同时，网页不会发生整页刷新，提高了效率和用户体验。

步骤：

1. 创建XMLHttpRequest对象
2. 设置响应HTTP请求状态变化的函数
3. 指定该对象的的方法、URL及验证信息
4. 发送HTTP请求
5. 获取异步调用返回的数据
6. 使用JavaScript和DOM实现局部刷新

```html
<button id="ajaxButton" type ="button">Make Ajax request</button>

<script>
var httpRequest;
document.getElementbyId('ajaxButton').addEventListener("click", sendRequest);

function sendRequest(){
	httpRequest = new XMLHttpRequest(); //1

	if(httpRequest){
		alert('Cannot creat XMLHttpRequest');
		return;
	}

	httpRequest.onreadystatechange = stateFunction;//2
	httpRequest.open('GET', 'test.html');//3
	httpRequest.send();//4
}

function stateFunction(){
	if(httpRequest.readyState === XMLHttpRequet.Done){
		if(httpRequest.state === 200){
			alert(httpRequest.responseText);//5
			//... 6
		}
		else{
			alert('The request has some problem');
		}
	}
}
</script>
```

ajax缓存

1. 在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。
1. 在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。
1. 在URL后面加上一个随机数： "fresh=" + Math.random();。

### 把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？
放在body的封闭之前，将会阻塞其他资源的加载，放在body封闭之后，不会影响body内元素的加载

### 延迟加载，defer，async，动态dom，分组加载

JS延迟加载就是在页面加载完成后再加载JS文件，有助于提高页面加载速度，提高用户体验。

#### 使用defer或async属性

```html
<script src="test1.js" defer="defer"></script>
<script src="test2.js" async></script>
```
- 只适用于外部脚本，缺点是不能保证脚本会按顺序执行

当浏览器碰到 script 脚本的时候，没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

* 有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。
* 有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。

<img src="http://lrun1124.github.io/img/jsbase2/defer&async.jpg"/>

#### 动态DOM操作

即利用动态DOM操作按需插入JS文件，比如onload后延时插入js

```js
//延迟1000ms加载new.js
window.onload = function(){
	setTimeout(function(){
		var head = document.getElementByTagName('head')[0];
		var js = document.createElement('Script');
		js.type = 'text/javascript';
		js.src = '.../new.js';
		head.appendChlid(js); 
	},1000);
}
```

#### 分组最后加载JS

JS的引入如果放在head中，则页面加载前JS就会被加载，如果放在body中，则会按顺序加载，所以可以将JS分组，对于加载过程中不需要的JS，可以放在页面的底部，</body>标签之前，然而这种方法偶尔会收到Google页面速度测试工具的“延迟加载javascript”警告，Google提供了一套推荐方案：

```html
//这些代码应被放置在</body>标签前(接近HTML文件底部)
<script type="text/javascript">
    function downloadJSAtOnload() {
        var element = document.createElement("script");
        element.src = "defer.js";
        document.body.appendChild(element);
    }
    if (window.addEventListener)
        window.addEventListener("load", downloadJSAtOnload, false);
    else if (window.attachEvent)
        window.attachEvent("onload", downloadJSAtOnload);
    else window.onload = downloadJSAtOnload;
</script>
```

这段代码意思是等到整个文档加载完后，再加载外部文件“defer.js”。

使用此段代码的步骤：

1. 复制上面代码；
1. 粘贴代码放置在</body>标签前 (靠近HTML文件底部)；
1. 修改“defer.js”为外部JS文件名；
1. 确保文件路径是正确的。例如：如果仅输入“defer.js”，那么“defer.js”文件一定与HTML文件在同一文件夹下。

注意：这段代码直到文档加载完才会加载指定的外部js文件。因此，不应该把那些页面正常加载需要依赖的javascript代码放在这里。

总结： 
应该将JavaScript代码分成两组。
1. 一组是因页面需要而立即加载的javascript代码。放在head中用async/defer
1. 另外一组是在页面加载后进行操作的javascript代码(例如添加click事件或其他东西)。这些需等到页面加载后再执行的JavaScript代码，应放在一个外部文件，然后再引进来。然后从实用角度来说呢，把这些脚本都丢到 </body> 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析j

另一方面外部的js一般放到head内，内部的js一般放到body内，这样做的目的有很多
1. 不阻塞页面的加载(事实上js会被缓存)；
1. 可以直接在js里操作dom，这时候dom是准备好的，即保证js运行时dom是存在的。

而 CSS 应当写在 head 中，以避免页面元素由于样式缺失造成瞬间的白页或者给用户闪烁感。在head内的js一般要先执行完后，才开始渲染body页面。为了避免head引入的js脚本阻塞流浪器中主解析引擎对dom的解析工作，对dom的渲染，一般原则是，样式在前面，dom文档，脚本在最后面。遵循先解析再渲染再执行script这个顺序。 

//Todo...

### get和post
GET：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符
POST：一般用于修改服务器上的资源，对所发送的信息没有限制。

GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值，
也就是说Get是通过地址栏来传值，而Post是通过提交表单来传值。

然而，在以下情况中，请使用 POST 请求：
1. 无法使用缓存文件（更新服务器上的文件或数据库）
1. 向服务器发送大量数据（POST 没有数据量限制）
1. 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

### 同步和异步

对于Web而言：<br />
同步: 访问服务器，服务器回应，页面刷新，用户操作，整个过程是串行的方式进行的，影响用户操作<br />
异步: 访问服务器，用户继续操作，服务器回应，页面更新，用户操作，整个过程不发生整页刷新，不影响用户操作<br />

### 前端模块化，AMD/CMD/CommonJS

知识点1：AMD(Asynchronous Module Definition)/CMD(Common Module Definition)/CommonJs是JS模块化开发的标准，目前对应的实现是RequireJs/SeaJs/nodeJs.

知识点2：CommonJs主要针对服务端，AMD/CMD主要针对浏览器端，所以最容易混淆的是AMD/CMD。（顺便提一下，针对服务器端和针对浏览器端有什么本质的区别呢？服务器端一般采用同步加载文件，也就是说需要某个模块，服务器端便停下来，等待它加载再执行。这里如果有其他后端语言，如java，经验的‘玩家’应该更容易理解。而浏览器端要保证效率，需要采用异步加载，这就需要一个预处理，提前将所需要的模块文件并行加载好。）

知识点3 : AMD/CMD区别，虽然都是并行加载js文件，但还是有所区别，AMD是预加载，在并行加载js文件同时，还会解析执行该模块（因为还需要执行，所以在加载某个模块前，这个模块的依赖模块需要先加载完成）；而CMD是懒加载，虽然会一开始就并行加载js文件，但是不会执行，而是在需要的时候才执行。

知识点4：AMD/CMD的优缺点.一个的优点就是另一个的缺点， 可以对照浏览。

AMD优点：加载快速，尤其遇到多个大文件，因为并行解析，所以同一时间可以解析多个文件。<br />
AMD缺点：并行加载，异步处理，加载顺序不一定，可能会造成一些困扰，甚至为程序埋下大坑。

CMD优点：因为只有在使用的时候才会解析执行js文件，因此，每个JS文件的执行顺序在代码中是有体现的，是可控的。<br />
CMD缺点：执行等待时间会叠加。因为每个文件执行时是同步执行（串行执行），因此时间是所有文件解析执行时间之和，尤其在文件较多较大时，这种缺点尤为明显。

知识点5：如何使用？CommonJs的话，因为nodeJs就是它的实现，所以使用node就行，也不用引入其他包。AMD则是通过\<script>标签引入RequireJs，CMD则是引入SeaJs。

### 内存泄漏

内存泄漏时指一块被分配的内存既不能使用也不能回收。在JavaScipt出现主要有两种情况:

1.循环引用。含有DOM对象的循环引用将导致大部分当前主流浏览器内存泄露。

```js
//a,b循环引用
var a = new Object;
var b = new Object;
a.r = b;
b.r = a;

//a循环引用自己
var a = new Object;
a.r = a;
```

1.闭包。闭包可以导致内存泄漏是因为内部方法保持一个对外部方法变量的引用，所以尽管方法返回了内部方法还可以继续访问在外部方法中定义的私有变量，所以这些变量被一直保存在内存中。

1.setTimeout的第一个参数使用字符串而非函数的话，会引发内存泄漏

### ==, ===, Object.is()区别

==会进行类型转换，===不会，Object.is 在三等号判等的基础上特别处理了 NaN 、-0 和 +0 ，保证 -0 和 +0 不再相同，但 Object.is(NaN, NaN) 会返回 true.

### ===运算符判断相等的流程是怎样的
1. 类型不同，不等
1. null，undefined，boolean，number这四个类型的只要值(数值)相等，就相等，-0 === 0 //true
1. 只要其中有一个为NAN，则不等
1. string类型，长度/内容/编码不同，都是不等，相同位置包含相同的16位，相等
1. 指向相同的对象，数组，函数，则相等，若指向不同对象，不等

### ==运算符判断相等的流程是怎样的
1. 若类型不同，则按===规则判断
1. 类型不同，则启用隐式类型转换
    1. 有NAN，一律返回false
    1. null和undefined不会相互转换，相等
    1. 有boolean类型，boolean类型转换成数字比较
    1. 有string类型，两种情况： 
        1. 对象，对象用toString方法转换成string相比。
        1. 数字，string类型转换成数字进行比较
    1. 有数字类型，和对象相比，对象用valueof转换成原始值进行比较
    1. 其他情况，一律返回false

### 对象到字符串的转换步骤
1. 如果对象有 toString()方法，javascript 调用它。如果返回一个基础类型（primitive value 如：string number boolean）,将这个值转换为字符串作为结果
1. 如果对象没有 toString()方法或者返回值不是原始值，javascript 寻找对象的 valueOf()方法，如果存在就调用它，返回结果是基础类型则转为字符串作为结果
1. 否则，javascript 不能从 toString()或者 valueOf()获得一个原始值，此时 throws a TypeError

### 对象到数字的转换步骤
1. 如果对象有valueOf()方法并且返回元素值，javascript将返回值转换为数字作为结果
1. 否则，如果对象有toString()并且返回原始值，javascript将返回结果转换为数字作为结果
1. 否则，throws a TypeError

### <,>,<=,>=的比较规则
1所有比较运算符都支持任意类型，但是比较只支持数字和字符串，所以需要执行必要的转换然后进行比较，转换规则如下:
1. 如果操作数是对象，转换为原始值：如果 valueOf 方法返回原始值，则使用这个值，否则使用 toString 方法的结果，如果转换失败则报错
1. 经过必要的对象到原始值的转换后，如果两个操作数都是字符串，按照字母顺序进行比较（他们的 16 位 unicode 值的大小）
1. 否则，如果有一个操作数不是字符串，将两个操作数转换为数字进行比较

### 运算符工作流程
1. 如果有操作数是对象，转换为原始值
1. 此时如果有一个操作数是字符串，其他的操作数都转换为字符串并执行连接
1. 否则：所有操作数都转换为数字并执行加法

### 函数内部 arguments 变量有哪些特性,有哪些属性,如何将它转换为数组
1. arguments 所有函数中都包含的一个局部变量，是一个类数组对象，对应函数调用时的实参。如果函数定义同名参数会在调用时覆盖默认对象
1. arguments[index]分别对应函数调用时的实参，并且通过 arguments 修改实参时会同时修改实参
1. arguments.length 为实参的个数
转化为数组
```js
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);
// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```

### 前端设计模式，单例，单体，工厂，策略，装饰者，适配器，观察者，门面

#### 单体模式(Singleton)

将一批属性和方法组织在一起的对象，用来划分命名空间。其特点：<br />
1. 划分命名空间，只暴露一个入口，减少全局变量带来的风险
2. 利用分支技术来来封装浏览器之间的差异。
3. 可以把代码组织的更为一体，便于阅读和维护。

```js
var singleton = {
    attribute: {},
    method1: function(){},
    method2: function(){}
}
```

#### 单例模式(Single)

单例模式定义了一个对象的创建过程，此对象只有一个单独的实例，并提供一个访问它的全局访问点

```js
var single = (function(){
    var unique;

    function getInstance(){　　　　// 如果该实例存在，则直接返回，否则就对其实例化
        if( unique === undefined ){
            unique = new Construct();
        }
        return unique;
    }

    function Construct(){
        // ... 生成单例的构造函数的代码
    }

    return {
        getInstance : getInstance
    }
})();
```

#### 工厂模式(Factory)

提供一个创建对象的借口，无需指定具体的类，把成员对象的创建工作转交给一个外部对象，<strong>好处在于消除对象之间的耦合(也就是相互影响), 有助于创建模块化的代码</strong>

<strong>简单工厂模式</strong>：使用一个类，通常为单体，来生成实例。典型的实例，xhr工厂。

```js
   var XMLHttpFactory =function(){};　　　　　　//这是一个简单工厂模式
　　XMLHttpFactory.createXMLHttp =function(){
　　　 var XMLHttp = null;
　　　　if (window.XMLHttpRequest){
　　　　　　XMLHttp = new XMLHttpRequest()
　　　 }else if (window.ActiveXObject){
　　　　　　XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")
　　　　}
　　return XMLHttp;
　　}
　　//XMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象。
　　var AjaxHander =function(){
　　　　var XMLHttp = XMLHttpFactory.createXMLHttp();
　　　　...
　　}
```
<strong>复杂工厂模式</strong>：先设计一个抽象类，这个类不能被实例化，只能用来派生子类，最后通过对子类的扩展实现工厂方法

```js
var XMLHttpFactory =function(){};　     //这是一个抽象工厂模式

XMLHttpFactory.prototype = {
　　//如果真的要调用这个方法会抛出一个错误，它不能被实例化，只能用来派生子类
　　createFactory:function(){
  　　throw new Error('This is an abstract class');
　　}
}

var XHRHandler =function(){}; //定义一个子类

// 子类继承父类原型方法
extend( XHRHandler , XMLHttpFactory );

XHRHandler.prototype =new XMLHttpFactory(); //把超类原型引用传递给子类,实现继承

XHRHandler.prototype.constructor = XHRHandler; //重置子类原型的构造器为子类自身

//重新定义createFactory 方法
XHRHandler.prototype.createFactory =function(){
　　var XMLHttp =null;
　　if (window.XMLHttpRequest){

  　　XMLHttp =new XMLHttpRequest();

　　}else if (window.ActiveXObject){

  　　XMLHttp =new ActiveXObject("Microsoft.XMLHTTP")
　　}

　　return XMLHttp;
}
```
应用场景：

以下几种情景下工厂模式特别有用：

1. 对象的构建十分复杂
2. 需要依赖具体环境创建不同实例
3. 处理大量具有相同属性的小对象

优点：

可以实现一些相同的方法，这些相同的方法我们可以放在父类中编写代码，那么需要实现具体的业务逻辑，那么可以放在子类中重写该父类的方法，去实现自己的业务逻辑；

也就是说有两点：　　

1. 弱化对象间的耦合，防止代码的重复。在一个方法中进行类的实例化，可以消除重复性的代码。
2. 重复性的代码可以放在父类去编写，子类继承于父类的所有成员属性和方法，子类只专注于实现自己的业务逻辑。

缺点：

当工厂增加到一定程度的时候，提升了代码的复杂度，可读性下降。而且没有解决对象的识别问题，即怎么知道一个对象的类型。

#### 策略模式(Strategy)

策略模式指的是定义一些列的算法，把他们一个个封装起来，目的就是将算法的使用与算法的实现分离开来。说白了就是以前要很多判断的写法，现在把判断里面的内容抽离开来，变成一个个小的个体。

代码情景为超市促销，vip为5折，老客户3折，普通顾客没折，计算最后需要支付的金额。

没有使用策略模式的情况：
```js
function Price(personType, price) {
    //vip 5 折
    if (personType == 'vip') {
        return price * 0.5;
    } 
    else if (personType == 'old'){ //老客户 3 折
        return price * 0.3;
    } else {
        return price; //其他都全价
    }
}
```
不足之处：不好的地方，当我有其他方面的折扣时，又或者我活动的折扣时经常变化的，这样就要不断的修改if..else里面的条件了。而且也违背了设计模式的一个原则：<strong>对修改关闭，对扩展开放的原则</strong>；

使用策略模式之后：
```js
// 对于vip客户
function vipCustomer() {
    this.discount = 0.5;
}
 
vipCustomer.prototype.getPrice = function(price) {
　　return price * this.discount;
}
// 对于老客户
function oldCustomer() {
    this.discount = 0.3;
}
 
oldCustomer.prototype.getPrice = function(price) {
    return price * this.discount;
}
// 对于普通客户
function normalCustomer() {
    this.discount = 1;
}
 
normalCustomer.prototype.getPrice = function(price) {
    return price ;
}

// 上下文，对于客户端的使用
function Context() {
    this.name = '';
    this.strategy = null;
    this.price = 0;
}
 
Context.prototype.set = function(name, strategy, price) {
    this.name = name;
    this.strategy = strategy;
    this.price = price;
}
Context.prototype.getResult = function() {
    console.log(this.name + ' 的结账价为: ' + this.strategy.getPrice(this.price));
}

var context = new Context();
var vip = new vipCustomer();
context.set ('vip客户', vip, 200);
context.getResult();   // vip客户 的结账价为: 100

var old = new oldCustomer();
context.set ('老客户', old, 200);
context.getResult();  // 老客户 的结账价为: 60

var Price = new normalCustomer();
context.set ('普通客户', Price, 200);
context.getResult();  // 普通客户 的结账价为: 200
```

#### 装饰者模式（decrator）

动态地给一个对象添加一些新的方法。就扩展功能而言，它比生成子类方式更为灵活。装饰者的运作过程是透明的，这就是说你可以用它包装其他对象，然后继续按之前使用那么对象的方法来使用。

```js
var myText= {};
myText.Decorations={};
myText.Core=function(myString){
    this.show =function(){return myString;}
}
//第一次装饰，string后加？
myText.Decorations.addQuestuibMark =function(myString){
    this.show =function(){return myString.show()+'?';};
}
//第二次装饰，添加标签
myText.Decorations.makeItalic =function(myString){
    this.show =function(){return'<li>'+myString.show()+'</li>'};
}
//得到myText.Core的实例
var theString =new myText.Core('this is a sample test String');
alert(theString.show());　　//output 'this is a sample test String'

//得到？装饰后的String
theString =new myText.Decorations.addQuestuibMark(theString);
alert(theString.show());　　//output 'this is a sample test String?'

//得到标签装饰后的String
theString =new myText.Decorations.makeItalic (theString);
alert(theString.show());　　//output '<li>this is a sample test String</li>'
```

从这个示例中可以看出，我们的目的是为了得到装饰过得String，这一切都可以不用事先知道组件对象的接口，也就是说我们只需要调用myString.show()，而其中具体的实现不用关心，甚至可以动态的实现。

在为现有对象增添特性这方面，装饰者模式有极大的灵活性。如果需要为类增加特性或者方法，而从该类派生子类的解决办法并不实际的话，就应该使用装饰者模式。派生子类之所以会不实际最常见的原因是需要添加的特性或方法的数量要求使用大量子类。

#### 适配器模式（Adapter）

将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作，使用这种模式的对象又叫包装器，因为他们是在用一个新的接口包装另一个对象。

```js
//一个参数为两个字符串的接口函数
var interface = function(str1, str2){
    ...
}
//现在我们想使用上面接口函数，但是参数是一个对象
var test = {
    str1 : '1',
    str2 : '2'
}
//适配器函数
var adapterMethod = function(obj){
    return interface(obj.str1, obj.str2);
}
//调用
adapterMethod(test);
```

#### 观察者模式（Observer）

定义对象间的一种一对多的依赖关系，以便当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并自动刷新。典型的是事件监听器绑定。

```html
<div id='test'>test</div>
<script>
var fn1 = function(){
    ...
}
var fn2 = function(){
    ...
}
var test = document.getElementsById('test');
//绑定两个监听click事件
test.addElementListener('click', fn1, false);
test.addELementListener('click', fn2, false);
</script>
```

#### 门面模式（facede）

子系统中的一组接口提供一个一致的界面，门面模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。实际上就是把一组工具函数包装在一个对象里，对外的门面就是这个对象，<strong>门面模式是几乎所有JavaScript库的核心原则</strong>。

### 优雅降级和渐进增强
优雅降级：Web站点在所有新式浏览器中都能正常工作的前提下，如果用户使用的是老式浏览器，则代码会针对旧版本的IE进行降级处理了,使之在旧式浏览器上以某种形式降级体验却不至于完全不能用。如：border-shadow

渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能,向页面增加不影响基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。
如：默认使用flash上传，但如果浏览器支持 HTML5 的文件上传功能，则使用HTML5实现更好的体验；
### Node的优缺点
Node的优缺点

（优点) 因为Node是基于事件驱动和无阻塞的，所以非常适合处理并发请求，
    因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多。
    此外，与Node代理服务器交互的客户端代码是由javascript语言编写的，
    因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情。

（缺点）Node是一个相对新的开源项目，所以不太稳定，它总是一直在变，
    而且缺少足够多的第三方库支持。看起来，就像是Ruby/Rails当年的样子。

### Cookie和Session

1. session 在服务器端，cookie 在客户端（浏览器）
2. session 默认被存在在服务器的一个文件里（不是内存）
3. session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 session_id）
4. session 可以放在 文件、数据库、或内存中都可以。
5. 用户验证这种场合一般会用 session 因此，维持一个会话的核心就是客户端的唯一标识，即 session id
6. cookie是不安全的，一些网络攻击如XSS和CSRF可以获取cookie或进行cookie欺骗，所以重要信息放在session里，必要放在cookie里要枷锁

### cookie, loaclStorage, sessionStorage
、
1. cookie: 可设置失效时间，默认是浏览器关闭后，大小4K左右，每次都会携带在HTTP头中，这也是大小限制的原因，如果使用cookie保存过多数据会带来性能问题，主要用于保存密码等信息。cookie 作用域通过文档源和文档路径来确定，通过path和domain进行配置，web 页面同目录或子目录文档都可访问
```
document.cookie = 'name=qiu; max-age=9999; path=/; domain=domain; secure';
document.cookie = 'name=aaa; path=/; domain=domain; secure';
// 要改变cookie的值，需要使用相同的名字、路径和域，新的值
// 来设置cookie，同样的方法可以用来改变有效期
// 设置max-age为0可以删除指定cookie
//读取cookie，访问document.cookie返回键值对组成的字符串，
//不同键值对之间用'; '分隔。通过解析获得需要的值
```
1. localStorage: 除非主动删除，否则永久保留，一般5M左右，仅在浏览器保存，不参与通信
```js
localStorage.setItem('myCat', 'Tom');
localStorage.getItem('myCat')
localStorage.removeItem('myCat');
localStorage.clear();
```
1. sessionStorage: 仅在当前会话下有效，刷新不删除，关闭页面或浏览器清除，一般5M左右，仅在浏览器保存，不参与通信，语法和localStorage一样
1. 另外sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。

### Javascript如何实现继承？
1. 构造继承
1. 原型继承
1. 实例继承
1. 拷贝继承

原型prototype机制或apply和call方法去实现较简单，建议使用构造函数与原型混合方式。
 ```js
 	function Parent(){
 		this.name = 'wang';
 	}

 	function Child(){
 		this.age = 28;
 	}
 	Child.prototype = new Parent();//继承了Parent，通过原型

 	var demo = new Child();
 	alert(demo.age);
 	alert(demo.name);//得到被继承的属性
```

### javascript继承的6种方法

### 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？
- 以http,webkit,chrome为例

1. 再输入url的时候，浏览器根据优化策略可能会做一些**预处理**，比如 Chrome 会根据历史统计来预估所输入字符对应的网站，比如输入了「go」，根据之前的历史发现 90% 的概率会访问google，因此就会在输入回车前就马上开始建立 TCP 链接甚至渲染了；
1. Browser进程会开启一个线程来处理这个请求，**解析 URL**获取协议，主机，端口，path，如果是http协议就按照 Web 方式来处理；
1. Browser会先查看**缓存**，尝试使用**强缓存**；
   1. 如果资源未缓存，发起新请求；
   1. 如果已缓存，检验是否足够新，检验新鲜通常有两个 HTTP 头进行控制`Expires`和`Cache-Control`；
      - HTTP1.0 提供 Expires，值为一个绝对时间表示缓存新鲜日期
      - HTTP1.1 增加了 Cache-Control: max-age=,值为以秒为单位的最大新鲜时间
   1. 足够新直接使用，否则与服务器进行验证。
1. 进行**DNS解析**，发出第一个GET请求，获取主机 ip 地址，过程如下：
   1. 浏览器缓存
   1. 本机缓存
   1. hosts 文件
   1. 路由器缓存
   1. ISP DNS 缓存
   1. DNS 递归查询（可能存在负载均衡导致每次 IP 不一样）
1. 打开一个 socket 与目标 IP 地址，端口**建立 TCP 链接**，三次握手；
1. TCP 链接建立后设置 UA 等信息发送第二个HTTP 请求，**进行HTTP协议会话**，客户端发送请求报头;
1. 进过运营商路由，主干网传输，进入到相应服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
1. 服务器检查HTTP请求头是否包含**协议缓存验证信息**如果验证缓存新鲜，与服务器最后修改时间对比，如果可以使用协议缓存，返回`304`；
1. 不能使用协议缓存，处理程序读取完整请求并准备 HTTP 响应，可能需要查询数据库等操作，返回`200`状态码；
1. 服务器将**响应报文通过 TCP 连接发送回浏览器**；
1. 浏览器接收 HTTP 响应，然后根据情况选择**关闭 TCP 连接或者保留重用**，四次挥手；
1. 浏览器检查响应状态吗，根据情况处理，1XX，3XX， 4XX，5XX这些情况处理与 2XX 不同；
1. 如果资源可缓存，**进行缓存**；
1. 对响应进行**解码**（例如 gzip 压缩）；
1. 根据资源类型决定如何处理；
1. 假设资源为 HTML 文档，浏览器开始**下载html文档**;
1. Browser进程转交给Renderer进程；
1. Render进程的Renderer接口收到消息，简单解释后，交给**Render线程**；
1. Render线程接收请求，开始渲染, 这其中可能需要Browser进程获取资源和需要GPU进程来帮助渲染, 当然可能会有JS线程操作DOM（这样可能会造成回流并重绘）；
1. 解析html**建立dom树**, 触发`DOMContentLoaded`；
1. 解析过程中遇到图片、样式表、js 文件，**启动下载**；
1. 解析css**构建CSSOM 树**；
1. 合并 DOM 树与 CSSOM 树为 **Render 树**；
1. **布局render树**（Layout/reflow），负责各元素尺寸、位置的计算；
1. **绘制render树**（paint），绘制页面像素信息；
1. 浏览器会将各层的信息发送给GPU，GPU会将各层复合图层化（composite），显示在屏幕上；
1. 渲染完毕后触发`load`事件了。

### TCP三次握手，四次挥手

三次握手如下：

1. 客户端发送一个 TCP 的**SYN=1，Seq=X**的包到服务器端口
1. 服务器发回**SYN=1， ACK=X+1， Seq=Y**的响应包
1. 客户端发送**ACK=Y+1， Seq=Z**

关闭 TCP 连接的四次握手如下：

1. 主动方发送**Fin=1， Ack=Z， Seq= X**报文
1. 被动方发送**ACK=X+1， Seq=Z**报文
1. 被动方发送**Fin=1， ACK=X， Seq=Y**报文
1. 主动方发送**ACK=Y， Seq=X**报文

### JSON的了解

JSON（JavaScript Object Notation）是一种<strong>轻量级的数据交换格式</strong>，是基于JavaScript的一个子集，具有<strong>数据格式简单，易于读写且占用带宽小</strong>的优点。

字符串转对象：

```JS
JSON.parse(str);
str.parseJSON(str);
eval('(' + str + ')')
```

对象转字符串：

```JS
JSON.stringify(obj);
obj.toJSONString(str);
```

### XML和JSON
1. 数据体积方面。JSON相对于XML来讲，数据的体积小，传递的速度更快些。
1. 数据交互方面。JSON与JavaScript的交互更加方便，更容易解析处理，更好的数据交互。
1. 数据描述方面。JSON对数据的描述性比XML较差。
1. 传输速度方面。JSON的速度要远远快于XML。

### MVC和MVVM的理解

MVC:View 传送指令到 Controller, Controller 完成业务逻辑后，要求 Model 改变状态, Model 将新的数据发送到 View，用户得到反馈, 所有通信都是单向的。

MVVM： 典型的Angular，它采用双向绑定（data-binding）：View的变动，自动反映在ViewModel，反之亦然。组成部分Model、View、ViewModel

View：UI界面

ViewModel：它是View的抽象，负责View与Model之间信息转换，将View的Command传送到Model；

Model：数据访问层

### forEach循环和.map()循环的主要区别，它们分别在什么情况下使用？

都是遍历数组，forEach为每个元素执行回调，最终无返回值，map每个元素返回一个新值，最后返回新数组

匿名函数的典型应用场景是什么？

1. 匿名函数可以在 IIFE 中使用，来封装局部作用域内的代码，以便其声明的变量不会暴露到全局作用域。

```js
(function() {
  // 一些代码。
})();
```
1. 只使用一次的回调函数，不需要具体函数名，便于维护和提高可读性

1. 用于函数式编程

### 宿主对象（host objects）和原生对象（native objects）的区别是什么？

原生对象是由 ECMAScript 规范定义的 JavaScript 内置对象，比如`String`、`Math`、`RegExp`、`Object`、`Function`等等。

宿主对象是由运行时环境（浏览器或 Node）提供，比如`window`、`XMLHTTPRequest`等等。

### 下列语句有什么区别：function Person(){}、var person = Person()和var person = new Person()？


这个问题问得很含糊。我猜这是在考察 JavaScript 中的构造函数（constructor）。从技术上讲，`function Person(){}`只是一个普通的函数声明。使用 PascalCase 方式命名函数作为构造函数，是一个惯例。

`var person = Person()`将`Person`以普通函数调用，而不是构造函数。如果该函数是用作构造函数的，那么这种调用方式是一种常见错误。通常情况下，构造函数不会返回任何东西，因此，像普通函数一样调用构造函数，只会返回`undefined`赋给用作实例的变量。

`var person = new Person()`使用`new`操作符，创建`Person`对象的实例，该实例继承自`Person.prototype`。另外一种方式是使用`Object.create`，例如：`Object.create(Person.prototype)`。

### call和.apply
```js
function.call(this, arg1, arg2, arg3) 
function.apply(this, [arg1, arg2, arg3]) 
this.function(arg1, arg2, arg3)
```

### Function.prototype.bind作用

> `bind()`方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。


### 功能检测（feature detection）、功能推断（feature inference）和使用 UA 字符串之间有什么区别？

**功能检测（feature detection）**

功能检测包括确定浏览器是否支持某段代码，以及是否运行不同的代码（取决于它是否执行），以便浏览器始终能够正常运行代码功能，而不会在某些浏览器中出现崩溃和错误。例如：

```js
if ('geolocation' in navigator) {
  // 可以使用 navigator.geolocation
} else {
  // 处理 navigator.geolocation 功能缺失
}
```

[Modernizr](https://modernizr.com/)是处理功能检测的优秀工具。

**功能推断（feature inference）**

功能推断与功能检测一样，会对功能可用性进行检查，但是在判断通过后，还会使用其他功能，因为它假设其他功能也可用，例如：

```js
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```

非常不推荐这种方式。功能检测更能保证万无一失。

**UA 字符串**

这是一个浏览器报告的字符串，它允许网络协议对等方（network protocol peers）识别请求用户代理的应用类型、操作系统、应用供应商和应用版本。它可以通过`navigator.userAgent`访问。 然而，这个字符串很难解析并且很可能存在欺骗性。例如，Chrome 会同时作为 Chrome 和 Safari 进行报告。因此，要检测 Safari，除了检查 Safari 字符串，还要检查是否存在 Chrome 字符串。不要使用这种方式。

### 同源策略

同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。


### 跨域问题

#### JSONP

* 由于同源政策的存在，Ajax直接请求普通文件存在跨域无权限访问的问题，无论是静态页面、动态网页、web服务，只要是跨域请求，一律不准；另一方面，通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，这些拥有"src"这个属性的标签都拥有跨域的能力，比如\<script>、\<img>、\<iframe>等标签。 
* JSONP正是利用这一点，web客户端通过与调用脚本一模一样的方式来调用跨域服务器上的资源，服务器端则动态生成JSON，把客户端需要的数据装入进去。
* 其缺点是只能实现get一种请求。

```html
 <script>
 //原生实现
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);

    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }
 </script>
```

跨来源资源共享（CORS） 是推荐的主流方式，JSONP 已被视为一种比较 hack 的方式

#### postMessage

postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：

1. 页面和其打开的新窗口的数据传递
2. 多窗口之间消息传递
3. 页面与嵌套的iframe消息传递
4. 上面三个场景的跨域数据传递

用法：postMessage(data,origin)方法接受两个参数

data： html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。<br />
origin： 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

1.）a.html：(http://www.domain1.com/a.html)

```html
<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向domain2传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com');
    };

    // 接受domain2返回数据
    window.addEventListener('message', function(e) {
        alert('data from domain2 ---> ' + e.data);
    }, false);
</script
```

2.）b.html：(http://www.domain2.com/b.html)

```html
<script>
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from domain1 ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
        }
    }, false);
</script>
```

#### CORS(Cross orign resource share)跨域资源共享

服务器端设置Access-Control-Allow-Origin,前端无须设置

“\*”号表示允许任何域向我们的服务端提交请求：Access-Control-Allow-Origin：*
     
也可以设置指定的域名，如域名 http://www.test2.com ，那么就允许来自这个域名的请求：Access-Control-Allow-Origin：http://www.test2.com

若要带cookie请求：前后端都需要设置

```js
var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容

// 前端设置是否带cookie
xhr.withCredentials = true;

xhr.open('post', 'http://www.domain2.com:8080/login', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('user=admin');

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
};
```

### 请解释变量提升（hoisting）。

使用`var`关键字声明或初始化的变量，会将声明语句“提升”到当前作用域的顶部。 但是，只有声明才会触发提升，赋值语句（如果有的话）将保持原样。

```js
// 用 var 声明得到提升
console.log(foo); // undefined
var foo = 1;
console.log(foo); // 1

// 用 let/const 声明不会提升
console.log(bar); // ReferenceError: bar is not defined
let bar = 2;
console.log(bar); // 2
```

函数声明会使函数体提升，但函数表达式（以声明变量的形式书写）只有变量声明会被提升，也就是说函数不能提前调用 

```js
// 函数声明
console.log(foo); // [Function: foo]
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
console.log(foo); // [Function: foo]

// 函数表达式
console.log(bar); // undefined
bar(); // Uncaught TypeError: bar is not a function
var bar = function() {
  console.log('BARRRR');
};
console.log(bar); // [Function: bar]
```

### “attribute” 和 “property” 之间有什么区别？

“Attribute” 是在 HTML 中定义的，而 “property” 是在 DOM 上定义的。为了说明区别，假设我们在 HTML 中有一个文本框：`<input type="text" value="Hello">`。

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```

但是在文本框中键入“ World!”后:

```js
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

### 为什么扩展 JavaScript 内置对象是不好的做法？

扩展 JavaScript 内置（原生）对象意味着将属性或方法添加到其`prototype`中。虽然听起来很不错，但事实上这样做很危险。想象一下，你的代码使用了一些库，它们通过添加相同的 contains 方法来扩展`Array.prototype`，如果这两个方法的行为不相同，那么这些实现将会相互覆盖，你的代码将不能正常运行。

扩展内置对象的唯一使用场景是创建 polyfill，本质上为老版本浏览器缺失的方法提供自己的实现，该方法是由 JavaScript 规范定义的。

### 请解释单页应用是什么，如何使其对 SEO 友好。

单页面（SPA）应用是服务器端只返回一个html的web，使用客户端渲染，SPA 通过 JavaScript 来动态更新页面，这些 JavaScript 在初始页面加载时已经下载，有些爬虫程序并不会执行JS，所以不利于SEO，可以在服务器端渲染应用，首屏服务器端渲染还可以加快首屏响应速度，或者使用诸如 Prerender 的服务来“在浏览器中呈现的 javascript，保存静态 HTML，并将其返回给爬虫”。

### polyfill

我们希望浏览器提供一些特性，但是没有，然后我们自己写一段代码来实现他，那这段代码就是补丁

### 你使用什么语句遍历对象的属性和数组的元素？

数组用forEach, for of(可break, continue), 对象遍历key用for in，不过会遍历到遍历到它的继承属性，在使用之前，需要加入obj.hasOwnProperty(property)检查

for...of是ES6对于forEach的改善，for of只可以循环可迭代对象的可迭代属性，不可迭代属性在循环中被忽略了（优点1）；可以与break、continue和return配合使用。（优点2）

### 什么是事件循环？调用堆栈和任务队列之间有什么区别？

事件循环是一个单线程循环，用于监视调用堆栈并检查是否有工作即将在任务队列中完成。如果调用堆栈为空并且任务队列中有回调函数，则将回调函数出队并推送到调用堆栈中执行。


### javascript 有哪些方法定义对象
```js
//字面量
var obj = {};
//构造函数
var obj = new Object();
//Object对象方法create()
var obj = Object.create(Object.prototype);
```

### JS几种方法构建函数
4种
```js
//函数声明
function foo() {}
//函数表达式
var f = function (){};
//Function对象构造函数
var f = new Function('a', 'b', 'return a+b');
//箭头函数
var f = () => {};
```

### 请解释`function foo() {}`和`var foo = function() {}`之间`foo`的用法上的区别。

前者是函数声明，后者是函数表达式。关键的区别在于函数声明会使函数体提升（具有与变量相同的提升行为），但函数表达式的函数体不能。有关变量提升的更多解释，请参阅上面关于变量提升的问题。如果你试图在定义函数表达式之前调用它，你会得到一个`Uncaught TypeError: XXX is not a function`的错误。

**函数声明**

```js
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
```

**函数表达式**

```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function() {
  console.log('FOOOOO');
};
```

### 使用let、var和const创建变量有什么区别？

1. 用var声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数（函数作用域），也可以是声明在任何函数外的变量。let和const是块级作用域，意味着它们只能在最近的一组花括号（function、if-else 代码块或 for 循环中）中访问
1. var会使变量提升，这意味着变量可以在声明之前使用。let和const不会使变量提升，提前使用会报错。
1. 用var重复声明不会报错，但let和const会。
1. let和const的区别在于：let允许多次赋值，而const只允许一次。当const变量是基础类型时，改变值会报错，但是为对象其对象的内容是可以改变的，因为const指向对象的地址没有变

### 构造函数中使用箭头函数有什么好处？
1. 简介
1. 正常函数的 this 是可以在执行过程中被改变的，而箭头函数的 this 则会一直保持一致。所以在使用箭头函数的时候，你就不需要担心它的上下文被改变了。

```js
const Person = function(firstName) {
  this.firstName = firstName;
  this.sayName1 = function() { console.log(this.firstName); };
  this.sayName2 = () => { console.log(this.firstName); };
};

const john = new Person('John');
const dave = new Person('Dave');

john.sayName1(); // John
john.sayName2(); // John

// 普通函数的 this 可以被修改，而箭头函数则不会
john.sayName1.call(dave); // Dave (因为 "this" 现在指向了 dave 对象)
john.sayName2.call(dave); // John

john.sayName1.apply(dave); // Dave (因为 "this" 现在指向了 dave 对象)
john.sayName2.apply(dave); // John

john.sayName1.bind(dave)(); // Dave (因为 "this" 现在指向了 dave 对象)
john.sayName2.bind(dave)(); // John

var sayNameFromWindow1 = john.sayName1;
sayNameFromWindow1(); // undefined (因为 "this" 现在指向了 Window 对象)

var sayNameFromWindow2 = john.sayName2;
sayNameFromWindow2(); // John
```

这在 React 的类组件里非常有用。如果你使用普通的函数来定义一个类方法，比如一个点击处理函数，然后你将这个点击处理函数通过 prop 的形式传递给子节点，你将必须在父组件的 `constroctor` 里使用 `fn.bind(this)` 的形式来确保该函数能正常工作。但是如果你使用箭头函数的话，你就不需要手动去绑定 `this` 了，因为箭头函数会自动绑定创建时的 `this`。

### 请给出一个解构（destructuring）对象或数组的例子。

解构是 ES6 中新功能，它提供了一种简洁方便的方法来提取对象或数组的值，并将它们放入不同的变量中。

**数组解构**

```js
// 变量赋值
const foo = ['one', 'two', 'three'];

const [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

```js
// 变量交换
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

**对象解构**

```js
// 变量赋值
const o = { p: 42, q: true };
const { p, q } = o;

console.log(p); // 42
console.log(q); // true
```

### 写一个通用的事件侦听器函数。
```js
// event(事件)工具集
 	my.Event = {
        getEvent: function (event) {
            return event || window.event;
        },
        // 获取事件目标
 		getTarget : function(event) {
 			return event.target || event.srcElement;
 		},
 		// 视能力分别使用dom0||dom2||IE方式 来绑定事件
 		// 参数： 操作的元素,事件名称 ,事件处理程序
 		addEvent : function(element, type, handler, useCapture) {
 			if (element.addEventListener) {//DOM2
 				element.addEventListener(type, handler, useCapture);
                // 返回handler。调用者可以保存，以后remove
                return handler;
 			} else if (element.attachEvent) {//IE78
                // 标准化this，event，target
                var wrapper = function () {
                    var event = window.event;
                    event.target = event.srcElement;
                    handler.call(el, event);
                }; 
 				element.attachEvent('on' + type, wrapper);
                // 返回wrapper。调用者可以保存，以后remove
                return wrapper;
 			} else {//dom0
 				element['on' + type] = handler;
 			}
 		},
 		// 移除事件
 		removeEvent : function(element, type, handler) {
 			if (element.removeEventListener) {
 				element.removeEventListener(type, handler, false);
 			} else if (element.datachEvent) {
 				element.detachEvent('on' + type, handler);
 			} else {
 				element['on' + type] = null;
 			}
 		},
        // 取消事件的默认行为
 		preventDefault : function(event) {
 			if (event.preventDefault) {
 				event.preventDefault();
 			} else if('returnValue' in event){
 				event.returnValue = false;
 			}
 		},
 		// 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
 		stopPropagation : function(event) {
 			if (event.stopPropagation) {
 				event.stopPropagation();
 			} else if(cancelBubble in event){
 				event.cancelBubble = true;
 			}
 		}
 	};
```

### 防抖(debounce)和节流(throttle）

#### 防抖
对于短时间内连续触发的事件，防抖的含义就是让某个时间期限内，事件处理函数只执行一次。
比如延迟200ms，如果在200ms内没有再次触发滚动事件，那么就执行函数，如果在200ms内再次触发滚动事件，那么当前的计时取消，重新开始计时
```js
function debounce(fn, delay){
    let timer = null //借助闭包
    return function() {
        if(timer){
            clearTimeout(timer) 
        }
        timer = setTimeout(fn, delay) // 简化写法
    }
}
// 然后是旧代码
function showTop  () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
　　console.log('滚动条位置：' + scrollTop);
}
window.onscroll = debounce(showTop,1000) // 为了方便观察效果我们取个大点的间断值，实际使用根据需要来配置
```

#### 节流
如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。
```js
function throttle(fn,delay){
    let valid = true
    return function() {
       if(!valid){
           //休息时间 暂不接客
           return false 
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}

// 以下照旧
function showTop  () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
　　console.log('滚动条位置：' + scrollTop);
}
window.onscroll = throttle(showTop,1000)
```
总结
1. 防抖是保证最后执行一次
2. 节流是保证周期性执行

防抖场景
1. window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
2. input用户输入触发搜索

节流场景
1. 监听滚动事件，比如是否滑到底部自动加载更多，用节流来判断

### e.getAttribute(propName)和e.propName
1. e.getAttribute()，是标准 DOM 操作文档元素属性的方法，具有通用性可在任意文档上使用，返回元素在源文件中设置的属性
1. e.propName 通常是在 HTML 文档中访问特定元素的特性，浏览器解析元素后生成对应对象（如 a 标签生成 HTMLAnchorElement），这些对象的特性会根据特定规则结合属性设置得到，对于没有对应特性的属性，只能使用 getAttribute 进行访问
1. e.getAttribute()返回值是源文件中设置的值，类型是字符串或者 null（有的实现返回""）
1. e.propName 返回值可能是字符串、布尔值、对象、undefined 等
1. 大部分 attribute 与 property 是一一对应关系，修改其中一个会影响另一个，如 id，title 等属性
一些布尔属性\<input hidden/>的检测设置需要 hasAttribute 和 removeAttribute 来完成，或者设置对应 property
1. 像\<a href="../index.html">link</a>中 href 属性，转换成 property 的时候需要通过转换得到完整 URL
1. 一些 attribute 和 property 不是一一对应如：form 控件中<input value="hello"/>对应的是 defaultValue，修改或设置 value property 修改的是控件当前值，setAttribute 修改 value 属性不会改变 value property

### height, clientHeight, offsetHeigh，scrollHeight
1. width/height：指元素content的宽高
1. offsetWidth/offsetHeight 返回值包含content + padding + border
1. clientWidth/clientHeight 返回值只包含content + padding，如果有滚动条，也不包含滚动条
1. scrollWidth/scrollHeight 返回值包含content + padding + 溢出内容的尺寸

### mouseover/mouseout 与 mouseenter/mouseleave 的区别与联系
1. mouseover/mouseout 是标准事件，所有浏览器都支持；mouseenter/mouseleave 是 IE5.5 引入的特有事件后来被 DOM3 标准采纳，现代标准浏览器也支持
1. mouseover/mouseout 是冒泡事件；mouseenter/mouseleave不冒泡。需要为多个元素监听鼠标移入/出事件时，推荐 mouseover/mouseout 托管，提高性能
1. 标准事件模型中 event.target 表示发生移入/出的元素,event.relatedTarget对应移出/如元素；在老 IE 中 event.srcElement 表示发生移入/出的元素，event.toElement表示移出的目标元素，event.fromElement表示移入时的来源元素

例子：鼠标从 div#target 元素移出时进行处理，判断逻辑如下：
```html
<div id="target"><span>test</span></div>

<script type="text/javascript">
var target = document.getElementById('target');
if (target.addEventListener) {
  target.addEventListener('mouseout', mouseoutHandler, false);
} else if (target.attachEvent) {
  target.attachEvent('onmouseout', mouseoutHandler);
}

function mouseoutHandler(e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  // 判断移出鼠标的元素是否为目标元素
  if (target.id !== 'target') {
    return;
  }

  // 判断鼠标是移出元素还是移到子元素
  var relatedTarget = event.relatedTarget || e.toElement;
  while (relatedTarget !== target
    && relatedTarget.nodeName.toUpperCase() !== 'BODY') {
    relatedTarget = relatedTarget.parentNode;
  }

  // 如果相等，说明鼠标在元素内部移动
  if (relatedTarget === target) {
    return;
  }

  // 执行需要操作
  //alert('鼠标移出');

}
</script>
```

### IIFE立即执行函数
JavaScript函数作用域链的特性,可以使用这种技术模拟私有作用域。IIFE的出现是为了隔离作用域，比如JQuery的代码都会放在一个IIFE里，通过定义一个匿名函数,相当于创建了一个“私有”的命名空间，该命名空间的变量和方法，不会破坏污染全局的命名空间。此时若是想访问全局对象，将全局对象以参数形式传进去即可，,"容器"内可以访问外部的变量,而外部环境不能访问"容器"内的变量。

```js
 (function(){
})();//常见写法，将（）放在外面

(function(){
}());//将（）与函数写在一块置于外层（）中
```

立即执行函数有两个注意点：
1. 是必须要有（），
1. 函数体必须是函数表达式。

作用：
1. 隔离作用域
1. 封装临时变量




