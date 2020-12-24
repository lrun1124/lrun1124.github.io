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

```js
Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    //debugger;
    let len = s.length,
        dp = [],
        res = 0;
    for(let i=0; i<len; i++) {
        dp.push(new Array(len));
    }
    for(let i=0; i<len; i++) {
        dp[i][i] = true;
        res++;
    }
    for(let j=1; j<len; j++) {
        for(let i=0; i<j; i++) {
            if(s.charAt(i) === s.charAt(j) && ((j-i<=2)|| dp[i+1][j-1])) {
                dp[i][j] = true;
                res++;
            } else {
                dp[i][j] = false;
            }
        }
    }
    return res;
};
countSubstrings("abc")
```
dp[i][j]表示i到j是否是回文串

### 6. ZigZag Conversion

<img src="http://lrun1124.github.io/img/leetcode/049.png" width="500"/>

```js

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

P   A   H   N  
A P L S I I G
Y   I   R
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"

P     I    N  
A   L S  I G
Y A   H R
P     I

P     H  
A   S I
Y  I  R
P L   I G
A     N
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    debugger;
    let len = s.length,
        arr = [],
        col = 0,
        flag = true,
        res = "";
    if(numRows === 1) return s;
    for(let i=0; i<numRows; i++) {
        arr.push(new Array());
    }
    for(let i=0; i<len; i++) {
        arr[col].push(s.charAt(i));
        if(flag) { //向下
            if(col === numRows-1) {
                col = numRows-2;
                flag = numRows > 2 ? false : true; //注意这里如果numRows<2, 就完全没有向上的部分
            } else {
                col++;
            }
        } else { //向上
            if(col === 1) {
                col = 0;
                flag = true;
            } else {
                col--;
            }
        }
    }
    for(let i=0; i<numRows; i++) {
        for(let j=0; j<arr[i].length; j++) {
            res += arr[i][j];
        }
    }
    return res;
};
convert("ABCD",2)
```
建立一个二维数组arr，flag来控制向下还是向上，遍历数组向arr里push

### 10. Regular Expression Matching

<img src="http://lrun1124.github.io/img/leetcode/010.png" width="500"/>

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    //debugger;
    let dp = [],
        sLen = s.length,
        pLen = p.length;
    for(let i=0; i<=sLen; i++) {
        dp.push(new Array(p.length+1).fill(false));
    }
    dp[0][0] = true;
    for(let j=1; j<=pLen; j++) {
        if(p.charAt(j-1) === "*") {
             dp[0][j] = dp[0][j-2];
        }
    }
    for(let i=0; i<=sLen; i++) {
        for(let j=0; j<=pLen; j++) {
            if(p.charAt(j-1) === s.charAt(i-1) || p.charAt(j-1) === ".") dp[i][j] = dp[i-1][j-1];
            else if (p.charAt(j-1) === "*") {
                if(p.charAt(j-2) === s.charAt(i-1) || p.charAt(j-2) === ".") {
                    dp[i][j] = dp[i-1][j] || dp[i][j-1] || dp[i][j-2];
                } else {
                    dp[i][j] = dp[i][j-2];
                }
            }
        }
    }
    //console.log(dp);
    return dp[sLen][pLen];
};
//isMatch("aa", "a*")
// isMatch("ab", ".*")
isMatch("aab", "c*a*b")
//isMatch("mississippi", "mis*is*p*.")
```

DP思想 dp[i][j] 表示前i个数能否匹配前j个pattern, 也就是从[0,i-1]的子串能否匹配[0,j-1]的pattern，
因为第一行代表了空串去匹配，第一列代表了匹配空的pattern，所以我们需要一个大小为s.length+1和p.length+1的dp数组

当我们要确定dp[i][j]的时候
如果 p.charAt(j-1) == s.charAt(i-1) : dp[i][j] = dp[i-1][j-1]；//因为p，s是从0开始的
如果 p.charAt(j-1) == '.' : dp[i][j] = dp[i-1][j-1]；
如果 p.charAt(j-1) == '*'：
如果 p.charAt(j-2) != s.charAt(i-1) : dp[i][j] = dp[i][j-2] //in this case, a* only counts as empty
如果 p.charAt(i-2) == s.charAt(i-1) or p.charAt(i-2) == '.'：
dp[i][j] = dp[i-1][j] //in this case, a* counts as multiple a    xxxaa xxxa*
or dp[i][j] = dp[i][j-1] // in this case, a* counts as single a  xxxa xxxa*
or dp[i][j] = dp[i][j-2] // in this case, a* counts as empty     xxx xxxa*


### 28. Implement strStr()

<img src="http://lrun1124.github.io/img/leetcode/028.png" width="500"/>

```js
Input: haystack = "hello", needle = "ll"  "lall"
Output: 2
Input: haystack = "aaaaa", needle = "bba"
Output: -1
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    debugger;
    let hLen = haystack.length,
        nLen = needle.length;
    if(nLen === 0) return 0;
    for(let i=0; i<=hLen - nLen; i++) {
        //if(haystack.charAt(i) !== needle.charAt(0)) continue; //首字母不匹配跳过 不需要这一句，效率提高50%
        for(let j=0; j<nLen; j++) {
            if(haystack.charAt(i+j) !== needle.charAt(j)) break; //不匹配直接退出
            if(j === nLen-1) return i; //搜索到末尾还没退出就证明匹配
        }
    }
    return -1; //上面没返回就证明没匹配
};
```
击败99%，再优化用kmp

### 43. Multiply Strings
<img src="http://lrun1124.github.io/img/leetcode/043.png" width="500"/>

```js
Input: num1 = "2", num2 = "3"
Output: "6"
Input: num1 = "123", num2 = "456"
Output: "56088"
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    debugger;
    let num1Len = num1.length,
        num2Len = num2.length, 
        arr = new Array(num1Len + num2Len).fill(0), //两个数相乘，长度只可能为两数长度之和或之和-1
        res = '';
    for(let i=num1Len-1; i>=0; i--) {
        for(let j=num2Len-1; j>=0; j--) {
            let mul = Number.parseInt(num1.charAt(i)) *  Number.parseInt(num2.charAt(j));
            let sum = mul + arr[i+j+1];
            arr[i+j+1] = sum % 10;
            arr[i+j] += Math.floor(sum/10); //这里不需要处理超过10的情况是因为，我们是从最低位开始加的，如果超过了10，下一次也会进位上去
        }
    }
    //console.log(arr);
    let start = 0;
    while(!arr[start] && start < arr.length) start++; //找到第一个非零的位置
    for(let i=start; i<arr.length; i++) { //因为数组的大小，末尾肯定是个位，必须要处理末尾
        res += arr[i];
    } 
    return res === "" ? "0" : res; //注意"0", "0"这种特殊情况，这种情况下arr是[0,0]
};
multiply("0", "0")
//multiply("123", "456")
```

模拟竖式乘法，关键点num1[i] 和 num2[j] 的乘积对应的就是 res[i+j] 和 res[i+j+1] 这两个位置。

### 14. Longest Common Prefix
<img src="http://lrun1124.github.io/img/leetcode/014.png" width="500"/>

```js
Input: strs = ["flower","flow","flight"]
Output: "fl"
Input: strs = ["dog","racecar","car"]
Output: ""
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let len = strs.length,
        idx = 0,
        res = "",
        match = true; //是否要继续匹配
    if(len === 0) return "";
    while(match){
        if(idx >= strs[0].length) break; //如果超出范围直接break
        let current = strs[0].charAt(idx);
        for(let i=1; i<len; i++) {
            if(idx >= strs[i].length || strs[i].charAt(idx) !== current) { //超出范围或者不匹配
                match = false;
                break; //注意这里只能break内部的
            }
        }
        if(match) {
            res += current;
        }
        idx++;
    }
    return res;
};
longestCommonPrefix(["flower","flow","flight"]);
```

过界或者不匹配就停止

### 20. Valid Parentheses

<img src="http://lrun1124.github.io/img/leetcode/020.png" width="500"/>

```js
Input: s = "()[]{}"
Output: true
Input: s = "(]"
Output: false
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    debugger;
    var stack = [];
    for(let i=0; i<s.length; i++) {
        let current = s.charAt(i);
        if(current === "(" || current === "[" || current === "{") {
            stack.push(current);
        } else {
            let last = stack.pop();
            if((last === "(" && current === ")")||
            (last === "[" && current === "]")||
            (last === "{" && current === "}")) {
                continue;
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
};
```

用一个stack，左括号每次进展，每次pop和右括号匹配，最后判断栈是否为空

### 67. Add Binary
<img src="http://lrun1124.github.io/img/leetcode/067.png" width="500"/>


```js
Input: a = "11", b = "1"
Output: "100"
Input: a = "1010", b = "1011"
Output: "10101"
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    debugger;
    var res = "";
        aLen = a.length,
        bLen = b.length,
        plus = 0; //进位
    //先补齐0
    if(aLen>bLen) {
        for(let i=0; i<aLen-bLen; i++) {
            b = '0' + b;
        }
    }
    if(aLen<bLen) {
        for(let i=0; i<bLen-aLen; i++) {
            a = '0' + a;
        }
    }
    let m=n=a.length-1;
    while(m>=0 && n>=0) {
        let sum = Number.parseInt(a.charAt(m)) + Number.parseInt(b.charAt(n)) + plus;
        if(sum >= 2) plus = 1;
        else plus = 0;
        res = sum%2 + res;
        m--;
        n--;
    }
    return plus === 1 ? ("1" + res) : res; //别忘最后可能进上去的一位
};
addBinary("11", "1")
```

先补0再从末尾加


