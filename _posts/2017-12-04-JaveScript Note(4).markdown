---
layout:     post
title:      "JavaScrip Note(4)"
subtitle:   ""
date:       2017-12-04 11:00:00
author:     "Run"
header-img: "img/jsbase4/jsbase4-bg.jpg"
tags:
    - JavaScript
---

### 1

前端设计模式

#### 单体模式(Singleton)

将一批属性和方法组织在一起的对象，用来划分命名空间。其特点：<br />
1. 划分命名空间，只暴露一个入口，减少全局变量带来的风险
2. 利用分支技术来来封装浏览器之间的差异。
3. 可以把代码组织的更为一体，便于阅读和维护。

```
var singleton = {
    attribute: {},
    method1: function(){},
    method2: function(){}
}
```

#### 单例模式(Single)

单例模式定义了一个对象的创建过程，此对象只有一个单独的实例，并提供一个访问它的全局访问点

```
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

```
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

```
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
```
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
```
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

```
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

```
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

```
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

### 2

优雅降级和渐进增强

优雅降级：Web站点在所有新式浏览器中都能正常工作的前提下，如果用户使用的是老式浏览器，则代码会针对旧版本的IE进行降级处理了,使之在旧式浏览器上以某种形式降级体验却不至于完全不能用。如：border-shadow

渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能,向页面增加不影响基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。
如：默认使用flash上传，但如果浏览器支持 HTML5 的文件上传功能，则使用HTML5实现更好的体验；

### 3

Node的优缺点

（优点) 因为Node是基于事件驱动和无阻塞的，所以非常适合处理并发请求，
    因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多。
    此外，与Node代理服务器交互的客户端代码是由javascript语言编写的，
    因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情。

（缺点）Node是一个相对新的开源项目，所以不太稳定，它总是一直在变，
    而且缺少足够多的第三方库支持。看起来，就像是Ruby/Rails当年的样子。

### 4

前端性能优化的办法

（1）减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。

（2）前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

（3）用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。

（4）当需要设置的样式很多时设置className而不是直接操作style。

（5）少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

（6）避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。

（7）图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

（8）避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。

对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。

### 5

http状态码
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

### 6

一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？

0. 再输入url的时候，浏览器可能会做一些预处理，比如 Chrome 会根据历史统计来预估所输入字符对应的网站，比如输入了「ba」，根据之前的历史发现 90% 的概率会访问「www.baidu.com 」，因此就会在输入回车前就马上开始建立 TCP 链接甚至渲染了，还有很多其它很多优化策略
1. 浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
2. 浏览器内核中会先查看缓存，然后调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
3. 进行DNS解析，使用UDP协议获取网址的IP地址;
4. 设置 UA 等信息发出第二个GET请求，进行HTTP协议会话，客户端发送报头(请求报头);
5. 进过运营商路由，主干网传输，进入到相应服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
6. 进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的处理过程;
7. 处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回http状态码304，表示网页未修改过;
8. 浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
9. 文档树建立，根据标记请求所需指定css、js等文件,同时设置cookie;
10. 浏览器内核开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成，呈现给用户。

### 7

对称/非对称加密，公钥和私钥

基本概念:

1. 对称加密, 最快速、最简单的一种加密方式，加密（encryption）与解密（decryption）用的是同样的密钥（secret key）。

2. 非对称加密， 非对称加密为数据的加密与解密提供了一个非常安全的方法，它使用了一对密钥，公钥（public key）和私钥（private key）

3. 密钥对，在非对称加密技术中，有两种密钥，分为私钥和公钥，私钥是密钥对所有者持有，不可公布，公钥是密钥对持有者公布给他人的。

4. 摘要，对需要传输的文本，做一个HASH计算，一般采用SHA1，SHA2来获得。

5. 签名，使用私钥对需要传输的文本的摘要进行加密，得到的密文即被称为该次传输过程的签名。

6. 签名验证，数据接收端，拿到传输文本，但是需要确认该文本是否就是发送发出的内容，中途是否曾经被篡改。因此拿自己持有的公钥对签名进行解密（密钥对中的一种密钥加密的数据必定能使用另一种密钥解密。），得到了文本的摘要，然后使用与发送方同样的HASH算法计算摘要值，再与解密得到的摘要做对比，发现二者完全一致，则说明文本没有被篡改过。

7. 证书中心（certificate authority，简称CA), CA用自己的私钥，对发送者公钥和一些相关信息一起加密，生成"数字证书"（Digital Certificate），发送时连同签名一起发送


对称加密加密与解密使用的是同样的密钥，所以速度快，但由于需要将密钥在网络传输，所以安全性不高。而非对称加密使用了一对密钥，公钥与私钥，所以安全性高，但加密与解密速度慢。解决的办法是将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双方可以使用对称加密来进行沟通。

以Alice和银行之间的通信为例，这同时也是https协议的简略过程：

1. Alice向Bank请求公钥

2. Bank网站从中选出一组加密算法与HASH算法，并将自己的身份信息以证书的形式发回给Alice的浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息

3. Alice的浏览器获得证书后验证合法性，客户端（浏览器）的"证书管理器"，有"受信任的根证书颁发机构"列表，客户端会根据这张列表，查看解开数字证书的公钥是否在列表之内。

4. 若证书合法，浏览器会生成一串随机数的密码，并用证书中提供的公钥加密，这就是对称加密的秘钥。接下来会进行握手验证，使用约定好的HASH算法加密一段握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的对称加密的秘钥（使用公钥加密过的）+ 加密的握手消息发送给Bank。 若不合法则发出警告。

4. Bank使用私钥解密得到对称秘钥，使用秘钥解密浏览器发来的握手消息，并验证HASH是否与浏览器发来的一致。 然后使用密码加密一段握手消息，发送给浏览器。 

5. 浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束，Alice和Bank使用对称秘钥互相传输数据。

<img src="http://lrun1124.github.io/img/jsbase4/Alice&Bank.png"/>

HTTPS一般使用的加密与HASH算法如下：

非对称加密算法：RSA，DSA/DSS 

对称加密算法：AES，RC4，3DES 

HASH算法：MD5，SHA1，SHA256

### 8

XML和JSON的区别？

(1).数据体积方面。

JSON相对于XML来讲，数据的体积小，传递的速度更快些。

(2).数据交互方面。

JSON与JavaScript的交互更加方便，更容易解析处理，更好的数据交互。

(3).数据描述方面。

JSON对数据的描述性比XML较差。

(4).传输速度方面。

JSON的速度要远远快于XML。

### 9

JavaScript垃圾回收机制

- 标记清除： 为所有进入内存的变量加上标记，除去环境中的变量和被环境中变量引用的变量（闭包）后，剩下被标记的变量就是要被清除的变量，到目前为止，IE、Firefox、Opera、Chrome、Safari的js实现使用的都是标记清除的垃圾回收策略或类似的策略，只不过垃圾收集的时间间隔互不相同。

- 引用计数： 跟踪每个值被引用的次数，当声明一个变量并将引用类型的值赋给此变量，则引用+1，当次变量引用的值改变时，则引用-1，当引用为0时，代表没有变量可以引用这个值，可以进行回收。这种机制存在一个问题，当变量存在循环引用的情况会造成内存泄漏。

什么时候进行：

垃圾回收周期性进行，一般都是动态进行的，如垃圾回收器回收的内存分配量低于程序占用内存的15%，说明大部分内存不可被回收，设的垃圾回收触发条件过于敏感，这时候把临街条件翻倍，如果回收的内存高于85%，说明大部分内存早就该清理了，这时候把触发条件置回。

### 10

Web安全及防护原理

- SQL注入

通过把SQL插入Web表单欺骗服务器执行恶意SQL

1. 不要相信用户输入，利用正则等方式对输入的合法性进行判断，格式，长度，特殊字符等。
2. 不要使用动态拼装SQL，使用参数化的SQL或存储过程进行数据库操作
3. 不要使用管理员权限连接数据库，应为每个应用分配单独的权限有限的数据库连接
4. 不要明文存放敏感信息，加密或Hash

- XSS(cross-site scripting)

攻击者向Web页面中恶意插入html标签或Js代码，比如攻击者在页面中插入一个看似安全的链接，用户点击后窃取cookie和用户输入信息；或者攻击者在论坛中加一个恶意表单，当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。

1. 对于用户输入要仔细检查长度以及'<''>'等特殊符号，任何内容写到页面之前都要encode，避免在页面显示时出现html tag，做到这一步能避免超过半数的XSS攻击

2. 避免在cookie中直接暴露用户隐私

3. 通过使cookie 和系统ip 绑定来降低cookie 泄露后的危险

- CSRF（Cross-site request forgery），跨站请求伪造

攻击者盗用了你的身份，以你的名义发送恶意请求。CSRF能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......造成的问题包括：个人隐私泄露以及财产安全

要完成一次CSRF攻击，受害者必须依次完成两个步骤：<br/>
1. 登录受信任网站A，并在本地生成Cookie。
2. 在不登出A的情况下，访问危险网站B。

防御：<br/>
1. 服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数
2. 通过验证码的方法

### 10

ES6

1. let和const，let加入块级作用域
2. 模板字符串，为JavaScript提供了简单的字符串插编辑功能
3. Symbol，独一无二变量
4. 箭头函数
5. Set和Map
6. 原生Promise
7. Module Import，Export
8. Class
9. interator和for of

### 11

for in和for of

1. for...in循环出的是key，for...of循环出的是value
2. for...of是ES6对于forEach的改善，for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。for of只可以循环可迭代对象的可迭代属性，不可迭代属性在循环中被忽略了（优点1）；可以与break、continue和return配合使用。（优点2）

结论：推荐在循环对象属性的时候，使用for...in,在遍历数组的时候的时候使用for...of。

### 12

Cookie和Session

1. session 在服务器端，cookie 在客户端（浏览器）
2. session 默认被存在在服务器的一个文件里（不是内存）
3. session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 session_id）
4. session 可以放在 文件、数据库、或内存中都可以。
5. 用户验证这种场合一般会用 session 因此，维持一个会话的核心就是客户端的唯一标识，即 session id
6. cookie是不安全的，一些网络攻击如XSS和CSRF可以获取cookie或进行cookie欺骗，所以重要信息放在session里，必要放在cookie里要枷锁

## 13

javascript继承的6种方法

1. 原型链继承: 将父类的实例作为子类的原型

2. 借用构造函数继承: 使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）

3. 实例继承：为父类实例添加新特性，作为子类实例返回

4. 拷贝继承

5. 组合继承：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

```
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();

//组合继承也是需要修复构造函数指向的。
Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```

特点：

1. 弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
2. 既是子类的实例，也是父类的实例
3. 不存在引用属性共享问题
4.5可传参
5. 函数可复用

缺点：

调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

6.寄生继承

核心：与原型链继承相似，也是基于某个对象或某些信息创建一个对象，然后增强对象，最后返回对象。寄生式继承解决了组合式继承中两次调用父类的情况，寄生继承不用实例化父类，直接实例化一个临时副本实现相同的原型链继承

```
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true

Cat.prototype.constructor = Cat; // 需要修复下构造函数
```

### 13

MVC和MVVM的理解

MVC

View 传送指令到 Controller, Controller 完成业务逻辑后，要求 Model 改变状态, Model 将新的数据发送到 View，用户得到反馈, 所有通信都是单向的。

MVVM

典型的Angular，它采用双向绑定（data-binding）：View的变动，自动反映在ViewModel，反之亦然。组成部分Model、View、ViewModel

View：UI界面

ViewModel：它是View的抽象，负责View与Model之间信息转换，将View的Command传送到Model；

Model：数据访问层

### 14

事件代理

事件代理（Event Delegation），又称之为事件委托。是 JavaScript 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。使用事件代理的好处是可以提高性能，提高代码可读性，对于动态化的页面（如li、span会新增和删除），不用频繁的绑定事件，减少了内存泄露的概率。

### 15

304缓存原理

客户端请求一个页面（A）。 服务器返回页面A，并在给A加上一个ETag。 客户端展现该页面，并将页面连同ETag一起缓存。 客户再次请求页面A，并将上次请求时服务器返回的ETag一起传递给服务器。 服务器检查该ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304（未修改——Not Modified）和一个空的响应体

