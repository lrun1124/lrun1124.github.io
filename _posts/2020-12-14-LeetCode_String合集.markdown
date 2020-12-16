---
layout:     post
title:      "LeetCode Array合集"
subtitle:   ""
date:       2020-11-14 10:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - LeetCode
---

### 3. Longest Substring Without Repeating Characters

<img src="http://lrun1124.github.io/img/leetcode/003.png" width="500"/>

```js
Input: s = "abcabcbb"  "bacabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let len = s.length,
        res = 0,
        left = 0,
        right = 0,
        hash = {};
    while(right < len) {
        let rightChar = s.charAt(right);
        if(hash[rightChar] !== undefined) {
            //左移left指针到前一次重复的位置，注意边界，后面会替换掉重复char的index
            for(let i=left; i<hash[rightChar]; i++) {
               delete hash[s.charAt(i)];
            }
            //更新left到下一个开始
            left = hash[rightChar] + 1;
        }
        //用一个hash记录当前已有的值，顺便在hash里记录每个元素的index
        //这里两种情况，如果hash里没有rightChar那么设置进新的index，否则也是要覆盖原有的index，合并为一句
        hash[rightChar] = right;
        res = Math.max(res, right - left + 1);
        //每次right都右移
        right++;
    }
    return res;
};
lengthOfLongestSubstring("bbbbb");
lengthOfLongestSubstring("abcabcbb");
```
滑动窗口，用一个hash记录当前已有的值，顺便在hash里记录每个元素的index，根据right的值，移动left

### 5. Longest Palindromic Substring

<img src="http://lrun1124.github.io/img/leetcode/005.png" width="500"/>

```js
Input: s = "babad"
Output: "bab"
Input: s = "cbbd"
Output: "bb"
Note: "aba" is also a valid answer.
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let len = s.length;
    if(len === 0) return '';
    let dp = [],
        maxLength = 1,
        left = 0,
        right = 0;
    for(let i=0; i<len; i++) {
        dp.push(new Array(len));
    }
    for(let i=0; i<len; i++) {
        dp[i][i] = true;
    }
    for(let j=1; j<len; j++) {
        for(let i=0; i<j; i++) {
            //如果相同，中间只有一个或没有数，肯定是回文，否则参考dp[i+1][j-1]
            if(s.charAt(i) == s.charAt(j) && ((j-i <= 2) || dp[i+1][j-1])) {
                dp[i][j] = true;
                //记录新的最大长度和新的左右标记
                if((j-i+1) > maxLength) {
                    maxLength = j-i+1;
                    left = i;
                    right = j;
                }
            } else {
                dp[i][j] = false;
            }
        }
    }
    //console.log(dp);
    return s.substring(left,right+1);
}
longestPalindrome("babad")
```
动态规划，dp[i][j]表示从i到j是否是回文串，注意填表顺序要竖着填，因为我们要根据dp[i+1][j-1]的值生产，在表中的偏左偏下一格的位置，比如我们填[0,5]的时候，实际要从[1,4]去取，所以上一次循环要保证[1,4有值]，[1,4]要去[2,3]取，到了[2,3]就根据(j-i <= 2) 这个条件来判断了

<img src="http://lrun1124.github.io/img/leetcode/005-1.png" width="500"/>

### 17. Letter Combinations of a Phone Number

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

```
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    
};
```

### 22. Generate Parentheses

<img src="http://lrun1124.github.io/img/leetcode/022.png" width="500"/>

```js
Input: n = 1
Output: ["()"]
Input: n = 2   
Output: ["(())","()()"]
Input: n = 3   
Output: ["((()))","(()())","(())()","()(())","()()()"]
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    //debugger;
    let dp = [];
    for(let i=0; i<=n; i++) {
        dp.push(new Array());
    }
    dp[0] = [""];
    dp[1] = ["()"];
    for(let i=2; i<=n; i++) {
        for(let j=0; j<i; j++) {
            for(let left=0; left<dp[j].length; left++) {
                for(let right=0; right<dp[i-j-1].length; right++) {
                    dp[i].push(`(${dp[j][left]})${dp[i-j-1][right]}`); //这里j+(i-j-1) = i-1这样确定右边的index
                }
            }
        }
    }
    return dp[n];
};
generateParenthesis(2);
```
动态规划，因为左边一定是左括号，所以可以分成这几部分dp[i] = ( + dp[p] + ) + dp[q], 满足p+q=i-1，比如dp[2] = ( + dp[0] + ) + dp[1]和( + dp[1] + ) + dp[0]这两部分，所以我们需要4层循环

### 49. Group Anagrams

<img src="http://lrun1124.github.io/img/leetcode/049.png" width="500"/>

```js
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let myStrs = [],
        res = [],
        myHash = {};
    //先排序
    for(let i=0; i<len; i++) {
        myStrs.push(mySort(strs[i]));
    }
    //用hash记录
    for(let i=0; i<len; i++) {
        if(myHash[myStrs[i]]) {
            myHash[myStrs[i]].push(strs[i]);
        } else {
            myHash[myStrs[i]] = [strs[i]];
        }
    }
    //hash转为Array
    for(key in myHash) {
        res.push(myHash[key]);
    }
    return res;
};

//排序
var mySort = (str) => {
    let arr = [],
        res = "";
    for(let i=0; i<str.length; i++) {
        arr.push(str.charAt(i));
    }
    arr.sort();
    for(let i=0; i<str.length; i++) {
        res += arr[i];
    }
    return res;
}
groupAnagrams(["eat","tea","tan","ate","nat","bat"]);
```
先排序再用hash记录，根据排序后新数组和原数组下标一致的特点push进对应的key里
实际可以再一遍遍历中完成, 写法也可以更加简便
```js
//更简单的排序写法，实际可以再一遍遍历中完成
var groupAnagrams = function(strs) {
    let myStrs = [],
        res = [],
        m = new Map();
    for(let i=0; i<strs.length; i++) {
        //字符串排序的简便写法
        let sortStr = strs[i].split('').sort().join('');
        if(m.has(sortStr)) {
            m.get(sortStr).push(strs[i]);
        } else {
            m.set(sortStr, [strs[i]]);
        }
    }
    //hash写入数组的渐变写法
    return Array.from(m.values());
}
groupAnagrams(["eat","tea","tan","ate","nat","bat"]);
```

### 647. Palindromic Substrings

<img src="http://lrun1124.github.io/img/leetcode/049.png" width="500"/>

```
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    
};
```


