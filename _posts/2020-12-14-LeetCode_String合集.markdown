---
layout:     post
title:      "LeetCode String合集"
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

```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Input: digits = "2"
Output: ["a","b","c"]
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    debugger;
    let len = digits.length;
    if(len === 0) return [];
    let m = {
        2 : ['a','b','c'],
        3 : ['d','e','f'],
        4 : ['g','h','i'],
        5 : ['j','k','l'],
        6 : ['m','n','o'],
        7 : ['p','q','r','s'],
        8 : ['t','u','v'],
        9 : ['w','x','y','z']
    }
    let dp = new Array(len);
    //这里不能写成let dp = new Array(len).fill([]);
    dp[0] = m[digits[0]];
    for(let i=1; i<len; i++) {
        let current = m[digits[i]];
        dp[i] = [];
        for(let j=0; j<dp[i-1].length; j++) {
            for(let k=0; k<current.length; k++) {
                dp[i].push(dp[i-1][j] + current[k]);
            }
        }
    }
    return dp[len-1];
};
letterCombinations("234");
```
DP公式dp[i].push(dp[i-1][j] + current[k])

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

### 91. Decode Ways

<img src="http://lrun1124.github.io/img/leetcode/091.png" width="500"/>

```js
'A' -> 1
'B' -> 2
...
'Z' -> 26
Input: s = "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
Input: s = "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    debugger;
    let len = s.length,
        dp = new Array(len+1);
    if(len === 0 || s.charAt(0) === "0") return 0;
    dp[0] = 1;
    dp[1] = 1;
    for(let i=2; i<=len; i++) {
        let current = Number.parseInt(s.charAt(i-1)),
            before = Number.parseInt(s.charAt(i-2));
        if(current === 0) {
            if(before === 1 || before === 2) {
                 dp[i] = dp[i-2];
            } else {
                return 0;
            }
        } else {
            dp[i] = ((before === 0) || (before*10 + current) > 26) ? dp[i-1] : (dp[i-1] + dp[i-2]);
        }
    }
    return dp[len];
};
```
这道题虽然容易想到DP, 但是坑很多，要讨论各种情况。

### 93. Restore IP Addresses

<img src="http://lrun1124.github.io/img/leetcode/093.png" width="500"/>

```js
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    var res = [],
        len = s.length;
    const dfs = (sub, start) => {
        //console.log(sub);
        if(sub.length === 4 && start === len) { // 片段满4段，且耗尽所有字符
            res.push(sub.join('.'));
            return;
        }
        if(sub.length === 4 && start < len - 1) return; // 满4段，字符未耗尽，不用往下选了
        for(let i=1; i<=3; i++) {  // 枚举出选择，三种切割长度
            if(start+i > len) return; // 加上要切的长度就越界，不能切这个长度
            if(i!=1 && s[start] === '0') return; //大于两位，首位不能为0
            let current = s.substring(start, start + i); 
            if(i === 3 && +current > 255) return;  //不能大于255
            sub.push(current);
            dfs(sub, start + i);
            sub.pop();
        } 
    }
    dfs([],0);
    return res;
};
restoreIpAddresses("25525511135");
```
分隔的问题都可以用回溯解决，记住模板

### 32. Longest Valid Parentheses

<img src="http://lrun1124.github.io/img/leetcode/032.png" width="500"/>

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    debugger;
    var len = s.length,
        dp = [],
        res = 0;
    if(len === 0) return 0;
    dp[0] = 0;
    for(let i=1; i<len; i++) {
        if(s[i] === '(') { //如果当前为'(',不可能组成回文
            dp[i] = 0;
        } else {
            if(s[i-1] === '(') {
                dp[i] = i > 2 ? dp[i-2] + 2 : 2; //如果前一个是'(', 组成'()',加上再前面的dp[i-2]，难点1 ,这里可能过界
            } else {
                let left = i - dp[i-1] - 1; //如果前一个是')',就去找左边对应的位置，看能否匹配，")()())"为例，位置是5-4-1，这是难点2
                if(s[left] === ')' || left < 0) { //难点3，left可能过界要处理
                    dp[i] = 0;
                } else {
                    dp[i] =  dp[i-1] + 2 ;
                    dp[i] += left >= 1 ? dp[left-1] : 0; //难点4， 如果left能匹配，还要加上再前面可能有的回文串，难点5，left-1也可能过界
                }
            }
        }
        res = Math.max(dp[i], res);
    }
    return res;
};
longestValidParentheses("(()())")
```
dp[i] 表示以s[i]结尾的最长回文串的长度。这题难就难在各种细节的越界

### 13. Roman to Integer

<img src="http://lrun1124.github.io/img/leetcode/013.png" width="500"/>

```js
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

Input: s = "IX"
Output: 9

Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
Example 5:

Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let len = s.length;
    if(len === 0) return 0;
    let m = {
            I : 1,
            V : 5,
            X : 10,
            L : 50,
            C : 100,
            D : 500,
            M : 1000
        },
        res = 0;
    for(let i=0; i<len; i++) {
        let l = m[s[i]];
        let r = i+1 < len ? m[s[i+1]] : 0; //注意最后一个数i+1=len
        if(l < r) {
            res += r - l;
            i++;
        } else {
            res += l;
        }
    }
    return res;
};
romanToInt("LVIII")
```

检测当前和后一个数，如果前面的小，就后减前，跳两位，否则加上当前

### 12. Integer to Roman
<img src="http://lrun1124.github.io/img/leetcode/012.png" width="500"/>

```js
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
Input: num = 4
Output: "IV"

Input: num = 9
Output: "IX"

Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.

Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const m = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'],
          n = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    let res = '';
    for(let i=0; i<n.length && num>0; i++) { //从最大的开始，其中的每一个元素可能出现[0,3]次
        while(num >= n[i]) {  
            res += m[i];
            num -= n[i]; //每次减去插入的数，如果还有就继续减，直到这个数不能被使用了，换下一个
        }
    } 
    return res;
};
intToRoman(58);
```
击败99.7，贪心算法，罗马数字只有三总情况，要么是一个1000数字，'M',要么是9和4，用类似'CM'，要么重复1-3次，如'III'，所以我们可以列出编码组合，从最大到最小，结果逃脱不出这个组合，其中的每一个元素可能出现[0,3]次


### 72. Edit Distance

<img src="http://lrun1124.github.io/img/leetcode/072.png" width="500"/>

```js
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    debugger;
    let len1 = word1.length,
        len2 = word2.length,
        dp = [];
    for(let i=0; i<=len1; i++) { //dp[i][j] 代表 word1 到 i 位置转换成 word2 到 j 位置需要最少步数,为了初始化考虑加入'',所以len+1
        dp.push(new Array(len2+1));
    }
    for(let i=0; i<=len2; i++) { //第一行，是 word1 为空变成 word2 最少步数，就是插入操作
        dp[0][i] = i;
    }
    for(let i=0; i<=len1; i++) { //第一列，是 word2 为空，需要的最少步数，就是删除操作
        dp[i][0] = i;
    }
    for(let i=1; i<=len1; i++) {
        for(let j=1; j<=len2; j++) {
            if(word1[i-1] === word2[j-1]) { //这里容易错，容易写成word1[i] === word2[j]，这样就从第二个元素开始了
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1; //dp[i-1][j-1] 表示替换操作，dp[i-1][j] 表示删除操作，dp[i][j-1] 表示插入操作。
            }
        }
    }
    //console.log(dp);
    return dp[len1][len2];
};
minDistance("horse", "ros")
//minDistance("intention", "execution")
```
dp[i][j] 代表 word1 到 i 位置转换成 word2 到 j 位置需要最少步数

当 word1[i] == word2[j]，dp[i][j] = dp[i-1][j-1]；

当 word1[i] != word2[j]，dp[i][j] = min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1

其中，dp[i-1][j-1] 表示替换操作，dp[i-1][j] 表示删除操作，dp[i][j-1] 表示插入操作。

注意，针对第一行，第一列要单独考虑，引入前面的空"",

第一行，是 word1 为空变成 word2 最少步数，就是插入操作

第一列，是 word2 为空，需要的最少步数，就是删除操作

### 76. Minimum Window Substring

<img src="http://lrun1124.github.io/img/leetcode/076.png" width="500"/>

```js
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Input: s = "a", t = "a"
Output: "a"

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    debugger;
    let m = {},
        left = 0,
        right = 0,
        lenS = s.length,
        lenT = t.length,
        resLeft = lenS, //
        minLen = lenS, //最小匹配长单独，赋值lenS是为了应对返回""的情况
        missingType = 0; //缺失的字符种类数目，当降为0时，说明没有缺的了，需要左滑

    for(let i=0; i<lenT; i++) { //先把t里需要找的字符放到map里
        let tChar = t[i];
        if(m[tChar] === undefined) {
            m[tChar] = 1;
            missingType++;
        } else {
            m[tChar]++;
        }
    }
    while(right < s.length) {
        let rightChar = s[right];
        if(m[rightChar] !== undefined) {
            m[rightChar]--;
            if(m[rightChar] === 0) missingType--; //找到一个就减去一个需求
        }
        while(missingType === 0) { //当降为0时，说明没有缺的了，需要left滑动，直到开始出现缺口
            let leftChar = s[left];
            if(m[leftChar] !== undefined) { //不能直接用m[leftChar]，因为可能为0
                m[leftChar]++;
                if(m[leftChar] > 0) missingType++; //需求的字符补回来
            }
            if(right - left + 1 <= minLen) { //更新匹配小长度
                minLen = right - left + 1;
                resLeft = left;
            }
            left++;
        }
        right++; //每次右指针都滑动
    }
    return resLeft === lenS ? "" : s.substring(resLeft, resLeft + minLen);
};
minWindow("a","a");
minWindow("a","aa");
minWindow("ADOBECODEBANC","ABC");
```
滑动窗口，right右移找到满足条件的子串 -> left右移直到出现缺口 -> right找直到到找到满足条件的子串 -> ...

### 139. Word Break

<img src="http://lrun1124.github.io/img/leetcode/139.png" width="500"/>

```js
Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false

var wordBreak = function(s, wordDict) {
    //debugger;
    let len = s.length,
        set = new Set(wordDict),
        dp = new Array(len+1).fill(false);
    dp[0] = true;
    for(let i=1; i<=len; i++) {
        for(let j=0; j<i; j++) {
            if(dp[j] && set.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[len];
};
wordBreak("leetcode",  ["leet","code"]);
```

dp思想，判断dp[i], 从0-找一个分隔点j，满足dp[j] = true 并且substring(i, j)这段满足字典
