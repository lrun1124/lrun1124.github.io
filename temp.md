#### .forEach循环和.map()循环的主要区别，它们分别在什么情况下使用？

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

#### 宿主对象（host objects）和原生对象（native objects）的区别是什么？

原生对象是由 ECMAScript 规范定义的 JavaScript 内置对象，比如`String`、`Math`、`RegExp`、`Object`、`Function`等等。

宿主对象是由运行时环境（浏览器或 Node）提供，比如`window`、`XMLHTTPRequest`等等。

#### 下列语句有什么区别：function Person(){}、var person = Person()和var person = new Person()？


这个问题问得很含糊。我猜这是在考察 JavaScript 中的构造函数（constructor）。从技术上讲，`function Person(){}`只是一个普通的函数声明。使用 PascalCase 方式命名函数作为构造函数，是一个惯例。

`var person = Person()`将`Person`以普通函数调用，而不是构造函数。如果该函数是用作构造函数的，那么这种调用方式是一种常见错误。通常情况下，构造函数不会返回任何东西，因此，像普通函数一样调用构造函数，只会返回`undefined`赋给用作实例的变量。

`var person = new Person()`使用`new`操作符，创建`Person`对象的实例，该实例继承自`Person.prototype`。另外一种方式是使用`Object.create`，例如：Object.create(Person.prototype)`。

#### .call和.apply

function.call(this, arg1, arg2, arg3) 
function.apply(this, [arg1, arg2, arg3]) 
this.function(arg1, arg2, arg3)

#### Function.prototype.bind

> `bind()`方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。


#### 功能检测（feature detection）、功能推断（feature inference）和使用 UA 字符串之间有什么区别？

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

#### 同源策略

同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。


#### 14. 跨域问题

##### JSONP

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

跨来源资源共享（CORS） 是推荐的主流方式，JSONP 已被视为一种比较 hack 的方式

##### postMessage

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

##### CORS(Cross orign resource share)跨域资源共享

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

#### 请解释变量提升（hoisting）。

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
#### 请描述事件冒泡
当一个事件在 DOM 元素上触发时，如果有事件监听器，它将尝试处理该事件，然后事件冒泡到其父级元素，并发生同样的事情。最后直到事件到达祖先元素。事件冒泡是实现事件委托的原理（event delegation）。

#### “attribute” 和 “property” 之间有什么区别？

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

#### 为什么扩展 JavaScript 内置对象是不好的做法？

扩展 JavaScript 内置（原生）对象意味着将属性或方法添加到其`prototype`中。虽然听起来很不错，但事实上这样做很危险。想象一下，你的代码使用了一些库，它们通过添加相同的 contains 方法来扩展`Array.prototype`，如果这两个方法的行为不相同，那么这些实现将会相互覆盖，你的代码将不能正常运行。

扩展内置对象的唯一使用场景是创建 polyfill，本质上为老版本浏览器缺失的方法提供自己的实现，该方法是由 JavaScript 规范定义的。

#### document 中的`load`事件和`DOMContentLoaded`事件之间的区别是什么？

1. 当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

1. 当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。

#### 请解释单页应用是什么，如何使其对 SEO 友好。

单页面（SPA）应用是服务器端只返回一个html的web，使用客户端渲染，SPA 通过 JavaScript 来动态更新页面，这些 JavaScript 在初始页面加载时已经下载，有些爬虫程序并不会执行JS，所以不利于SEO，可以在服务器端渲染应用，首屏服务器端渲染还可以加快首屏响应速度，或者使用诸如 Prerender 的服务来“在浏览器中呈现的 javascript，保存静态 HTML，并将其返回给爬虫”。

#### polyfill

我们希望浏览器提供一些特性，但是没有，然后我们自己写一段代码来实现他，那这段代码就是补丁

#### 你使用什么语句遍历对象的属性和数组的元素？

数组用forEach, for of(可break, continue), 对象遍历key用for in，不过会遍历到遍历到它的继承属性，在使用之前，需要加入obj.hasOwnProperty(property)检查

for...of是ES6对于forEach的改善，for of只可以循环可迭代对象的可迭代属性，不可迭代属性在循环中被忽略了（优点1）；可以与break、continue和return配合使用。（优点2）

#### 什么是事件循环？调用堆栈和任务队列之间有什么区别？

事件循环是一个单线程循环，用于监视调用堆栈并检查是否有工作即将在任务队列中完成。如果调用堆栈为空并且任务队列中有回调函数，则将回调函数出队并推送到调用堆栈中执行。

#### 请解释`function foo() {}`和`var foo = function() {}`之间`foo`的用法上的区别。

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

#### 使用let、var和const创建变量有什么区别？

1. 用var声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数（函数作用域），也可以是声明在任何函数外的变量。let和const是块级作用域，意味着它们只能在最近的一组花括号（function、if-else 代码块或 for 循环中）中访问
1. var会使变量提升，这意味着变量可以在声明之前使用。let和const不会使变量提升，提前使用会报错。
1. 用var重复声明不会报错，但let和const会。
1. let和const的区别在于：let允许多次赋值，而const只允许一次。

#### 构造函数中使用箭头函数有什么好处？
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

#### 请给出一个解构（destructuring）对象或数组的例子。

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