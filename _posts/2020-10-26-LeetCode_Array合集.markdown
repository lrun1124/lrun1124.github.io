---
layout:     post
title:      "LeetCode Array合集"
subtitle:   ""
date:       2020-10-26 10:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - LeetCode
---

### 001.Two Sum

<img src="http://lrun1124.github.io/img/leetcode/001.png" width="500"/>

```JS
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var m = new Map();
    for(let i = 0; i < nums.length; i++){
    	if(m.has(target - nums[i])){
    		return [m.get(target - nums[i]), i];
    	}
    	else{
    		m.set(nums[i], i);
    	}
    }
};
//test
console.log(twoSum([2,7,11,15],9));
```

### 011.Contain the most water

<img src="http://lrun1124.github.io/img/leetcode/011_1.png" width="500"/>
<img src="http://lrun1124.github.io/img/leetcode/011_2.png" width="500"/>

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    var res = 0,
        i = 0,
        j = height.length - 1;
    while(i < j) {
        let water = (j-i) * Math.min(height[i], height[j]);
        res = Math.max(res, water);
        if(height[i] < height[j]) {
            i++;
        } else {
            j--;
        }
    }
    return res;
};
//console.log(maxArea([1,8,6,2,5,4,8,3,7]));
//console.log(maxArea([1,2,4,3]));
```

两个指针数组开始和结尾，每次计算面积，记录最大的，哪边是短板就从哪边开始滑动

