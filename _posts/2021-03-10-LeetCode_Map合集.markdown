---
layout:     post
title:      "LeetCode Map合集"
subtitle:   ""
date:       2021-03-10 10:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - LeetCode
---

### 207. Course Schedule

```
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0. So it is possible.

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
```

BFS拓扑 这种叫 有向无环图，把一个 有向无环图 转成 线性的排序 就叫 拓扑排序

```js
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

### 399. Evaluate Division

```
You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]
```

```js
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    
};
```

class UnionFind {
    constructor (n) {
        this.parent = new Uint8Array(n)
        this.weight = new Float32Array(n)
        while (n--) {
            this.parent[n] = n //
            this.weight[n] = 1.0
        }
    }
    union (x, y, value) {
        const rootX = this.find(x), rootY = this.find(y)
        if (rootX !== rootY) {
            this.parent[rootX] = rootY
            this.weight[rootX] = this.weight[y] * value / this.weight[x]
        }
    }
    find (x) {
        if (x !== this.parent[x]) {
            const orginX = this.parent[x]
            this.parent[x] = this.find(this.parent[x])
            this.weight[x] *= this.weight[orginX]
        } 
        return this.parent[x]
    }
    isConnected (x, y) {
        const rootX = this.find(x), rootY = this.find(y)
        return rootX !== void 0 && rootX === rootY ? this.weight[x] / this.weight[y] : -1.0
    }
}


var calcEquation = function(equations, values, queries) {
    debugger;
    const unionFind = new UnionFind(values.length << 1), h = new Map
    for (let i = 0, id = 0; i < values.length; i++) {
        const x = equations[i][0], y = equations[i][1]
        if (!Array.from(h.keys()).includes(x)) h.set(x, id++)
        if (!Array.from(h.keys()).includes(y)) h.set(y, id++)
        unionFind.union(h.get(x), h.get(y), values[i])
    }
    return queries.map(([x, y]) => unionFind.isConnected(h.get(x), h.get(y)))
};

calcEquation([["a","b"],["b","c"],["bc","cd"]], [1.5,2.5,5.0], [["a","c"],["c","b"],["bc","cd"],["cd","bc"]])
