---
layout:     post
title:      "LeetCode Other合集"
subtitle:   ""
date:       2021-01-18 10:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - LeetCode
---

### 46. Permutations

<img src="http://lrun1124.github.io/img/leetcode/046.png" width="500"/>

```js
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
[
    [[1]],
    [[1,2][2,1]],
    [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    //debugger;
    let len = nums.length,
        dp = new Array(nums.length);
    if(len === 0) return [];
    for(let i=0; i<len; i++) {
        dp[i] = new Array();
    }
    dp[0].push([nums[0]]);
    for(let i=1; i<len; i++) {
        let pre = dp[i-1];
        for(let j=0; j<pre.length; j++) {
            let cur = pre[j];
            for(let k=0; k<cur.length+1; k++) {
                let tmp = cur.slice();
                tmp.splice(k, 0, nums[i]);
                dp[i].push(tmp);
            }
        }
    }
    //console.log(dp);
    return dp[len-1];
};
permute([1,2,3]);
```

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

### 146. LRU Cache

<img src="http://lrun1124.github.io/img/leetcode/146.png" width="500"/>

```js

//双向链表 + hash， 四个辅助函数
//1. removeFromList(node) 从双向链表中删除节点
//2. removeTail() 超出capacity时，从结尾删除节点
//3. addToHead(node) 将节点插入到头部
//4. moveToHead(node) 先removeFromList再 addToHead
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.val = value;
        this.pre = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.hash = {};
        this.count = 0;
        this.dummyHead = new ListNode();
        this.dummyTail = new ListNode();
        this.dummyHead.next = this.dummyTail;
        this.dummyTail.pre = this.dummyHead;
    }

    get(key) {
        let node = this.hash[key];
        if(node === undefined) return -1;
        this.moveToHead(node);
        return node.val;
    }

    put(key, value) {
        //debugger;
        let node = this.hash[key];
        if(node === undefined) {
            if(this.count === this.capacity) {
                this.removeTail();
            }
            let newNode = new ListNode(key, value);
            this.hash[key] = newNode;
            this.addToHead(newNode);
            this.count++;
        } else {
            node.val = value;
            this.moveToHead(node);
        }
    }

    moveToHead(node) {
        this.removeFromList(node);
        this.addToHead(node);
    }

    addToHead(node) {
        let tmp = this.dummyHead.next;
        node.pre = this.dummyHead;
        this.dummyHead.next = node;
        node.next = tmp;
        tmp.pre = node;
        //this.count++;不能写在这里，moveToHead会调用
    }

    removeFromList(node) {
        let tmp1 = node.pre;
        let tmp2 = node.next;
        tmp1.next = tmp2;
        tmp2.pre = tmp1;
    }

    removeTail() {
        debugger;
        let node = this.dummyTail.pre;
        this.removeFromList(node);
        delete this.hash[node.key];
        this.count--;
    }
};

// ["LRUCache","put","put","get","put","get","put","get","get","get"]
// [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
var LRU = new LRUCache(2);
LRU.put(1,1);
LRU.put(2,2);
LRU.get(1);
LRU.put(3,3);
LRU.get(2);
LRU.put(4,4);
LRU.get(1);
LRU.get(3);
LRU.get(4);

```
