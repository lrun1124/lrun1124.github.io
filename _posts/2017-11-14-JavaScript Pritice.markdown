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
## URL object
modern browser 可以用 URL object
```js
var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("c");
console.log(c);
```

## URLSearchParams polyfill.
https://github.com/ungap/url-search-params

## 实现
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
- 协议 [^:]+
- \/\/
- host [^:\/\/?#&]+
- :
- 端口 (\d+)?
- pathname \/[^?]*
- ?
- .*
```js
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
 * @param {string} url 需要解析的url
 * @return {Object} 包含url信息的对象
 */
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
	for(var i=0; i<lisy.length;i++){{
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