---
layout:     post
title:      "JavaScrip Note(2)"
subtitle:   "This, Eval, document, 时间机制，new，JSON，Ajax，延迟加载"
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

### 6

JS中不会查找原型的函数

hasOwnProperty判断对象中是否有指定名称的属性，object.hasOwnProperty(proName)，proName是属性名称的<strong>字符串值</strong>

### 7

JSON的了解

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

### 8

Ajax

Asynchronous JavaScript and Xml, 异步传输+JS+xml，异步的含义是在向服务器发送请求后，不必等待响应，可以先做其他的事，等相应返回可以根据设定的callback函数进行操作，于此同时，网页不会发生整页刷新，提高了效率和用户体验。

步骤：

1. 创建XMLHttpRequest对象
2. 设置响应HTTP请求状态变化的函数
3. 指定该对象的的方法、URL及验证信息
4. 发送HTTP请求
5. 获取异步调用返回的数据
6. 使用JavaScript和DOM实现局部刷新

```
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
### 9

JS延迟加载方式

JS延迟加载就是在页面加载完成后再加载JS文件，有助于提高页面加载速度，提高用户体验。

#### 使用defer或async属性

```
<script src="test1.js" defer="defer"></script>
<script src="test2.js" async></script>
```

- 只适用于外部脚本，缺点是不能保证脚本会按顺序执行

#### 动态DOM操作

即利用动态DOM操作按需插入JS文件

```
//延迟1000ms加载new.js
window.onload = function(){
	setTimeout(function(){
		var head = document.getEßlementByTagName('head')[0];
		var js = document.createElement('Script');
		js.type = 'text/javascript';
		js.src = 'new.js';
		head.appendChlid(js); 
	},1000);
}
```

#### 分组最后加载JS

JS的引入如果放在head中，则页面加载前就会JS就会被加载，如果放在body中，则会按顺序加载，所以可以将JS分组，将加载过程中不需要的JS放在页面的底部，</body>标签之前，然而这种方法偶尔会收到Google页面速度测试工具的“延迟加载javascript”警告，Google提供了一套推荐方案：

```
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
2. 粘贴代码放置在</body>标签前 (靠近HTML文件底部)；
3. 修改“defer.js”为外部JS文件名；
4. 确保文件路径是正确的。例如：如果仅输入“defer.js”，那么“defer.js”文件一定与HTML文件在同一文件夹下。

- 注意：这段代码直到文档加载完才会加载指定的外部js文件。因此，不应该把那些页面正常加载需要依赖的javascript代码放在这里。而应该将JavaScript代码分成两组。<strong>一组是因页面需要而立即加载的javascript代码，另外一组是在页面加载后进行操作的javascript代码(例如添加click事件或其他东西)</strong>。这些需等到页面加载后再执行的JavaScript代码，应放在一个外部文件，然后再引进来。

### 10

Ajax缓存问题

Ajax能提高页面载入的速度主要的原因是通过ajax减少了重复数据的载入，也就是说在载入数据的同时将数据缓存到内存中，一旦数据被加载其中，只要我们没有刷新页面，这些数据就会一直被缓存在内存中，当我们提交的URL与历史的URL一致时，就不需要提交给服务器，也就是不需要从服务器上面去获取数据，虽然这样降低了服务器的负载提高了用户的体验，但是我们不能获取最新的数据。为了保证我们读取的信息都是最新的，我们就需要禁止缓存功能。

解决方案有如下几种：

1. 在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。
2. 在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。
3. 在URL后面加上一个随机数： "fresh=" + Math.random();。
4. 在URL后面加上时间搓："nowtime=" + new Date().getTime();。


