---
layout:     post
title:      "LeetCode Bit合集"
subtitle:   ""
date:       2021-01-06 10:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - LeetCode
---

### 136. Single Number

```
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

Input: nums = [2,2,1]
Output: 1

Input: nums = [4,1,2,1,2]
Output: 4
```

解法一：相同的数异或为0，任何数异或0为自身，最后剩下就是重复的，beat 92%

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = 0; //任何数和0异或为自身
    for(let i=0; i<nums.length; i++) {
        res ^= nums[i]
    }
    return res;
};
singleNumber([4,1,2,1,2]);
```

解法二：用set，每次碰到已经有的就删了，没有就放进去，剩下就是结果，beat 62%

```js
var singleNumber = function(nums) {
    let s = new Set();
    for(let i=0; i<nums.length; i++) {
        if(s.has(nums[i])) s.delete(nums[i]);
        else s.add(nums[i]);
    }
    for(let res of s) {
        return res;
    }
};
singleNumber([4,1,2,1,2]);
```

### 338. Counting Bits

```
Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

Input: 2
Output: [0,1,1]

Input: 5
Output: [0,1,1,2,1,2]
```

```
DP，分奇偶，注意判断奇偶用位运算

奇数：二进制表示中，奇数一定比前面那个偶数多一个 1，因为多的就是最低位的 1。 
           0 = 0        1 = 1
           2 = 10       3 = 11

偶数：二进制表示中，偶数中 1 的个数一定和除以 2 之后的那个数一样多。因为最低位是 0，除以 2 就是右移一位，也就是把那个 0 抹掉而已，所以 1 的个数是不变的。
           2 = 10       4 = 100       8 = 1000
           3 = 11       6 = 110       12 = 1100
```

```js
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
    let dp = new Array(num+1);
    dp[0] = 0;
    for(let i=1; i<=num; i++) {
        //if(i%2 === 1) { //速度慢16%
        if(i&1 === 1) { //用位运算判断奇偶，94.8%
            dp[i] = dp[i-1] + 1;
        } else {
            dp[i] = dp[i/2];
        }
    }
    return dp;
};
countBits(5);
```

### 461. Hamming Distance

```
The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers x and y, calculate the Hamming distance.

Input: x = 1, y = 4

Output: 2

Explanation:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
```

这是布赖恩·克尼根位计数算法的基本思想。当我们在 number 和 number-1 上做 AND 位运算时，原数字 number 的最右边等于 1 的比特会被移除,直到1全部被移除，数字为0，该算法使用特定比特位和算术运算移除等于 1 的最右比特位。
比如111 & 110 = 110, 100 & 011 = 000

```js
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    var val = x ^ y, //异或后相同位的数字变成0，统计1的个数就行
        res = 0;
    while(val) { //布赖恩·克尼根位计数算法
        val = val & (val - 1)
        res++;
    }
    return res;
};
hammingDistance(1,4)
```

