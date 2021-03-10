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

### 347. Top K Frequent Elements

```
Given a non-empty array of integers, return the k most frequent elements.

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Input: nums = [1], k = 1
Output: [1]
```

用一个hash记录次数，数组排序

满足题目条件 O(nlogn)的解法要用一个小顶堆，维护前k大的元素（js里堆实现复杂）

```js
var topKFrequent = function(nums, k) {
    debugger;
    let m = new Map(),
        len = nums.length;
    for(let i=0; i<len; i++) {
        m.set(nums[i], m.get(nums[i]) === undefined ? 1 : m.get(nums[i]) + 1); //注意这里是判断undefined，有可能是0
    }
    if(m.size <= k) return [...new Set(nums)]; //特殊处理
    let array = [];
    for(let [key, val] of m) {
        array.push([key, val]);
    }
    array.sort((a,b) => b[1]-a[1]); 
    let res = [];
    for(let i=0; i<k; i++) {
        res.push(array[i][0]);
    }
    return res;
};
topKFrequent([3,0,1,0],1)
```

### 394. Top K Frequent Elements

<img src="http://lrun1124.github.io/img/leetcode/394.png" width="500"/>

<img src="http://lrun1124.github.io/img/leetcode/394_1.png" width="500"/>

```js
Input: s = "3[a]2[bc]"
Output: "aaabcbc"
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
var decodeString = function(s) {
    debugger;
    let len = s.length,
        repeat = 0,
        res = "",
        numStack = [],
        resStack = [];
    if(len === 0) return "";
    for(let i=0; i<len; i++) {
        if(s[i] >= '0' && s[i] <= '9') { //用于后续倍数计算；
            repeat = repeat * 10 + (s[i] - '0');  //可能为多位数
        } else if (s[i] === '[') { 
            numStack.push(repeat);//记录此 [ 前的片段和需要重复几次入栈，用于 ] 时的拼接操作
            resStack.push(res);
            res = ""; //清空片段和重复次数
            repeat = 0;
        } else if(s[i] === ']') {
            let tmp = resStack.pop(); //上个 [ 到当前 [ 的片段，例如 "3[a2[c]]" 中的 a；
            let num = numStack.pop(); // 上个片段重复次数
            for(let i=0; i<num; i++) tmp += res; //注意tmp在前, 这时候res分别为'c'，'acc'
            res = tmp;
        } else {
            res += s[i]; //当 c 为字母时，在 res 尾部添加 c；
        }
        console.log(s[i] + ' :numStack: ' + numStack + "   resStack:" + resStack + "   res:" + res + " repect:" + repeat);
    }
    return res;
};
decodeString("3[a2[c]]")
```

### 406. Queue Reconstruction by Height

<img src="http://lrun1124.github.io/img/leetcode/406.png" width="500"/>

```js
Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
    debugger;
    let len = people.length,
        res = new Array(len);
    if(len === 0) return [];
    people.sort((a,b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]); //对于身高相同的[7,1][7,0]，要先安排[7,1]为前面的[7，0]留出位置
    for(let i=0; i<len; i++) {
        let emptyPos = people[i][1] + 1; //这里多一个位置，以[4,4]，留出4个位置，自己在第5个
        for(let j=0; j<len; j++) {
            if(res[j] === undefined) {
                emptyPos--; //留出emptyPos个空位
                if(emptyPos === 0) {
                    res[j] = people[i];  //空位留好了，当前位置找到了
                    break;
                }
            }
        }
    }
    return res;
};
reconstructQueue([[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]);
```
留空位思想：把比当前矮的人先安排了，那么留出比当前高的人的位置，就能确定当前位置


### 416. Partition Equal Subset Sum

<img src="http://lrun1124.github.io/img/leetcode/416.png" width="500"/>

```js
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    debugger;
    let len = nums.length,
        sum = 0;
    for(let i=0; i<len; i++) {
        sum+=nums[i];
    }
    if(sum & 1 === 1) return false;
    let target = sum >> 1,
        dp = new Array(len);
    //dp[0] = new Array(target+1).fill(true);
    for(let i=0; i<len; i++) {
        dp[i] = new Array(target+1).fill(false);
    }
    // 先填表格第 0 行，第 1 个数只能让容积为它自己的背包恰好装满
    if (nums[0] <= target) {
        dp[0][nums[0]] = true;
    }
    
    for(let i=1; i<len; i++) {
        for(let j=0; j<=target; j++) {
            if(j<nums[i]) { //说明用不到当前值，看前面的
                dp[i][j] = dp[i-1][j];
            } else if (j===nums[i]) { //直接等于就为true
                dp[i][j] = true;
            } else {
                dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i]]; //不用当前，直接用前面的，或者用当前，就看前面能不能组成target减去当前值
            }
        }
    }
    console.log(dp);
    return dp[len-1][target];
};
canPartition([1,2,5])
```

0，1背包
不选择 nums[i]，如果在 [0, i - 1] 这个子区间内已经有一部分元素，使得它们的和为 j ，那么 dp[i][j] = true；
选择 nums[i]，如果在 [0, i - 1] 这个子区间内就得找到一部分元素，使得它们的和为 j - nums[i]

dp[i][j] = dp[i - 1][j] or dp[i - 1][j - nums[i]]

### 438. Find All Anagrams in a String

<img src="http://lrun1124.github.io/img/leetcode/438.png" width="500"/>

```js

Input:
s: "cbaebabacd" p: "abc"
Output:
[0, 6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    let len = p.length,
        count =  left = right = 0, //count表示窗口里有多少个值匹配的上p里的值
        mapA = {}, //记录p需要的值和次数
        mapB = {}, //记录滑动窗口信息
        res = [];
    for(let i=0; i<p.length; i++) { 
        if(mapA[p[i]] === undefined) mapA[p[i]] = 1;
        else mapA[p[i]] = mapA[p[i]]+1;
    }
    var moveLeft = () => { //左移函数
        mapB[s[left]]--; //把窗口里的值减掉，这里不用判断，因为能进窗口一定是在p里的
        left++;
        count--; 
    };
    while(right < s.length) {
        let cur = s[right];
        if(mapA[cur] === undefined) { //碰到不在p里的重置
            mapB = new Object();
            count = 0;
            right++;
            left = right;
            continue;
        }
        if(mapB[cur] === undefined) { //窗口里没有，写入
            mapB[cur] = 1;
            count++;
        } else { //窗口里有的话，先写入再判断是否溢出
            mapB[cur]++;
            count++;
            if(mapB[cur] > mapA[cur]){ //如果溢出
                //这时要左移去掉一个cur，移动左侧到和cur相同的值
                while(s[left] !== cur) {
                    moveLeft();
                }
                //left移动到这个值后面
                moveLeft();
            }
        }
        if(count === len) {
            res.push(left);
            moveLeft();
        }
        right++;
    }
    return res;
};
//findAnagrams("abaacbabc", "abc")
findAnagrams("cbaebabacd", "abc")
```


### 494. Target Sum

<img src="http://lrun1124.github.io/img/leetcode/494.png" width="500"/>

```js
Input: nums is [1, 1, 1, 1, 1], S is 3. 
Output: 5
Explanation: 

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

There are 5 ways to assign symbols to make the sum of nums be target 3.
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
    debugger;
    let len = nums.length,
        dp = new Array(len),
        sum = 0,
    S = Math.abs(S); //-S和+S的结果是相同的
    for(let i=0; i<len; i++) {
        sum += nums[i];
    }
    if(S > sum) return 0; //边界条件
    sum <<= 1; //取二倍的，本质在于下一层始终依赖上一层，j+nums[i]会过界
    for(let i=0; i<len; i++) {
        dp[i] = new Array(sum+1).fill(0);
    }
    dp[0][nums[0]] = nums[0] === 0? 2 : 1;//这是个坑，初始为0的时候
    for(let i=1; i<len; i++) {
        for(let j=0; j<=sum; j++) {
            dp[i][j] = dp[i-1][Math.abs(j-nums[i])] + dp[i-1][Math.abs(j+nums[i])];
        }
    }
    return dp[len-1][S];
};
//findTargetSumWays([7,9,3,8,0,2,4,8,3,9],0)
findTargetSumWays([1,1,1,1,1],-3)
//findTargetSumWays([0,0,0,0,0,0,0,0,1],1)
//findTargetSumWays([1000],-1000)
```

### 621. Task Scheduler

<img src="http://lrun1124.github.io/img/leetcode/621.png" width="500"/>

```js
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
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
    return Math.max(len, (maxCount-1)*(n+1)+1+(maxType-1));
};
leastInterval(["A","A","A","B","B","B"],2)
```
找出最多数量的任务，每一个建立一个size为n+1的桶，这时候有两种情况：
1. 其他任务全部能填进去，那么总时间就位，每个桶的长度(n+1) * 桶的数量(maxCount-1) + 1  + 同样有最大数量的其他任务数(maxType-1)
1. 其他任务不能完全填进去，那么增长桶的长度，这时无论插入多少任务，因为桶的长度可以无限增加，所以总是能填的进去，因为这些多的任务足以填充所有空值的位子，所以最终结果就等于task的数量

### 739. Daily Temperatures

```js
For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].
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

维护一个递减栈，如果小就持续入栈，那么如果碰到比栈顶的大，这个值一定是第一个比栈顶大的值，计算距离后出栈，直到出栈到栈顶值更大，把这个值压入