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

### 155. Min Stack

<img src="http://lrun1124.github.io/img/leetcode/155.png" width="500"/>


```js
//两个栈，一个每次push进x，一个每次push进 Math.min(x,栈顶最小值)

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.

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

### 198. House Robber

<img src="http://lrun1124.github.io/img/leetcode/198.png" width="500"/>

```js
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let len = nums.length,
        selected = new Array(len+1).fill(0),
        unselected = new Array(len+1).fill(0);
    for(let i=1; i<=len; i++) {
        selected[i] = unselected[i-1] + nums[i-1];
        unselected[i] = Math.max(selected[i-1], unselected[i-1]); //这里容易错，因为前面可选可不选
    }
    return Math.max(selected[len], unselected[len]);
};
rob([2,1,1,2])
```
DP公式
selected[i] = unselected[i-1] + x;
unselected[i] = Math.max(selected[i-1], unselected[i-1])

### 200. Number of Islands

<img src="http://lrun1124.github.io/img/leetcode/200.png" width="500"/>

```js
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let rows = grid.length,
        cols = grid[0].length,
        res = 0;
    const inArea = (r, c) => {
        return r>=0 && r<rows && c>=0 && c<cols;
    }
    const dfs = (r, c) => {
        if(!inArea(r,c) || grid[r][c] !== '1') return;
        grid[r][c] = '2';
        dfs(r-1, c);
        dfs(r+1, c);
        dfs(r, c-1);
        dfs(r, c+1);
    }
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if(grid[i][j] === '1') {
                res++;
                dfs(i, j); //用dfs找到所有边界，并标记为'2'，这样不会重复
            }
        }
    }
    return res;
};

var island = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
];
numIslands(island);
```

dfs解决岛屿问题

### 463. Island Perimeter

<img src="http://lrun1124.github.io/img/leetcode/463.png" width="500"/>

```js
Input: grid = [
    [0,1,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [1,1,0,0]
]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image above.
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
    let rows = grid.length,
        cols = grid[0].length,
        res = 0;
    if(rows === 0 && cols === 0) return 0;
    const inArea = (r, c) => {
        return r>=0 && r<rows && c>=0 && c<cols; 
    }
    const dfs = (r, c) => {
        if(!inArea(r,c)) { //到达边缘时周长加1
            res++; 
            return;
        }
        if(grid[r][c] == 0) { //到达海洋时周长加1
            res++;
            return;
        }
        if(grid[r][c] == 2) { //到达已经遍历过得点周长不加
            return;
        }
        grid[r][c] = 2;
        dfs(r-1, c);
        dfs(r+1, c);
        dfs(r, c-1);
        dfs(r, c+1);
    }
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if(grid[i][j] === 1) dfs(i, j);
        }
    }
    return res;
};

var grid = [
    [0,1,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [1,1,0,0]
];
islandPerimeter(grid);
```

dfs岛屿周长，分情况判断

### 695. Max Area of Island

<img src="http://lrun1124.github.io/img/leetcode/695.png" width="500"/>

```js
Example 1:

[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
Given the above grid, return 6. Note the answer is not 11, because the island must be connected 4-directionally.
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    let rows = grid.length,
    cols = grid[0].length,
    maxArea = 0,
    curArea = 0;
    if(rows === 0 && cols === 0) return 0;
    const inArea = (r, c) => {
        return r>=0 && r<rows && c>=0 && c<cols; 
    }
    const dfs = (r, c) => {
        if(!inArea(r,c) || grid[r][c] !== 1) return;
        curArea++;
        grid[r][c] = 2;
        dfs(r-1, c);
        dfs(r+1, c);
        dfs(r, c-1);
        dfs(r, c+1);
    }
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if(grid[i][j] === 1) {
                curArea = 0;
                dfs(i, j);
                maxArea = Math.max(curArea, maxArea);
            }
        }
    }
    return maxArea;
};
var grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]];
maxAreaOfIsland(grid);
```

### 207. Course Schedule

<img src="http://lrun1124.github.io/img/leetcode/207.png" width="500"/>

```js
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0. So it is possible.
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    debugger;
    let inDegree = new Array(numCourses).fill(0), // 入度数组
        map = new Map(); // 邻接表
    for(let i=0; i<prerequisites.length; i++) { 
        let cur = prerequisites[i]; 
        inDegree[cur[0]]++; // 求课的初始入度值
        if(map.get(cur[1])) { // 添加依赖它的后续课
            let tmp = map.get(cur[1]); //这里必须单独拿出来，再push，写成map.get(cur[1]).push(cur[0]);有问题
            tmp.push(cur[0]);
            map.set(cur[1],tmp);
        }
        else map.set(cur[1], [cur[0]]);
    }
    let queue = [],
        count = 0;
    for(let i=0; i<numCourses; i++) { // 所有入度为0的课入列
        if(inDegree[i] === 0) queue.push(i);
    }
    while(queue.length > 0) {
        let item = map.get(queue.shift()); // 获取这门课对应的后续课
        count++;
        for(let i=0; item && i<item.length; i++) {
            inDegree[item[i]]--; // 依赖它的后续课的入度-1
            if(inDegree[item[i]] === 0) {
                queue.push(item[i]); // 如果因此减为0，无依赖可以上这门课了
            }
        }
    }
    return count === numCourses; //所有课都被修了，如果有环，会导致有一门课的入度不为0
};

canFinish(3, [[1,0],[2,0]])
```
BFS拓扑 这种叫 有向无环图，把一个 有向无环图 转成 线性的排序 就叫 拓扑排序

### 208. Implement Trie (Prefix Tree)

<img src="http://lrun1124.github.io/img/leetcode/208.png" width="500"/>

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
        return true;
    }
}
```

Tried树用于，单词补全，拼写检查，ip路由，还有其他的数据结构，如平衡树和哈希表，使我们能够在字符串数据集中搜索单词。为什么我们还需要 Trie 树呢？尽管哈希表可以在 O(1)时间内寻找键值，却无法高效的完成以下操作

1. 找到具有同一前缀的全部键值。
1. 按词典序枚举字符串的数据集。

Trie 树优于哈希表的另一个理由是，随着哈希表大小增加，会出现大量的冲突，时间复杂度可能增加到 O(n)，其中 n 是插入的键的数量。与哈希表相比，Trie 树在存储多个具有相同前缀的键时可以使用较少的空间。此时 Trie 树只需要 O(m)的时间复杂度，其中 m 为键长。而在平衡树中查找键值需要 O(mlogn) 时间复杂度。

### 221. Maximal Square

<img src="http://lrun1124.github.io/img/leetcode/208.png" width="500"/>

```js
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    debugger;
    let row = matrix.length,
        col = matrix[0].length,
        dp = new Array(row),
        max = 0;
    if(row === 0 || col === 0) return 0;
    for(let i=0; i<row; i++) {
        dp[i] = new Array(col);
    }
    for(let i=0; i<row; i++) {
        for(let j=0; j<col; j++) {
            if(matrix[i][j] === '0' ) {
                dp[i][j] = 0;
                continue;
            }
            if(i===0 || j===0) {
                dp[i][j] = 1; 
            } else {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
            }
            max = Math.max(dp[i][j], max);
        }
    }
    return max * max;
};
var matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]];
maximalSquare(matrix)
```
主要是把dp理解为以i，j为右下角的正方形，而不是i,j之内最大的，这样比较每次结果就行
dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1，（i,j）相邻的三个点，最小的一个补上一层

### 309. Best Time to Buy and Sell Stock with Cooldown


<img src="http://lrun1124.github.io/img/leetcode/309.png" width="500"/>

```js
Input: [1,2,3,0,2]
Output: 3 
Explanation: transactions = [buy, sell, cooldown, buy, sell]

分今天持股和不持股两种情况，再分今天操作不操作两种状态
[
    持股&今天买的，
    持股&之前买的，
    不持股&今天卖的，
    不持股&之前卖的
]
dp[i][0] = dp[i-1][3] - price[i] //因为今天买，所以昨天肯定是不持股，并且是昨天肯定没卖，因为冷静期
dp[i][1] = Math.max(dp[i-1][0], dp[i-1][1]); //昨天肯定持股，可能是昨天买的，可能是昨天之前买的
dp[i][2] = Math.max(dp[i-1][0], dp[i-1][1]) + price[i]; //昨天的收益 + 今天卖出的收益
dp[i][3] = Math.max(dp[i-1][2], dp[i-1][3]); //昨天肯定不持有，昨天卖的，或者昨天之前卖的
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    debugger;
    let len = prices.length,
        dp = [];
    if(len === 0) return 0;
    dp.push([-1 * prices[0],  -1 * prices[0], 0, 0]); 
    for(let i=1; i<len; i++) {
        dp.push([
            dp[i-1][3] - prices[i], //持股&今天买的
            Math.max(dp[i-1][0], dp[i-1][1]), //持股&之前买的
            Math.max(dp[i-1][0], dp[i-1][1]) + prices[i], //不持股&今天卖的
            Math.max(dp[i-1][2], dp[i-1][3]) //不持股&之前卖的
        ])
    }
    return Math.max(dp[len-1][2], dp[len-1][3]); //比较两种不持有的状态
};
maxProfit([1,2,3,0,2]);
```


### 322. Coin Change

<img src="http://lrun1124.github.io/img/leetcode/322.png" width="500"/>

```js
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Input: coins = [2], amount = 3
Output: -1

F(11) = Math.min(F(11-1) + F(11-2) + F(11-5)) + 1
      = Math.min(F(10) + F(9) + F(6)) + 1
      = Math.min(F(10-1) + F(10-2) + F(10-5) + F(9-1) + F(9-2) + F(9-5)) + 1
      ...

//自底向上
var coinChange = function(coins, amount) {
    debugger;
    let len = coins.length,
        dp = new Array(amount+1).fill(amount+1);
    dp[0] = 0;
    for(let i=1; i<=amount; i++) {
        for(let j=0; j<len; j++) {
            if(i-coins[j] >=0) {
                dp[i] = Math.min(dp[i], dp[i-coins[j]]+1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
coinChange([1,2,5],11)
```

### 347. Top K Frequent Elements

<img src="http://lrun1124.github.io/img/leetcode/347.png" width="500"/>

```js
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Input: nums = [1], k = 1
Output: [1]

//用一个hash记录次数，数组排序，满足调教是要用一个小顶堆，维护前k大的元素，js里堆太麻烦
var topKFrequent = function(nums, k) {
    debugger;
    let m = new Map(),
        len = nums.length;
    for(let i=0; i<len; i++) {
        m.set(nums[i], m.get(nums[i])===undefined ? 1 : m.get(nums[i]) + 1); //注意这里是判断undefined，有可能是0
    }
    if(m.size <= k) return [...new Set(nums)];
    let array = []; //这里满足调教是要用一个小顶堆，维护前k大的元素，js里堆太麻烦
    for(let [key, val] of m) {
        array.push([key, val]);
    }
    array.sort((a,b) => b[1]-a[1]); //注意排序不加括号，默认return，加括号要显式return！
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


