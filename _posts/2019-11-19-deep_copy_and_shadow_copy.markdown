---
layout:     post
title:      "deep copy & shadow copy"
subtitle:   ""
date:       2019-11-19 12:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - Summary
---

## summary

浅拷贝和深拷贝都只针对于引用数据类型，浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存；但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象；

## shadow copy
```js
function shadowCopy(source) {
    var res = {};
    for(key in source) {
        if(source.hasOwnProperty(key)) {
            res[key] = source[key];
        }
    }
    return res;
}
```

实例

1. Array.prototype.slice(target)
1. Array.prototype.concat(value1[, value2[, ...[, valueN]]])
1. Object.assign(target,source)
1. ...扩展运算符

## deep copy
### JSON.parse(JSON.stringify())
1. 拷贝的对象的值中如果有函数,undefined,symbol则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失
1. 无法拷贝不可枚举的属性，无法拷贝对象的原型链
1. 拷贝Date引用类型会变成字符串
1. 拷贝RegExp引用类型会变成空对象
1. 对象中含有NaN、Infinity和-Infinity，则序列化的结果会变成null
1. 无法拷贝对象的循环引用

### 自己实现
```js
function isObject(source) {
    Object.prototype.toString.call(source) === '[object Object]';
}

//递归
function deepCopy(source) {
    if(!isObject(source)) return source;
    var target = Array.isArray(source) ? [] : {};
    for(key in source) {
        //循环引用处理, 出现obj.x = obj则跳过
        debugger;
        if(source[key] === source) {
            continue;
        }
        if(source.hasOwnProperty(key)) {
            if(isObject(source[key])){
                target = deepCopy(source[key]);
            } else {
                target = source[key];
            }
        }
    }
    return target;
}

//test
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = deepCopy(obj1)
obj2.b.f.g = 'changed';
console.log(obj1, obj2);

//test循环引用
var obj1 = {};
obj1.a = obj1;
var obj2 = deepCopy(obj1)
console.log(obj1, obj2);

```
测试以上代码循环引用结果
事实上，就算没有循环引用处理，chrome也做了优化，并不会无限递归
<img src="http://127.0.0.1:4000/lrun1124.github.io/img/copy/cycle.png" width = "500px"/>
测试Date对象结果
<img src="http://127.0.0.1:4000/lrun1124.github.io/img/copy/date.png" width = "600px"/>
测试RegExp对象结果
<img src="http://127.0.0.1:4000/lrun1124.github.io/img/copy/reg.png" width = "600px"/>


### lodash
```js
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);
```