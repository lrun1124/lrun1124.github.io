---
layout:     post
title:      "JavaScrip Note(3)"
subtitle:   ""
date:       2017-11-29 11:00:00
author:     "Run"
header-img: "img/jsbase3/jsbase3-bg.jpg"
tags:
    - JavaScript
---

### 1

同步与异步

同步的概念是来自OS中同步的概念：不同的进程为了完成某项任务在执行先后顺序上进行协作，通过唤醒、阻塞等方式调节。

对于Web而言：<br />
同步: 访问服务器，服务器回应，页面刷新，用户操作，整个过程是串行的方式进行的，影响用户操作<br />
异步: 访问服务器，用户继续操作，服务器回应，页面更新，用户操作，整个过程不发生整页刷新，不影响用户操作<br />

### 2

跨域问题

#### 同源策略

同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

#### JSONP

* 由于同源政策的存在，Ajax直接请求普通文件存在跨域无权限访问的问题，无论是静态页面、动态网页、web服务，只要是跨域请求，一律不准；另一方面，通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，这些拥有"src"这个属性的标签都拥有跨域的能力，比如\<script>、\<img>、\<iframe>等标签。 
* JSONP正是利用这一点，web客户端通过与调用脚本一模一样的方式来调用跨域服务器上的资源，服务器端则动态生成JSON，把客户端需要的数据装入进去。
* 其缺点是只能实现get一种请求。

```
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

```
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

```
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

```
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

### 3

页面编码和被请求的资源编码如果不一致如何处理？

设置charset

```
<script src="http://www.xxx.com/test.js" charset="utf-8"></script>
```

//todo

### 4

前端模块化加载

知识点1：AMD(Asynchronous Module Definition)/CMD(Common Module Definition)/CommonJs是JS模块化开发的标准，目前对应的实现是RequireJs/SeaJs/nodeJs.

知识点2：CommonJs主要针对服务端，AMD/CMD主要针对浏览器端，所以最容易混淆的是AMD/CMD。（顺便提一下，针对服务器端和针对浏览器端有什么本质的区别呢？服务器端一般采用同步加载文件，也就是说需要某个模块，服务器端便停下来，等待它加载再执行。这里如果有其他后端语言，如java，经验的‘玩家’应该更容易理解。而浏览器端要保证效率，需要采用异步加载，这就需要一个预处理，提前将所需要的模块文件并行加载好。）

知识点3 : AMD/CMD区别，虽然都是并行加载js文件，但还是有所区别，AMD是预加载，在并行加载js文件同时，还会解析执行该模块（因为还需要执行，所以在加载某个模块前，这个模块的依赖模块需要先加载完成）；而CMD是懒加载，虽然会一开始就并行加载js文件，但是不会执行，而是在需要的时候才执行。

知识点4：AMD/CMD的优缺点.一个的优点就是另一个的缺点， 可以对照浏览。

AMD优点：加载快速，尤其遇到多个大文件，因为并行解析，所以同一时间可以解析多个文件。<br />
AMD缺点：并行加载，异步处理，加载顺序不一定，可能会造成一些困扰，甚至为程序埋下大坑。

CMD优点：因为只有在使用的时候才会解析执行js文件，因此，每个JS文件的执行顺序在代码中是有体现的，是可控的。<br />
CMD缺点：执行等待时间会叠加。因为每个文件执行时是同步执行（串行执行），因此时间是所有文件解析执行时间之和，尤其在文件较多较大时，这种缺点尤为明显。

知识点5：如何使用？CommonJs的话，因为nodeJs就是它的实现，所以使用node就行，也不用引入其他包。AMD则是通过\<script>标签引入RequireJs，CMD则是引入SeaJs。

```
 // CMD
 define(function(require, exports, module) {
     var a = require('./a')
     a.doSomething()
     // 此处略去 100 行
     var b = require('./b') // 依赖可以就近书写
     b.doSomething()
     // ...
 })

 // AMD 默认推荐
 define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
     a.doSomething()
     // 此处略去 100 行
     b.doSomething()
     // ...
 })
```

### 5

DOM操作

```
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

### 6

call和apply

foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments)==this.foo(arg1, arg2, arg3)

### 7

内存泄漏

内存泄漏时指一块被分配的内存既不能使用也不能回收。在JavaScipt出现主要有两种情况:

1.循环引用。含有DOM对象的循环引用将导致大部分当前主流浏览器内存泄露。

```
//a,b循环引用
var a = new Object;
var b = new Object;
a.r = b;
b.r = a;

//a循环引用自己
var a = new Object;
a.r = a;
```

2.闭包。

闭包可以导致内存泄漏是因为内部方法保持一个对外部方法变量的引用，所以尽管方法返回了内部方法还可以继续访问在外部方法中定义的私有变量，所以这些变量被一直保存在内存中。

### 8

如何判断当前脚本运行在浏览器还是node环境中

```
this === window ? 'browser' : 'node'
```

### 9 

把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？

放在body的封闭之前，将会阻塞其他资源的加载，放在body封闭之后，不会影响body内元素的加载

### 10

给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？

绑定几个事件就执行几次，执行优先级:

1. 父元素的捕获事件
2. 目标元素的顺序事件，无视捕获还是冒泡
3. 父元素的冒泡事件

```
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

### 11

==, ===, Object.is()区别

==会进行类型转换，===不会，Object.is 在三等号判等的基础上特别处理了 NaN 、-0 和 +0 ，保证 -0 和 +0 不再相同，但 Object.is(NaN, NaN) 会返回 true.
