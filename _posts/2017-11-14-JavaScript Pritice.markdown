---
layout:     post
title:      "JavaScrip Practice"
subtitle:   "code oj"
date:       2017-11-07 11:00:00
author:     "Run"
header-img: "img/jspractice/jspractice-bg.jpg"
tags:
    - JavaScript
---

## 1

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

## 2

数组随机排列

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

## 3