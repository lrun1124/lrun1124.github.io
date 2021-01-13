---
layout:     post
title:      "LeetCode Tree合集"
subtitle:   ""
date:       2021-01-13 10:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - LeetCode
---

### 94. Binary Tree Inorder Traversal

<img src="http://lrun1124.github.io/img/leetcode/094.png" width="500"/>

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 //递归，中序自带递归属性 
var inorderTraversal = function(root) {
    var res = [];
    var inorder = (root) => {
        if(!root) return;
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};

//迭代，显式地将递归栈模拟出来
var inorderTraversal = function(root) {
    var res = [],
        s = [];
    while(root || s.length > 0) {
        while(root) {
            s.push(root);
            root = root.left;
        }
        root = s.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
};

//标记法，正常中序中，非根节点第一次访问会入栈，第二次访问才输出值。这里是第一次访问时就把值顺便入栈了，所以碰到值就意味着访问过了，直接输出
var inorderTraversal = function(root) {
    let s = [root], res = [];
    while(s.length > 0) {
        let cur = s.pop();
        if(!cur) continue; //如果为空就跳过
        if(cur instanceof TreeNode) {
            s.push(cur.right);
            s.push(cur.val);
            s.push(cur.left);
        } else res.push(cur);
    }
    return res;
}

//morris遍历
var inorderTraversal = function(root) {
    const res = [];
    let predecessor = null;

    while (root) {
        if (root.left) {
            // predecessor 节点就是当前 root 节点向左走一步，然后一直向右走至无法走为止
            predecessor = root.left;
            while (predecessor.right && predecessor.right !== root) {
                predecessor = predecessor.right;
            }

            // 让 predecessor 的右指针指向 root，继续遍历左子树
            if (!predecessor.right) {
                predecessor.right = root;
                root = root.left;
            }
            // 说明左子树已经访问完了，我们需要断开链接
            else {
                res.push(root.val);
                predecessor.right = null;
                root = root.right;
            }
        }
        // 如果没有左孩子，则直接访问右孩子
        else {
            res.push(root.val);
            root = root.right;
        }
    }
    return res;
};
```

### 96. Unique Binary Search Trees

<img src="http://lrun1124.github.io/img/leetcode/096.png" width="500"/>




