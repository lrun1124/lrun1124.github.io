---
layout:     post
title:      "HTML Summary"
subtitle:   ""
date:       2019-09-10 2:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - Summary
---
> “Move on. ”
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [HTML](#html)
  - [请描述事件冒泡](#%E8%AF%B7%E6%8F%8F%E8%BF%B0%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1)
  - [请解释事件委托（event delegation）](#%E8%AF%B7%E8%A7%A3%E9%87%8A%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98event-delegation)
  - [IE和firefox事件机制](#ie%E5%92%8Cfirefox%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6)
  - [给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件？](#%E7%BB%99%E4%B8%80%E4%B8%AAdom%E5%90%8C%E6%97%B6%E7%BB%91%E5%AE%9A%E4%B8%A4%E4%B8%AA%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6%E4%B8%80%E4%B8%AA%E7%94%A8%E6%8D%95%E8%8E%B7%E4%B8%80%E4%B8%AA%E7%94%A8%E5%86%92%E6%B3%A1%E4%BC%9A%E6%89%A7%E8%A1%8C%E5%87%A0%E6%AC%A1%E4%BA%8B%E4%BB%B6)
  - [`window`对象和`document`对象](#window%E5%AF%B9%E8%B1%A1%E5%92%8Cdocument%E5%AF%B9%E8%B1%A1)
  - [document 中的`load`事件和`DOMContentLoaded`事件之间的区别是什么？](#document-%E4%B8%AD%E7%9A%84load%E4%BA%8B%E4%BB%B6%E5%92%8Cdomcontentloaded%E4%BA%8B%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
  - [页面编码和被请求的资源编码如果不一致](#%E9%A1%B5%E9%9D%A2%E7%BC%96%E7%A0%81%E5%92%8C%E8%A2%AB%E8%AF%B7%E6%B1%82%E7%9A%84%E8%B5%84%E6%BA%90%E7%BC%96%E7%A0%81%E5%A6%82%E6%9E%9C%E4%B8%8D%E4%B8%80%E8%87%B4)
  - [http状态码](#http%E7%8A%B6%E6%80%81%E7%A0%81)
  - [Doctype作用, HTML5 为什么只需要写 \<!DOCTYPE HTML>, 标准模式与兼容模式有什么区别](#doctype%E4%BD%9C%E7%94%A8-html5-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AA%E9%9C%80%E8%A6%81%E5%86%99-%5Cdoctype-html-%E6%A0%87%E5%87%86%E6%A8%A1%E5%BC%8F%E4%B8%8E%E5%85%BC%E5%AE%B9%E6%A8%A1%E5%BC%8F%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [XML,SGML,HTML,XHTML,HTML5](#xmlsgmlhtmlxhtmlhtml5)
  - [行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？](#%E8%A1%8C%E5%86%85%E5%85%83%E7%B4%A0%E6%9C%89%E5%93%AA%E4%BA%9B%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0%E6%9C%89%E5%93%AA%E4%BA%9B-%E7%A9%BAvoid%E5%85%83%E7%B4%A0%E6%9C%89%E9%82%A3%E4%BA%9B)
  - [使用`link`和`@import`区别](#%E4%BD%BF%E7%94%A8link%E5%92%8Cimport%E5%8C%BA%E5%88%AB)
  - [html5有哪些新特性？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？](#html5%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B0%E7%89%B9%E6%80%A7%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86html5%E6%96%B0%E6%A0%87%E7%AD%BE%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E9%97%AE%E9%A2%98%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86-html-%E5%92%8C-html5)
  - [HTML语义化](#html%E8%AF%AD%E4%B9%89%E5%8C%96)
  - [title与h1的区别、b与strong的区别、i与em的区别？](#title%E4%B8%8Eh1%E7%9A%84%E5%8C%BA%E5%88%ABb%E4%B8%8Estrong%E7%9A%84%E5%8C%BA%E5%88%ABi%E4%B8%8Eem%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？](#%E6%B5%8F%E8%A7%88%E5%99%A8%E6%98%AF%E6%80%8E%E4%B9%88%E5%AF%B9html5%E7%9A%84%E7%A6%BB%E7%BA%BF%E5%82%A8%E5%AD%98%E8%B5%84%E6%BA%90%E8%BF%9B%E8%A1%8C%E7%AE%A1%E7%90%86%E5%92%8C%E5%8A%A0%E8%BD%BD%E7%9A%84%E5%91%A2)
  - [HTML5的离线储存怎么使用，工作原理能不能解释一下？](#html5%E7%9A%84%E7%A6%BB%E7%BA%BF%E5%82%A8%E5%AD%98%E6%80%8E%E4%B9%88%E4%BD%BF%E7%94%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E8%83%BD%E4%B8%8D%E8%83%BD%E8%A7%A3%E9%87%8A%E4%B8%80%E4%B8%8B)
  - [如何实现浏览器内多个标签页之间的通信?](#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E6%B5%8F%E8%A7%88%E5%99%A8%E5%86%85%E5%A4%9A%E4%B8%AA%E6%A0%87%E7%AD%BE%E9%A1%B5%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1)
  - [iframe缺点](#iframe%E7%BC%BA%E7%82%B9)
  - [`Label`的作用是什么？是怎么用的？](#label%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88%E6%98%AF%E6%80%8E%E4%B9%88%E7%94%A8%E7%9A%84)
  - [webSocket如何兼容低浏览器？](#websocket%E5%A6%82%E4%BD%95%E5%85%BC%E5%AE%B9%E4%BD%8E%E6%B5%8F%E8%A7%88%E5%99%A8)
  - [页面可见性（Page Visibility API） 可以有哪些用途？](#%E9%A1%B5%E9%9D%A2%E5%8F%AF%E8%A7%81%E6%80%A7page-visibility-api-%E5%8F%AF%E4%BB%A5%E6%9C%89%E5%93%AA%E4%BA%9B%E7%94%A8%E9%80%94)
  - [Cookie隔离](#cookie%E9%9A%94%E7%A6%BB)
  - [DOM操作](#dom%E6%93%8D%E4%BD%9C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## HTML

### 请描述事件冒泡
当一个事件在 DOM 元素上触发时，如果有事件监听器，它将尝试处理该事件，然后事件冒泡到其父级元素，并发生同样的事情。最后直到事件到达祖先元素。事件冒泡是实现事件委托的原理（event delegation）。

### 请解释事件委托（event delegation）

将时间监听添加到父元素，而不是每个子元素单独设置，当事件冒泡到父元素，监听器就会触发，好处：

* 内存占用减少，只需一个父元素监听事件
* 利于修改和维护，删除/添加的元素无需解绑和修改

### IE和firefox事件机制

IE是事件冒泡，firefox同时支持事件冒泡和捕获
* 事件捕获: 越高层的元素越早接收到事件，由上到下
* 事件冒泡: 越低层的元素越早接收到时间，由下到上

阻止冒泡事件的方法
### 给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件？
绑定几个事件就执行几次，执行优先级:

1. 父元素的捕获事件
1. 目标元素的顺序事件，无视捕获还是冒泡
1. 父元素的冒泡事件

也就是说从外层到内层再回到外层
target.addEventListener(type, listener[, options]);
```html
<div class='d1'>
    <div class='d2'></div>
</div>

<script type='text/javascript'>
var d1 = document.getElementsByClass('d1');
var d2 = document.getElementsByClass('d2');
     
//父级绑定click事件冒泡
d1.addEventListener('click', function(){ console.log('parent bubble') }, false);

//子级绑定click事件冒泡
d2.addEventListener('click', function(){ console.log('child bubble') }, false);

//子级绑定click事件捕获
d2.addEventListener('click', function(){ console.log('child capture') }, true);

//父级绑定click事件捕获
d1.addEventListener('click', function(){ console.log('parent capture') }, true);
</script>
```

console:
```
parent capture
child bubble
child capture
parent bubble
```
### `window`对象和`document`对象

window对象是浏览器打开的窗口，顶层对象，document是window对象的一个属性，HTML文档对象的一个<strong>只读引用</strong>

```js
xxx.click = function(e){
	e.stopPropagation();
	e.cancelBubble = true;//旧IE需要
}
```
### document 中的`load`事件和`DOMContentLoaded`事件之间的区别是什么？

1. 当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。
1. 当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。

### 页面编码和被请求的资源编码如果不一致
设置charset
```html
<script src="http://www.xxx.com/test.js" charset="utf-8"></script>
```

### http状态码
```
100  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
200  OK         正常返回信息
201  Created    请求成功并且服务器创建了新的资源
202  Accepted   服务器已接受请求，但尚未处理
301  Moved Permanently  请求的网页已永久移动到新位置。
302  Found       临时性重定向。
303  See Other   临时性重定向，且总是使用 GET 请求新的 URI。
304  Not Modified 自从上次请求后，请求的网页未修改过。
400  Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
401  Unauthorized 请求未授权。
403  Forbidden   禁止访问。
404  Not Found   找不到如何与 URI 相匹配的资源。
500  Internal Server Error  最常见的服务器端错误。
503  Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
```

### Doctype作用, HTML5 为什么只需要写 \<!DOCTYPE HTML>, 标准模式与兼容模式有什么区别
1. \<!DOCTYPE>`声明位于位于HTML文档中的第一行，处于 \<html>` 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
1. 标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行)HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

### XML,SGML,HTML,XHTML,HTML5

他们都是ML，都是标记语言（Markup Language），所以不同就是前面的部分了。
1. SGML(Standard Generalized Markup Language)，即标准通用标记语言, 是一种古老，复杂的标准
1. HTML(HyperText Markup Language)，超文本标记语言，是语法较为松散的、不严格的Web语言，SGML的子集，其中的HTML5已经不是SGML的子集了
1. XML（eXtensible Markup Language），可扩展标记语言，主要用于存储数据和结构，可扩展，SGML的子集
1. XHTML（eXtensible HyperText Markup Language），可扩展超文本标记语言，基于XML，作用与HTML类似，但语法更严格。所有标签必须闭合，每一个属性都必须使用引号包住，所有<和&特殊符号用编码表示。\<br>要写成\<br />，不能写为\<BR />（同hr）；使用了\<p>之后必须有一个\</p>以结束段落。

### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？
CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素。
1. 行内元素有：a b span img input select strong（强调的语义）
1. 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p
1. 常见的空元素：\<br> \<hr> \<img> \<input> \<link> \<meta>, 不常用的是：\<area> \<base> \<col> \<command> \<embed> \<keygen> \<param> \<source> \<track> \<wbr>

### 使用`link`和`@import`区别
页面导入样式时，使用link和@import有什么区别？
强烈建议使用link标签，慎用@import方式。这样可以避免考虑@import的语法规则和注意事项，避免产生资源文件下载顺序混乱和http请求过多的烦恼。
1. link属于HTML标签，而@import是CSS提供的;
1. 页面被加载的时，link会同时被加载，@import引入的 CSS 将在页面加载完毕后被加载。;
1. import只在IE5以上才能识别，而link是HTML标签，无兼容问题;
1. link方式的样式的权重 高于@import的权重

### html5有哪些新特性？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？
* HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
1. 绘画 canvas;
2. 用于媒介回放的 video 和 audio 元素;
3. 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
4. 用来保存当前会话信息的sessionStorage，数据在浏览器关闭后自动删除;
5. 语意化更好的内容元素，比如 article、footer、header、nav、section;
6. 表单控件，calendar、date、time、email、url、search;
7. 新的技术webworker, websocket, Geolocation;

* 移除的元素：<br>
1. 纯表现的元素：basefont，big，center，font, s，strike，tt，u;<br>
2. 对可用性产生负面影响的元素：frame，frameset，noframes；

* 支持HTML5新标签：
1. IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，浏览器支持新标签后，还需要添加标签默认的样式。
2. 也可以直接使用成熟的框架、比如html5shim;

* 如何区分HTML5： DOCTYPE声明\新增的结构元素\功能元素

### HTML语义化
用正确的标签做正确的事情。
优点：
1. html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
2. 即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;
3. 搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
4. 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

### title与h1的区别、b与strong的区别、i与em的区别？
1. title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取也有很大的影响；
1. strong是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：\<strong>会重读，而\<B>是展示强调内容。
1. i内容展示为斜体，em表示强调的文本；
  Physical Style Elements -- 自然样式标签, 重在视觉作用<br>
  b, i, u, s, pre<br>
  Semantic Style Elements -- 语义样式标签, 重在含义<br>
  strong, em, ins, del, code<br>
  应该准确使用语义样式标签, 但不能滥用, 如果不能确定时首选使用自然样式标签。<br>

### 浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？

1. 在线的情况下，浏览器发现html头部有`manifest`属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
1. 离线的情况下，浏览器就直接使用离线存储的资源。

### HTML5的离线储存怎么使用，工作原理能不能解释一下？
在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理：HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

如何使用：
1. 页面头部像下面一样加入一个manifest的属性；
1. 在cache.manifest文件的编写离线存储的资源；
```
  	CACHE MANIFEST
  	#v0.11
  	CACHE:
  	js/app.js
  	css/style.css
  	NETWORK:
  	resourse/logo.png
  	FALLBACK:
  	/ /offline.html
```
1. 在离线状态时，操作window.applicationCache进行需求实现。

### 如何实现浏览器内多个标签页之间的通信?

1. WebSocket、SharedWorker
1. 也可以调用localstorge、cookies等本地存储方式；localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信；

### iframe缺点
iframe缺点：
1. iframe会阻塞主页面的`Onload`事件；
1. 搜索引擎的检索程序无法解读这种页面，不利于SEO;
1. iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。

### `Label`的作用是什么？是怎么用的？
\<label> 标签为 input 元素定义标注（标记）, 提供焦点绑定。
label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。用for属性绑定id。
```html
<form>
<label for="male">Male</label>
<input type="radio" name="sex" id="male" />
<br />
<label for="female">Female</label>
<input type="radio" name="sex" id="female" />
</form>
```
### webSocket如何兼容低浏览器？
1. Adobe Flash Socket 
1. ActiveX HTMLFile (IE) 
1. 基于 multipart 编码发送 XHR 
1. 基于长轮询的 XHR

### 页面可见性（Page Visibility API） 可以有哪些用途？
页面可见性： 就是对于用户来说，页面是显示还是隐藏, 所谓显示的页面，就是我们正在看的页面；隐藏的页面，就是我们没有看的页面。 因为，我们一次可以打开好多标签页面来回切换着，始终只有一个页面在我们眼前，其他页面就是隐藏的，还有一种就是，把浏览器最小化，所有的页面就都不可见了。

API 很简单，document.hidden 就返回一个布尔值，如果是true, 表示页面可见，false 则表示，页面隐藏。不同页面之间来回切换，触发visibilitychange事件。 还有一个document.visibilityState, 表示页面所处的状态，取值：visible, hidden 等四个。

```js
document.addEventListener("visibilitychange", function(){
    if(document.hidden){
        document.title ="hidden";
    }else {
        document.title = "visibile";
    }
})
```

我们打开这个页面，然后再打开另一个页面，来回点击这两个页面，当我们看到这个页面时，标题显示visiable ,当我们看另一个页面时，标题显示hidden;

作用：动画，视频，音频都可以在页面显示时打开，在页面隐藏时关闭。

### Cookie隔离

cookie隔离技术和传统的多域名拆分请求，提高浏览器并发请求数有点类似，均是采用多域名来处理请求。

传统做法是将css，js，图片等静态文件放在多个域名下面请求，这样就可以跨过浏览器对统一主机名并发连接数的限制，提高整体并发请求量。

cookie隔离技术则是通过使用多个非主要域名来请求静态文件，如果静态文件都放在主域名下，那静态文件请求的时候带有的cookie的数据提交给server是非常浪费的，还不如隔离开。

因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。同时这种方式不会将cookie传入webserver，也减少了webserver对cookie的处理分析环节，提高了webserver的http请求的解析速度。

### DOM操作
```js
//创建
createElement() //创建元素
createDocumentFragment()  //创建DOM片段
createTextNode() //创建文本节点

//操作
appendChild() //添加
removeChild() //删除
replaceChild() //替换
insertbefore() //在已有节点前插入新节点

//查找
getElementsById()
getElementsByName() //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementsByTag()
getElementsByClass()
```
### 如何在页面上实现一个圆形的可点击区域？

三种解决方案： html标签、css实现、 纯js实现

1. map+area或者svg

定义一个客户端图像映射。图像映射（image-map）指带有可点击区域的一幅图像。
```html
    <img src="task6.jpg" width="1366" height="768" border="0" usemap="#Map" />  
    <map name="Map" id="Map">  
        <area shape="circle" coords="100,100,50" href="https://www.baidu.com" target="_blank" />  
    </map> 
``` 
1. css, border-radius
```html
    <style>  
    .disc{  
        width:100px;  
        height:100px;  
        background-color:dimgray;  
        border-radius: 50%;  
        cursor: pointer;  
        position: absolute;  
        left:50px;  
        top:50px;    
        line-height: 100px;  
        text-align: center;  
        color: white;  
    }  
    </style>

    <div class="disc">点击区域</div>  
```
1. 纯js实现, 需要求一个点在不在圆上简单算法、获取鼠标坐标
```html
    <script>
        document.onclick = function(e){
            var r = 50;  //圆的半径
            var x1 = 100,  y1 = 100;  
            var x2 = e.clientX,
                y2 = e.clientY;
            var len=Math.abs(Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));  
            if(len<=50){
                console.log("Inner");
            }else{
                console.log("Outer");
            }
        }
    </script>
```

### 网页验证码是干嘛的，是为了解决什么安全问题
1. 防止XSS
1. 防止暴力破解
1. 防止脚本刷票，论坛灌水等