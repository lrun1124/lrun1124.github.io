---
layout:     post
title:      "JavaScrip Practice"
subtitle:   "code oj"
date:       2019-12-01 11:00:00
author:     "Run"
header-img: "img/jspractice/jspractice-bg.jpg"
tags:
    - code
---
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [12000000.11转化为『12,000,000.11』](#1200000011%E8%BD%AC%E5%8C%96%E4%B8%BA%E3%80%8E1200000011%E3%80%8F)
- [数组随机排列](#%E6%95%B0%E7%BB%84%E9%9A%8F%E6%9C%BA%E6%8E%92%E5%88%97)
- [获取数组中最大值](#%E8%8E%B7%E5%8F%96%E6%95%B0%E7%BB%84%E4%B8%AD%E6%9C%80%E5%A4%A7%E5%80%BC)
- [指定区域加透明遮罩mask](#%E6%8C%87%E5%AE%9A%E5%8C%BA%E5%9F%9F%E5%8A%A0%E9%80%8F%E6%98%8E%E9%81%AE%E7%BD%A9mask)
- [请用代码写出(今天是星期 x)其中 x 表示当天是星期几,如果当天是星期一,输出应该是"今天是星期一"](#%E8%AF%B7%E7%94%A8%E4%BB%A3%E7%A0%81%E5%86%99%E5%87%BA%E4%BB%8A%E5%A4%A9%E6%98%AF%E6%98%9F%E6%9C%9F-x%E5%85%B6%E4%B8%AD-x-%E8%A1%A8%E7%A4%BA%E5%BD%93%E5%A4%A9%E6%98%AF%E6%98%9F%E6%9C%9F%E5%87%A0%E5%A6%82%E6%9E%9C%E5%BD%93%E5%A4%A9%E6%98%AF%E6%98%9F%E6%9C%9F%E4%B8%80%E8%BE%93%E5%87%BA%E5%BA%94%E8%AF%A5%E6%98%AF%E4%BB%8A%E5%A4%A9%E6%98%AF%E6%98%9F%E6%9C%9F%E4%B8%80)
- [下面这段代码想要循环延时输出结果 0 1 2 3 4,请问输出结果是否正确,如果不正确,请说明为什么,并修改循环内的代码使其输出正确结果](#%E4%B8%8B%E9%9D%A2%E8%BF%99%E6%AE%B5%E4%BB%A3%E7%A0%81%E6%83%B3%E8%A6%81%E5%BE%AA%E7%8E%AF%E5%BB%B6%E6%97%B6%E8%BE%93%E5%87%BA%E7%BB%93%E6%9E%9C-0-1-2-3-4%E8%AF%B7%E9%97%AE%E8%BE%93%E5%87%BA%E7%BB%93%E6%9E%9C%E6%98%AF%E5%90%A6%E6%AD%A3%E7%A1%AE%E5%A6%82%E6%9E%9C%E4%B8%8D%E6%AD%A3%E7%A1%AE%E8%AF%B7%E8%AF%B4%E6%98%8E%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B9%B6%E4%BF%AE%E6%94%B9%E5%BE%AA%E7%8E%AF%E5%86%85%E7%9A%84%E4%BB%A3%E7%A0%81%E4%BD%BF%E5%85%B6%E8%BE%93%E5%87%BA%E6%AD%A3%E7%A1%AE%E7%BB%93%E6%9E%9C)
- [现有一个 Page 类,其原型对象上有许多以 post 开头的方法(如 postMsg);另有一拦截函数 chekc,只返回 ture 或 false.请设计一个函数,该函数应批量改造原 Page 的 postXXX 方法,在保留其原有功能的同时,为每个 postXXX 方法增加拦截验证功能,当 chekc 返回 true 时继续执行原 postXXX 方法,返回 false 时不再执行原 postXXX 方法](#%E7%8E%B0%E6%9C%89%E4%B8%80%E4%B8%AA-page-%E7%B1%BB%E5%85%B6%E5%8E%9F%E5%9E%8B%E5%AF%B9%E8%B1%A1%E4%B8%8A%E6%9C%89%E8%AE%B8%E5%A4%9A%E4%BB%A5-post-%E5%BC%80%E5%A4%B4%E7%9A%84%E6%96%B9%E6%B3%95%E5%A6%82-postmsg%E5%8F%A6%E6%9C%89%E4%B8%80%E6%8B%A6%E6%88%AA%E5%87%BD%E6%95%B0-chekc%E5%8F%AA%E8%BF%94%E5%9B%9E-ture-%E6%88%96-false%E8%AF%B7%E8%AE%BE%E8%AE%A1%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E8%AF%A5%E5%87%BD%E6%95%B0%E5%BA%94%E6%89%B9%E9%87%8F%E6%94%B9%E9%80%A0%E5%8E%9F-page-%E7%9A%84-postxxx-%E6%96%B9%E6%B3%95%E5%9C%A8%E4%BF%9D%E7%95%99%E5%85%B6%E5%8E%9F%E6%9C%89%E5%8A%9F%E8%83%BD%E7%9A%84%E5%90%8C%E6%97%B6%E4%B8%BA%E6%AF%8F%E4%B8%AA-postxxx-%E6%96%B9%E6%B3%95%E5%A2%9E%E5%8A%A0%E6%8B%A6%E6%88%AA%E9%AA%8C%E8%AF%81%E5%8A%9F%E8%83%BD%E5%BD%93-chekc-%E8%BF%94%E5%9B%9E-true-%E6%97%B6%E7%BB%A7%E7%BB%AD%E6%89%A7%E8%A1%8C%E5%8E%9F-postxxx-%E6%96%B9%E6%B3%95%E8%BF%94%E5%9B%9E-false-%E6%97%B6%E4%B8%8D%E5%86%8D%E6%89%A7%E8%A1%8C%E5%8E%9F-postxxx-%E6%96%B9%E6%B3%95)
- [鼠标单击 Button1 后将 Button1 移动到 Button2 的后面](#%E9%BC%A0%E6%A0%87%E5%8D%95%E5%87%BB-button1-%E5%90%8E%E5%B0%86-button1-%E7%A7%BB%E5%8A%A8%E5%88%B0-button2-%E7%9A%84%E5%90%8E%E9%9D%A2)
- [如何实现insertAfter](#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0insertafter)
- [网页中实现一个计算当年还剩多少时间的倒数计时程序,要求网页上实时动态显示"×× 年还剩 ×× 天 ×× 时 ×× 分 ×× 秒](#%E7%BD%91%E9%A1%B5%E4%B8%AD%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E8%AE%A1%E7%AE%97%E5%BD%93%E5%B9%B4%E8%BF%98%E5%89%A9%E5%A4%9A%E5%B0%91%E6%97%B6%E9%97%B4%E7%9A%84%E5%80%92%E6%95%B0%E8%AE%A1%E6%97%B6%E7%A8%8B%E5%BA%8F%E8%A6%81%E6%B1%82%E7%BD%91%E9%A1%B5%E4%B8%8A%E5%AE%9E%E6%97%B6%E5%8A%A8%E6%80%81%E6%98%BE%E7%A4%BA%C3%97%C3%97-%E5%B9%B4%E8%BF%98%E5%89%A9-%C3%97%C3%97-%E5%A4%A9-%C3%97%C3%97-%E6%97%B6-%C3%97%C3%97-%E5%88%86-%C3%97%C3%97-%E7%A7%92)
- [完成一个函数,接受数组作为参数,数组元素为整数或者数组,数组元素包含整数或数组,函数返回扁平化后的数组](#%E5%AE%8C%E6%88%90%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E6%8E%A5%E5%8F%97%E6%95%B0%E7%BB%84%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0%E6%95%B0%E7%BB%84%E5%85%83%E7%B4%A0%E4%B8%BA%E6%95%B4%E6%95%B0%E6%88%96%E8%80%85%E6%95%B0%E7%BB%84%E6%95%B0%E7%BB%84%E5%85%83%E7%B4%A0%E5%8C%85%E5%90%AB%E6%95%B4%E6%95%B0%E6%88%96%E6%95%B0%E7%BB%84%E5%87%BD%E6%95%B0%E8%BF%94%E5%9B%9E%E6%89%81%E5%B9%B3%E5%8C%96%E5%90%8E%E7%9A%84%E6%95%B0%E7%BB%84)
- [接受 url 中 query string 为参数,返回解析后的 Object](#%E6%8E%A5%E5%8F%97-url-%E4%B8%AD-query-string-%E4%B8%BA%E5%8F%82%E6%95%B0%E8%BF%94%E5%9B%9E%E8%A7%A3%E6%9E%90%E5%90%8E%E7%9A%84-object)
  - [URL object](#url-object)
  - [URLSearchParams polyfill.](#urlsearchparams-polyfill)
  - [实现](#%E5%AE%9E%E7%8E%B0)
- [解析一个完整的 url,返回 Object 包含域与 window.location 相同](#%E8%A7%A3%E6%9E%90%E4%B8%80%E4%B8%AA%E5%AE%8C%E6%95%B4%E7%9A%84-url%E8%BF%94%E5%9B%9E-object-%E5%8C%85%E5%90%AB%E5%9F%9F%E4%B8%8E-windowlocation-%E7%9B%B8%E5%90%8C)
- [完成函数 getScrollOffset 返回窗口滚动条偏移量](#%E5%AE%8C%E6%88%90%E5%87%BD%E6%95%B0-getscrolloffset-%E8%BF%94%E5%9B%9E%E7%AA%97%E5%8F%A3%E6%BB%9A%E5%8A%A8%E6%9D%A1%E5%81%8F%E7%A7%BB%E9%87%8F)
- [实现一个 Event 类,继承自此类的对象都会拥有两个方法 on,off,once 和 trigger](#%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-event-%E7%B1%BB%E7%BB%A7%E6%89%BF%E8%87%AA%E6%AD%A4%E7%B1%BB%E7%9A%84%E5%AF%B9%E8%B1%A1%E9%83%BD%E4%BC%9A%E6%8B%A5%E6%9C%89%E4%B8%A4%E4%B8%AA%E6%96%B9%E6%B3%95-onoffonce-%E5%92%8C-trigger)
- [编写一个函数将列表子元素顺序反转](#%E7%BC%96%E5%86%99%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E5%B0%86%E5%88%97%E8%A1%A8%E5%AD%90%E5%85%83%E7%B4%A0%E9%A1%BA%E5%BA%8F%E5%8F%8D%E8%BD%AC)
- [以下函数的作用是?空白区域应该填写什么](#%E4%BB%A5%E4%B8%8B%E5%87%BD%E6%95%B0%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E7%A9%BA%E7%99%BD%E5%8C%BA%E5%9F%9F%E5%BA%94%E8%AF%A5%E5%A1%AB%E5%86%99%E4%BB%80%E4%B9%88)
- [使用原生 javascript 给下面列表中的 li 节点绑定点击事件,点击时创建一个 Object 对象,兼容 IE 和标准浏览器](#%E4%BD%BF%E7%94%A8%E5%8E%9F%E7%94%9F-javascript-%E7%BB%99%E4%B8%8B%E9%9D%A2%E5%88%97%E8%A1%A8%E4%B8%AD%E7%9A%84-li-%E8%8A%82%E7%82%B9%E7%BB%91%E5%AE%9A%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6%E7%82%B9%E5%87%BB%E6%97%B6%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-object-%E5%AF%B9%E8%B1%A1%E5%85%BC%E5%AE%B9-ie-%E5%92%8C%E6%A0%87%E5%87%86%E6%B5%8F%E8%A7%88%E5%99%A8)
- [有一个大数组,var a = ['1', '2', '3', ...];a 的长度是 100,内容填充随机整数的字符串.请先构造此数组 a,然后设计一个算法将其内容去重](#%E6%9C%89%E4%B8%80%E4%B8%AA%E5%A4%A7%E6%95%B0%E7%BB%84var-a--1-2-3-a-%E7%9A%84%E9%95%BF%E5%BA%A6%E6%98%AF-100%E5%86%85%E5%AE%B9%E5%A1%AB%E5%85%85%E9%9A%8F%E6%9C%BA%E6%95%B4%E6%95%B0%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%AF%B7%E5%85%88%E6%9E%84%E9%80%A0%E6%AD%A4%E6%95%B0%E7%BB%84-a%E7%84%B6%E5%90%8E%E8%AE%BE%E8%AE%A1%E4%B8%80%E4%B8%AA%E7%AE%97%E6%B3%95%E5%B0%86%E5%85%B6%E5%86%85%E5%AE%B9%E5%8E%BB%E9%87%8D)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### 12000000.11转化为『12,000,000.11』

如何将浮点数点左边的数每三位添加一个逗号，如12000000.11转化为『12,000,000.11』?

```JS
//先找到'.'的位置或末尾，依次向前拼接直到头部
function transfer(num){
	let str = num + '';
	let i = (str.indexOf('.') > 0 ? str.indexOf('.') : str.length) - 3;
	for(; i>0; i-=3){
		str = str.substring(0, i) + ',' + str.substring(i);
	}
	return str;
}
```

### 数组随机排列

- 方法1:

```JS
//Random位置插入新数组，删除原数组内元素
function arrayRandom(arr){
	let res = [],
		index;
	while(arr.length > 0){
		index = parseInt(Math.random() * arr.length);
		res.push(arr[index]);
		arr.splice(index,1)
	}
	return res;
}
//test
let arr = [1,2,3,4,5,6,7,8,9,10];
console.log(arrayRandom(arr));
```

- 方法2:

```JS
//利用Array.prototype.sort的compare function
function arrayRandom(arr){
	return arr.sort(function(){
		return Math.random() - 0.5;
		})
}
//test
let arr = [1,2,3,4,5,6,7,8,9,10];
console.log(arrayRandom(arr));
```

### 获取数组中最大值
```js
var arr = [ 1,5,1,7,5,9];
Math.max(...arr)  // 9 
```

### 指定区域加透明遮罩mask
```html
<html>
<head>
<style>
#target {
    width: 200px;
    height: 300px;
    margin: 40px;
    background-color: tomato;
}
</style>
</head>

<body>
<div id="target"></div>
<script>

//兼容IE，opera
function getStyle(element) {
  if(element.currentStyle) {
    return element.currentStyle;
  } else {
    return getComputedStyle(element, false)
  }
}

function addMask(elem, opacity) {
    opacity = opacity || 0.2;

    var style = getStyle(elem);
    var mask = document.createElement('div');
    //绝对定位
    mask.style.position = 'absolute';
    //设置宽高:content+左右margin
    mask.style.width = (parseFloat(style.marginLeft) +
        parseFloat(style.marginRight) + style.width) + 'px';
    mask.style.height = (parseFloat(style.marginTop) +
        parseFloat(style.marginBottom) + style.height) + 'px';
    //调整位置offsetLeft = content + padding + border, mask要多上margin的部分
    var marginLeft = parseFloat(style.marginLeft);
    mask.style.left = (elem.offsetLeft - marginLeft) + 'px';
    var marginTop = parseFloat(style.marginTop);
    mask.style.top = (elem.offsetTop - marginTop) + 'px';
    //z轴
    mask.style.zIndex = 9999;
    mask.style.opacity = '' + opacity;
    //背景灰色
    mask.style.backgroundColor = 'grey';

    elem.parentNode.appendChild(mask);
}

var target = document.getElementById('target');
addMask(target);

//test不响应click即可
target.addEventListener('click', function () {
    console.log('click');
}, false);
</script>
</body>
</html>
```

### 请用代码写出(今天是星期 x)其中 x 表示当天是星期几,如果当天是星期一,输出应该是"今天是星期一"
```js
var days = ['日','一','二','三','四','五','六'];
var date = new Date();
console.log('今天是星期' + days[date.getDay()]);
```
- Date.prototype.getDate() 根据本地时间返回指定日期对象的月份中的第几天（1-31）。
- Date.prototype.getDay() 根据本地时间返回指定日期对象的星期中的第几天（0-6）
- Date.prototype.getHours() 根据本地时间返回指定日期对象的小时（0-23）。
- Date.prototype.getMilliseconds() 根据本地时间返回指定日期对象的毫秒（0-999）。
- Date.prototype.getMinutes() 根据本地时间返回指定日期对象的分钟（0-59）。
- Date.prototype.getMonth() 根据本地时间返回指定日期对象的月份（0-11）。
- Date.prototype.getSeconds() 根据本地时间返回指定日期对象的秒数（0-59）。
- Date.prototype.getTime() 返回从1970-1-1 00:00:00 UTC（协调世界时）到该日期经过的毫秒数，对于1970-1-1 00:00:00 UTC之前的时间返回负值。

### 下面这段代码想要循环延时输出结果 0 1 2 3 4,请问输出结果是否正确,如果不正确,请说明为什么,并修改循环内的代码使其输出正确结果
```js
for (var i = 0; i < 5; ++i) {
  setTimeout(function () {
    console.log(i + ' ');
  }, 100);
}
```
不能输出正确结果，因为循环中 setTimeout 接受的参数函数通过闭包访问变量 i。javascript 运行环境为单线程，setTimeout 注册的函数需要等待线程空闲才能执行，当setTimeout被放入事件队列的时候，此时 for 循环已经结束，修改方法：
1. 将 setTimeout 放在函数立即调用表达式中，将 i 值作为参数传递给包裹函数，创建新闭包
```js
for (var i = 0; i < 5; ++i) {
  (function (i) {
    setTimeout(function () {
      console.log(i + ' ');
    }, 100);
  }(i));
}
```
2. 使用let
```js
for (let i = 0; i < 5; ++i) {
    setTimeout(function () {
      console.log(i + ' ');
    }, 100);
}
```

### 现有一个 Page 类,其原型对象上有许多以 post 开头的方法(如 postMsg);另有一拦截函数 chekc,只返回 ture 或 false.请设计一个函数,该函数应批量改造原 Page 的 postXXX 方法,在保留其原有功能的同时,为每个 postXXX 方法增加拦截验证功能,当 chekc 返回 true 时继续执行原 postXXX 方法,返回 false 时不再执行原 postXXX 方法
```js
function Page() {}

Page.prototype = {
  constructor: Page,

  postA: function (a) {
    console.log('a:' + a);
  },
  postB: function (b) {
    console.log('b:' + b);
  },
  postC: function (c) {
    console.log('c:' + c);
  },
  check: function () {
    return Math.random() > 0.5;
  }
}

//使用立即执行
function checkfy(obj) {
  for (var key in obj) {
    if (key.startsWith('post') && typeof obj[key] === 'function') {
      (function (key) {
        var fn = obj[key];
        obj[key] = function () {
          if (obj.check()) {
            fn.apply(obj, arguments);
          }
        };
      })(key);
    }
  }
} 
checkfy(Page.prototype);

var obj = new Page();

obj.postA('checkfy');
obj.postB('checkfy');
obj.postC('checkfy');
```

### 鼠标单击 Button1 后将 Button1 移动到 Button2 的后面
```html
<body>
    <div>
        <input type="button" id ="btn1" value="1" />
        <input type="button" id ="btn2" value="2" />
    </div>
    <script type="text/javascript">
        var btn1 = document.getElementById('btn1');
        var btn2 = document.getElementById('btn2');

        function addEvent(element, type, handler) {
            if(element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        }
        addEvent(btn1, 'click', function (e){
            //e.insertBefore() 方法在参考节点之前插入一个节点作为一个指定父节点的子节点。
            //parentElement.insertBefore(newElement, referEl
			//1. 如果要插入的newElement已经在DOM树中存在，那么执行此方法会将该节点从DOM树中移除。
			//2. 如果referElement为null，那么`newElement会被添加到父节点的子节点末尾
            btn1.parentNode.insertBefore(btn2, btn1);
        });
    </script>
</body>
```

### 如何实现insertAfter
JS原生不存在insertAfter方法, 元素节点还有一个属性: nextSibling，即指向元素的下个兄弟元素，如果已经是末尾子节点则为null。
```js
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
```

### 网页中实现一个计算当年还剩多少时间的倒数计时程序,要求网页上实时动态显示"×× 年还剩 ×× 天 ×× 时 ×× 分 ×× 秒
```html
<body>
<span id="target"></span>
<script type="text/javascript">
    // 为了简化。每月默认30天
    function getTimeString() {
        var start = new Date();
        var end = new Date(start.getFullYear() + 1, 0, 1);
        var elapse = Math.floor((end - start) / 1000);

        var seconds = elapse % 60 ;
        var minutes = Math.floor(elapse / 60) % 60;
        var hours = Math.floor(elapse / (60 * 60)) % 24;
        var days = Math.floor(elapse / (60 * 60 * 24)) % 30;
        var months = Math.floor(elapse / (60 * 60 * 24 * 30)) % 12;
        var years = Math.floor(elapse / (60 * 60 * 24 * 30 * 12));

        return start.getFullYear() + '年还剩' + years + '年' + months + '月' + days + '日'
            + hours + '小时' + minutes + '分' + seconds + '秒';
    }

    function addText(elem, text) {
        if (elem.textContent) {
            elem.textContent = text;
        } else if (elem.innerText) {
            elem.innerText = text;
        } else {
            elem.innerHTML = text;
        }
    }

    var target = document.getElementById('target');

    setInterval(function () {
        addText(target, getTimeString());
    }, 1000)
</script>
</body>
```

### 完成一个函数,接受数组作为参数,数组元素为整数或者数组,数组元素包含整数或数组,函数返回扁平化后的数组
如：[1, [2, [ [3, 4], 5], 6]] => [1, 2, 3, 4, 5, 6]
```js
function flat(arr, res) {
	if(!Array.isArray(arr)) {
		res.push(arr);
	} else {
		arr.forEach(item => {
			if(!Array.isArray(arr)){
				res.push(item);
			} else {
				flat(item, res);
			}
		});
	}
}
var data = [1, [2, [ [3, 4], 5], 6]];
var res = [];
flat(data, res)
console.log(res)
```

### 接受 url 中 query string 为参数,返回解析后的 Object
#### URL object
modern browser 可以用 URL object
```js
var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("c");
console.log(c);
```

#### URLSearchParams polyfill.
https://github.com/ungap/url-search-params

#### 实现
```js
function parse_query_string(query) {
	//不是字符串处理
	if(Object.prototype.toString.call(query) !== '[object String]') {
		return {};
	}
	//去掉字符串开头可能带的?
    if (query.charAt(0) === '?') {
        query = query.substring(1);
    }
	var query_arr = query.split("&");
	var query_obj = {};
	for (var i = 0; i < query_arr.length; i++) {
		var pair = query_arr[i].split("=");
		var key = decodeURIComponent(pair[0]);
		var value = decodeURIComponent(pair[1]);
		//分三种情况，第一次碰到直接添加，第二次变成数组，第三次直接push数组
		if (!(key in query_obj)) {
			// If first entry with this name
			query_obj[key] = decodeURIComponent(value);
		} else if (!Array.isArray(query_obj[key])) {
			// If second entry with this name
			var arr = [query_obj[key], decodeURIComponent(value)];
			query_obj[key] = arr;
		} else {
			// If third or later entry with this name
			query_obj[key].push(decodeURIComponent(value));
		}
	}
	return query_obj;
}

var query_string = "a=1&b=3&c=m2-m3-m4-m5&a=2&b=1&b=2&b=3&b=4";
var parsed_qs = parse_query_string(query_string);
console.log(parsed_qs);
```

### 解析一个完整的 url,返回 Object 包含域与 window.location 相同

先写正则再加括号
- 协议 `[^:]+`
- `\/\/`
- host `[^:\/\/?#&]+`
- `:`
- 端口 `(\d+)?`
- pathname `\/[^?]*`
- `?`
- `.*`

```
/**
 * 解析一个url并生成window.location对象中包含的域
 * location:
 * {
 *      href: '包含完整的url',
 *      origin: '包含协议到pathname之前的内容',
 *      protocol: 'url使用的协议，包含末尾的:',
 *      username: '用户名', // 暂时不支持
 *      password: '密码',  // 暂时不支持
 *      host: '完整主机名，包含:和端口',
 *      hostname: '主机名，不包含端口'
 *      port: '端口号',
 *      pathname: '服务器上访问资源的路径/开头',
 *      search: 'query string，?开头',
 *      hash: '#开头的fragment identifier'
 * }
 *
 * param {string} url 需要解析的url
 * return {Object} 包含url信息的对象
 */
```
```js
function parseUrl(url) {
    var result = {};
    var keys = ['href', 'origin', 'protocol', 'host',
                'hostname', 'port', 'pathname', 'search', 'hash'];
    var i, len;
    var regexp = /(([^:]+:)\/\/(([^:\/\?#]+):(\d+)?))(\/[^?]*)?(.*)/;
    var match = regexp.exec(url);
	//嵌套规则：根据开括号的出现顺序来计数
    if (match) {
        for (i = keys.length - 1; i >= 0; --i) {
            result[keys[i]] = match[i] ? match[i] : '';
        }
    }
    return result;
}
```

### 完成函数 getScrollOffset 返回窗口滚动条偏移量
```js
/**
 * 获取指定window中滚动条的偏移量，如未指定则获取当前window
 * 滚动条偏移量
 *
 * @param {window} w 需要获取滚动条偏移量的窗口
 * @return {Object} obj.x为水平滚动条偏移量,obj.y为竖直滚动条偏移量
 */
function getScrollOffset(w) {
    w =  w || window;
    // 如果是标准浏览器
    if (w.pageXOffset != null) {
        return {
            x: w.pageXOffset,
            y: w.pageYOffset
        };
    }

    // 老版本IE，根据兼容性不同访问不同元素
    var d = w.document;
    if (d.compatMode === 'CSS1Compat') {
        return {
            x: d.documentElement.scrollLeft,
            y: d.documentElement.scrollTop
        }
    }

    return {
        x: d.body.scrollLeft,
        y: d.body.scrollTop
    };
}
```

### 实现一个 Event 类,继承自此类的对象都会拥有两个方法 on,off,once 和 trigger
```js
function myEvent (){
	if(!(this instanceof myEvent)) {
		return new Event();
	}
	this._callback = {}
}
myEvent.prototype.on = function(type, handler) {
	this.callback = this.callback || {};
	this.callback[type] = this.callback[type] || [];
	this.callback[type].push(handler);
	return this;
}
myEvent.prototype.off = function(type, handler) {
	var list = this._callbacks[type];
	if(!list) return;
	for(var i=0; i<lisy.length;i++){
		if(list[i] === handler) {
			list.splice(i, 1);
		}
	}
	return this;
}
myEvent.prototype.trigger = function(type) {
	var list = this._callbacks[type];
	if(!list) return;
	for(var i=0; i<lisy.length;i++){
		list[i].call(this);
	}
	return this;
}
myEvent.prototype.off = function(type, handler) {
	var me = this;
	var wrapper = function () {
		handler.call(this);
		me.off(type);
	}
	me.on(type, wrapper);
	return this;
}
```

### 编写一个函数将列表子元素顺序反转
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>TEst</title>
</head>
<body>
    <ul id="target">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <input type='button' id='btn' value="click">
<script type="text/javascript">
	var target = document.getElementById('target');
    var btn = document.getElementById('btn');
    function revertList (){
        var newList = document.createDocumentFragment();
        for(var i=target.children.length-1; i>=0; i--) {
            newList.appendChild(target.children[i])
        }
        //appendChild:如果被插入的节点已经存在于当前文档的文档树中,则那个节点会首先从原先的位置移除,然后再插入到新的位置.
        target.appendChild(newList);
    }
    btn.addEventListener('click', revertList, false);
</script>
</body>
</html>
```

### 以下函数的作用是?空白区域应该填写什么
```js
// define
(function (window) {
    function fn(str) {
        this.str = str;
    }

    fn.prototype.format = function () {
        var arg = __1__;
        return this.str.replace(__2__, function (a, b) {
            return arg[b] || '';
        });
    };

    window.fn = fn;
})(window);

// use
(function () {
    var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
    console.log(t.format('http://www.alibaba.com', 'Alibaba', 'Welcome'));
})();
```

define 部分定义一个简单的模板类，使用{}作为转义标记，中间的数字表示替换目标，format 实参用来替换模板内标记 横线处填：

1. `Array.prototype.slice.call(arguments, 0)`
1. `/\{\s*(\d+)\s*\}/g`

编写一个函数实现 form 的序列化(即将一个表单中的键值序列化为可提交的字符串)
```html
<form id="target">
    <select name="age">
        <option value="aaa">aaa</option>
        <option value="bbb" selected>bbb</option>
    </select>
    <select name="friends" multiple>
        <option value="qiu" selected>qiu</option>
        <option value="de">de</option>
        <option value="qing" selected>qing</option>
    </select>
    <input name="name" value="qiudeqing">
    <input type="password" name="password" value="11111">
    <input type="hidden" name="salery" value="3333">
    <textarea name="description">description</textarea>
    <input type="checkbox" name="hobby" checked value="football">Football
    <input type="checkbox" name="hobby" value="basketball">Basketball
    <input type="radio" name="sex" checked value="Female">Female
    <input type="radio" name="sex" value="Male">Male
</form>


<script>
/**
 * 将一个表单元素序列化为可提交的字符串
 *
 * @param {FormElement} form 需要序列化的表单元素
 * @return {string} 表单序列化后的字符串
 */
function serializeForm(form) {
  if (!form || form.nodeName.toUpperCase() !== 'FORM') {
    return;
  }

  var result = [];

  var i, len;
  var field, fieldName, fieldType;

  for (i = 0, len = form.length; i < len; ++i) {
    field = form.elements[i];
    fieldName = field.name;
    fieldType = field.type;

    if (field.disabled || !fieldName) {
      continue;
    } // enf if

    switch (fieldType) {
      case 'text':
      case 'password':
      case 'hidden':
      case 'textarea':
        result.push(encodeURIComponent(fieldName) + '=' +
            encodeURIComponent(field.value));
        break;

      case 'radio':
      case 'checkbox':
        if (field.checked) {
          result.push(encodeURIComponent(fieldName) + '=' +
            encodeURIComponent(field.value));
        }
        break;

      case 'select-one':
      case 'select-multiple':
        for (var j = 0, jLen = field.options.length; j < jLen; ++j) {
          if (field.options[j].selected) {
            result.push(encodeURIComponent(fieldName) + '=' +
              encodeURIComponent(field.options[j].value || field.options[j].text));
          }
        } // end for
        break;

      case 'file':
      case 'submit':
        break; // 是否处理？

      default:
        break;
    } // end switch
  } // end for

    return result.join('&');
}

var form = document.getElementById('target');
console.log(serializeForm(form));
</script>
```

### 使用原生 javascript 给下面列表中的 li 节点绑定点击事件,点击时创建一个 Object 对象,兼容 IE 和标准浏览器
```html
<ul id="nav">
    <li><a href="http://11111">111</a></li>
    <li><a href="http://2222">222</a></li>
    <li><a href="http://333">333</a></li>
    <li><a href="http://444">444</a></li>
</ul>

Object:
{
    "index": 1,
    "name": "111",
    "link": "http://1111"
}
```

```js
var EventUtil = {
	...
};
var DOMUtil = {
	//innerText 对IE的兼容性较好
	//textContent虽然作为标准方法但是只支持IE8+以上的浏览器
    text: function (elem) {
        if ('textContent' in elem) {
            return elem.textContent;
        } else if ('innerText' in elem) {
            return elem.innerText;
        }
    },
    prop: function (elem, propName) {
        return elem.getAttribute(propName);
    }
};

var nav = document.getElementById('nav');

EventUtil.on(nav, 'click', function (event) {
    var event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    var children = this.children;
    var i, len;
    var anchor;
    var obj = {};

    for (i = 0, len = children.length; i < len; ++i) {
        if (children[i] === target) {
            obj.index = i + 1;
            anchor = target.getElementsByTagName('a')[0];
            obj.name = DOMUtil.text(anchor);
            obj.link = DOMUtil.prop(anchor, 'href');
        }
    }
    alert('index: ' + obj.index + ' name: ' + obj.name +
        ' link: ' + obj.link);
});
```

### 有一个大数组,var a = ['1', '2', '3', ...];a 的长度是 100,内容填充随机整数的字符串.请先构造此数组 a,然后设计一个算法将其内容去重
```js
function unique (arr) {
	if(!arr || !Array.isArray(arr)) return;
	var hash = {}, 
		res = [];
	arr.forEach(function(item, index){
		if(hash[item]){
			arr.splice(index, 1)
		} else {
			hash[item] = true;
		}
	});
}
/**
* 用100个随机整数对应的字符串填充数组。
**/
function fillArray(arr, start, end) {
	start = start == undefined ? 1 : start;
	end = end == undefined ?  100 : end;

	if (end <= start) {
		end = start + 100;
	}

	var width = end - start;
	for (var i = 0; i < 100; i++) {
		arr.push("" + (Math.floor(Math.random() * width) + start));
	}
	return arr;
}

var input = [];
//生成数组
fillArray(input, 1, 100);
//随机排列
input.sort(function (a, b) { return a - b;});
console.log(input);
//去重
unique(input);
console.log(input);
```