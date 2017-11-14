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