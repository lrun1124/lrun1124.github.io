---
layout:     post
title:      "JavaScrip Practice"
subtitle:   "code oj"
date:       2017-11-07 11:00:00
author:     "Run"
header-img: "img/jspractice/jspractice-bg.jpg"
tags:
    - code
---

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
      }(key));
    }
  }
} 
checkfy(Page.prototype);

var obj = new Page();

obj.postA('checkfy');
obj.postB('checkfy');
obj.postC('checkfy');
```