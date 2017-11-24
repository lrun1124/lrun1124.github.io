---
layout:     post
title:      "JavaScrip Note(二)"
subtitle:   ""
date:       2017-11-23 19:00:00
author:     "Run"
header-img: "img/jsbase2/jsbase2-bg.jpg"
tags:
    - JavaScript
---

### 1

This的理解

* this总是指向函数的直接调用者（而非简洁调用者）,即此次调用的所有者
* 如果有new对象，this指向new出来的对象

### 2

Eval

* Eval将传入的字符串当做JS代码执行, 应避免在不必要的情况下使用
	- 运行Eval存在风险，有可能运行的是恶意代码
	- 运行效率差，因为会调用JS解析器

### 3

window对象和document对象

window对象是浏览器打开的窗口，顶层对象，document是window对象的一个属性，HTML文档对象的一个<strong>只读引用</strong>

### 4

IE和firefox事件机制

IE是事件冒泡，firefox同时支持事件冒泡和捕获
* 时间捕获: 越高层的元素越早接收到事件，由上到下
* 事件冒泡: 越低层的元素越早接收到时间，由下到上

组织冒泡事件的方法

```JS
xxx.click = function(e){
	e.stopPropagation();
	e.cancelBubble = true;//旧IE需要
}
```
### 5

new的过程

1. 创建空对象；
	- var obj = {};
2. 将创建出对象的原型链引用指向所要构造函数的原型；
	- obj.\__proto__ = ClassA.prototype; 
3. 调用构造函数，this指向新实例对象：
	- ClassA.call(obj);　　//{}.构造函数();          
4. 将初始化完毕的新对象地址，保存到等号左边的变量中