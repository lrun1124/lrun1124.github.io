---
layout:     post
title:      "Security Summary"
subtitle:   ""
date:       2019-10-08 12:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - Summary
---

> “Move on. ”
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [安全](#%E5%AE%89%E5%85%A8)
  - [Web安全及防护原理, sql注入, XSS, CSRF](#web%E5%AE%89%E5%85%A8%E5%8F%8A%E9%98%B2%E6%8A%A4%E5%8E%9F%E7%90%86-sql%E6%B3%A8%E5%85%A5-xss-csrf)
    - [SQL注入](#sql%E6%B3%A8%E5%85%A5)
    - [XSS(cross-site scripting)](#xsscross-site-scripting)
    - [CSRF（Cross-site request forgery），跨站请求伪造](#csrfcross-site-request-forgery%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
    - [Input_Path_Not_Canonicalized](#input_path_not_canonicalized)
    - [Absolute_Path_Traversal](#absolute_path_traversal)
    - [SSRF](#ssrf)
  - [对称/非对称加密，公钥和私钥](#%E5%AF%B9%E7%A7%B0%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E5%85%AC%E9%92%A5%E5%92%8C%E7%A7%81%E9%92%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安全
### Web安全及防护原理, sql注入, XSS, CSRF

#### SQL注入

通过把SQL插入Web表单欺骗服务器执行恶意SQL, SQL 注入漏洞属于后端的范畴，但前端也可做体验上的优化

1. 不要相信用户输入，利用正则等方式对输入的合法性进行判断，格式，长度，特殊字符等。
1. 不要使用动态拼装SQL，使用参数化的SQL或存储过程进行数据库操作
1. 不要使用管理员权限连接数据库，应为每个应用分配单独的权限有限的数据库连接
1. 不要明文存放敏感信息，加密或Hash

#### XSS(cross-site scripting)

攻击者向Web页面中恶意插入html标签或Js代码，比如攻击者在页面中插入一个看似安全的链接，用户点击后窃取cookie和用户输入信息；或者攻击者在论坛中加一个恶意表单，当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。

- 存储区：恶意代码存放的位置。
- 插入点：由谁取得恶意代码，并插入到网页上。

<img src="http://lrun1124.github.io/img/summary/xss_type.png"/>

 * 存储型 XSS

1. 攻击者将恶意代码提交到目标网站的数据库中。
1. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
1. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
1. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

* 反射型 XSS

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
1. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
1. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
1. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。
反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见。

* DOM 型 XSS

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
1. 用户打开带有恶意代码的 URL。
1. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
1. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

策略:

1. 用户输入合法性检测， 内容长度控制等
1. 避免拼接 HTML。前端采用拼接 HTML 的方法比较危险，如果框架允许，使用 createElement、setAttribute 之类的方法实现。或者采用比较成熟的渲染框架，如 Vue/React 等。
1. 利用模板引擎转义。 如果拼接 HTML 是必要的，就需要采用合适的转义库，对 HTML 模板各处插入点进行充分的转义。比如Java，常用的转义库为 org.owasp.encoder，JS使用doT.js、ejs、FreeMarker
1. HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，验证码：防止脚本冒充用户提交危险操作
1. 使用XSS扫描工具，checkmarx等

#### CSRF（Cross-site request forgery），跨站请求伪造

攻击者盗用了你的身份，以你的名义发送恶意请求。CSRF能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账...造成的问题包括：个人隐私泄露以及财产安全

要完成一次CSRF攻击，受害者必须依次完成两个步骤：<br/>
1. 登录受信任网站A，并在本地生成Cookie。
2. 在不登出A的情况下，访问危险网站B。

流程：
1. 受害者登录 a.com，并保留了登录凭证（Cookie）
1. 攻击者引诱受害者访问了 b.com
1. b.com 向 a.com 发送了一个请求：a.com/act=xx（浏览器会默认携带 a.com 的 Cookie）
1. a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
1. a.com 以受害者的名义执行了 act=xx
1. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作

防御：
1. CSRF自动防御策略：同源检测（Origin 和 Referer 验证）。
1. CSRF主动防御措施：Token验证 或者 双重Cookie验证 以及配合Samesite Cookie。
1. 保证页面的幂等性，后端接口不要在GET页面中做用户操作。

#### Input_Path_Not_Canonicalized
#### Absolute_Path_Traversal
Absolute_Path_Traversal : When the web server returns information about errors in a web application, it is much easier for the attacker to guess the correct locations.

The following URLs may be vulnerable to this attack:
```
http://testsite.com/get.asp?f=test
```

An attacker can execute this attack like this:
```
http://testsite.com/get.asp?f=/etc/passwd
```
#### SSRF

### 对称/非对称加密，公钥和私钥
基本概念:

1. 对称加密, 最快速、最简单的一种加密方式，加密（encryption）与解密（decryption）用的是同样的密钥（secret key）。
1. 非对称加密， 非对称加密为数据的加密与解密提供了一个非常安全的方法，它使用了一对密钥，公钥（public key）和私钥（private key）
1. 密钥对，在非对称加密技术中，有两种密钥，分为私钥和公钥，私钥是密钥对所有者持有，不可公布，公钥是密钥对持有者公布给他人的。
1. 摘要，对需要传输的文本，做一个HASH计算，一般采用SHA1，SHA2来获得。
1. 签名，使用私钥对需要传输的文本的摘要进行加密，得到的密文即被称为该次传输过程的签名。
1. 签名验证，数据接收端，拿到传输文本，但是需要确认该文本是否就是发送发出的内容，中途是否曾经被篡改。因此拿自己持有的公钥对签名进行解密（密钥对中的一种密钥加密的数据必定能使用另一种密钥解密。），得到了文本的摘要，然后使用与发送方同样的HASH算法计算摘要值，再与解密得到的摘要做对比，发现二者完全一致，则说明文本没有被篡改过。
1. 证书中心（certificate authority，简称CA), CA用自己的私钥，对发送者公钥和一些相关信息一起加密，生成"数字证书"（Digital Certificate），发送时连同签名一起发送

对称加密加密与解密使用的是同样的密钥，所以速度快，但由于需要将密钥在网络传输，所以安全性不高。而非对称加密使用了一对密钥，公钥与私钥，所以安全性高，但加密与解密速度慢。解决的办法是将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双方可以使用对称加密来进行沟通。

以Alice和银行之间的通信为例，这同时也是https协议的简略过程：

1. Alice向Bank请求公钥
1. Bank网站从中选出一组加密算法与HASH算法，并将自己的身份信息以证书的形式发回给Alice的浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息
1. Alice的浏览器获得证书后验证合法性，客户端（浏览器）的"证书管理器"，有"受信任的根证书颁发机构"列表，客户端会根据这张列表，查看解开数字证书的公钥是否在列表之内。
1. 若证书合法，浏览器会生成一串随机数的密码，并用证书中提供的公钥加密，这就是对称加密的秘钥。接下来会进行握手验证，使用约定好的HASH算法加密一段握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的对称加密的秘钥（使用公钥加密过的）+ 加密的握手消息发送给Bank。 若不合法则发出警告。
1. Bank使用私钥解密得到对称秘钥，使用秘钥解密浏览器发来的握手消息，并验证HASH是否与浏览器发来的一致。 然后使用密码加密一段握手消息，发送给浏览器。 
1. 浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束，Alice和Bank使用对称秘钥互相传输数据。

<img src="http://lrun1124.github.io/img/jsbase4/Alice&Bank.png"/>

HTTPS一般使用的加密与HASH算法如下：

非对称加密算法：RSA，DSA/DSS

对称加密算法：AES，RC4，3DES 

HASH算法：MD5，SHA1，SHA256



