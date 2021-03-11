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

### 146. LRU Cache

```
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

1. LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
2. int get(int key) Return the value of the key if the key exists, otherwise return -1.
3. void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
```

双向链表 + hash，双向链表是用来在O(1)时间删除和插入的，hash是用来在O(1)时间查找值的, 四个辅助函数

```
1. removeFromList(node) 从双向链表中删除节点
2. removeTail() 超出capacity时，从结尾删除节点
3. addToHead(node) 将节点插入到头部
4. moveToHead(node) 先removeFromList再 addToHead
```

```js
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

### 155. Min Stack

```
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.
```

两个栈，一个每次push进x，一个每次push进 Math.min(x,栈顶最小值)

```js
class MinStack {
    constructor () {
        this.stack = [];
        this.minStack = [Infinity];
    }

    push(x) {
        this.stack.push(x);
        this.minStack.push(Math.min(x, this.minStack[this.minStack.length-1]));
    }

    pop() {
        this.stack.pop();
        this.minStack.pop();
    }

    top() {
        return this.stack[this.stack.length-1];
    }

    getMin() {
        return this.minStack[this.minStack.length-1]
    }
}
```

### 208. Implement Trie (Prefix Tree)
```
Trie (we pronounce "try") or prefix tree is a tree data structure used to retrieve a key in a strings dataset. There are various applications of this very efficient data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() initializes the trie object.
void insert(String word) inserts the string word to the trie.
boolean search(String word) returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
```

Tried树用于，单词补全，拼写检查，ip路由，还有其他的数据结构，如平衡树和哈希表，使我们能够在字符串数据集中搜索单词。为什么我们还需要 Trie 树呢？尽管哈希表可以在 O(1)时间内寻找键值，却无法高效的完成以下操作

1. 找到具有同一前缀的全部键值。
1. 按词典序枚举字符串的数据集。

Trie 树优于哈希表的另一个理由是，随着哈希表大小增加，会出现大量的冲突，时间复杂度可能增加到 O(n)，其中 n 是插入的键的数量。与哈希表相比，Trie 树在存储多个具有相同前缀的键时可以使用较少的空间。此时 Trie 树只需要 O(m)的时间复杂度，其中 m 为键长。而在平衡树中查找键值需要 O(mlogn) 时间复杂度。

实现： 每一个Node节点上都有一个next对象，key为字符，val指向下一个Node
```js
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true

class TrieNode {
    constructor() {
        this.isEnd = false;
        this.next = {};
    }
}
class Trie {
    constructor () {
      this.root = new TrieNode();
    }
    insert(word) {
        let node = this.root;
        for(let c of word) {
            if(node.next[c] === undefined) node.next[c] = new TrieNode();
            node = node.next[c];
        }
        node.isEnd = true;
    }
    search(word) {
        let node = this.root;
        for(let c of word) {
            if(node.next[c] === undefined) return false;
            node = node.next[c];
        }
        return node.isEnd;
    }
    startsWith(word) {
        let node = this.root;
        for(let c of word) {
            if(node.next[c] === undefined) return false;
            node = node.next[c];
        }
        return true; //跟search比，只是不用是end了
    }
}
```

### 621. Task Scheduler

```
Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B

Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
```

找出最多数量maxCount的任务，每一个建立一个size为n+1的桶，这时候有两种情况：

1. 其他任务全部能填进去，那么总时间就为: 每个桶的长度(n+1) * 桶的数量(maxCount-1) + 1  + 同样有最大数量的其他任务数(maxType-1)
1. 其他任务不能完全填进去，那么可以增长桶的长度，这时无论插入多少任务，因为桶的长度可以无限增加，所以总是能填的进去，这些多的任务足以填充所有空值的位子，相当于其他任务够多，让maxCount的任务有足够时间间隔，所以最终结果就等于task的数量

如果有idle时间的，情况1肯定大于等于情况2，如果不需要idle时间，情况1肯定小于等于情况2，所以取最大值


```js
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    debugger;
    let maxCount = 0, //最多数量的任务数
        map = {},
        len = tasks.length,
        maxType = 0; //最多数量的任务的种类
    for(let i=0; i<len; i++) {
        if(map[tasks[i]] !== undefined) {
            map[tasks[i]]++;
        } else {
            map[tasks[i]] = 1;
        }
        maxCount = Math.max(map[tasks[i]], maxCount);
    }
    for(let key in map) {
        if(map[key] === maxCount) maxType++; 
    }
    return Math.max((maxCount-1)*(n+1)+1+(maxType-1), len);
};
leastInterval(["A","A","A","B","B","B"],2)
```

### 739. Daily Temperatures

```
Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].

Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].
```

维护一个递减栈，如果比栈顶小就持续入栈，入栈时把index也入栈了，方便计算距离，那么如果碰到比栈顶的大，这个值一定是第一个比栈顶大的值，计算距离后出栈，持续出栈到栈顶值更大，计算每一个的距离

```js
/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    debugger;
    let s = [],
        len = T.length,
        res = new Array(len).fill(0);
    for(let i=0; i<len; i++) {
        while(s.length > 0 && T[i] > s[s.length-1][1]) {//那么如果碰到比栈顶的大，这个值一定是第一个比栈顶大的值，计算距离后出栈
            let top = s.pop();
            res[top[0]] = i - top[0]; 
        }
        s.push([i, T[i]]);
    }
    return res;
};
dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])
```

