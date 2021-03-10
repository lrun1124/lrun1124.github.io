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

```
Given the root of a binary tree, return the inorder traversal of its nodes' values.
```

递归，中序自带递归属性 

```js
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
```

迭代，显式地将递归栈模拟出来

```js
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
```

标记法，正常中序中，非根节点第一次访问会入栈，第二次访问才输出值。这里是第一次访问时就把值顺便入栈了，所以碰到值就意味着访问过了，直接输出

```js

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
```

```
morris遍历，空间复杂度O(1)

1. 碰到没有left的就直接插入当前，然后访问right
2. 找到left的前驱节点（最右节点），如果前驱没right，链接到当前，继续left，如果前驱有right，插入，断链，直接通过right回去

其实整个过程我们就多做一步：假设当前遍历到的节点为 x，将 x 的左子树中最右边的节点的右孩子指向 x，这样在左子树遍历完成后我们通过这个指向走回了 x，且能通过这个指向知晓我们已经遍历完成了左子树，而不用再通过栈来维护，省去了栈的空间复杂度。

    1
   / \
  2   5
 / \   \
3   4   6
1. root 为 1, 有left, mostRight为4，mostRight右孩子为空，4.right-> 1
2. root 为 2, 有left, mostRight为3，mostRight右孩子为空，3.right-> 2
3. root 为 3, 无left, 插入[3], 回到2
4. root 为 2, 有left,  mostRight为3，mostRight右孩子不为空，插入[3,2],断开，root->root.right
5. root 为 4, 无left, 回到4.right->1, 回到1

```

```js
var inorderTraversal = function(root) {
    const res = [];
    let mostRight = null; 

    while (root) {
        // 如果没有左孩子，则直接访问右孩子
        if(!root.left) {
            res.push(root.val);
            root = root.right;
            continue;
        }
        // mostRight 节点就是当前 root 节点向左走一步，然后一直向右走至无法走为止
        mostRight = root.left;
        while (mostRight.right && mostRight.right !== root) mostRight = mostRight.right;//这里必须有mostRight.right !== root，第二次方位1的时候，前驱为4

        if (!mostRight.right) {  // 建立链接等左边结束后能用前驱的right直接回来
            mostRight.right = root; 
            root = root.left;
        } else { //链接过了，左子树已经访问完了，需要断开链接
            res.push(root.val);
            mostRight.right = null;
            root = root.right; //用前驱的right回来
        }
    }
    return res;
};
```

### 96. Unique Binary Search Trees

```
Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.

Input: n = 3
Output: 5

Input: n = 1
Output: 1
```

<img src="http://lrun1124.github.io/img/leetcode/096.png" width="500"/>

dp思想

```
每个节点轮流做根节点，左侧总数 * 右侧总数

F(i,n) = G(i-1) * G(n-i) //以i为根节点长度为n的组合
G(n) = F(1, n) + F(2, n) + ... + F(n,n)

G(2) = F(1,2) + F(2,2)
G(2) = G(0) * G(1) + G(1) * G(0)

G(3) = F(1,3) + F(2,3) + F(3,3)
G(3) = G(0) * G(2) + G(1) * G(1) + G(2) * G(0)
```

```js
//根据上面的dp公式写
var numTrees = function(n) {
    let dp = new Array(n+1).fill(0);
    dp[0] = dp[1] = 1;
    for(let i=2; i<=n; i++) {
        for(let j=0; j<i; j++) {
            dp[i] += dp[j] * dp[i-j-1];
        }
    }
    return dp[n];
}
numTrees(3)
```

### 98. Validate Binary Search Tree

```
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
```

<img src="http://lrun1124.github.io/img/leetcode/098.png" width="500"/>

中序遍历就是，左中右，所以BST的中序遍历必然满足增序，用pre记录前一个值，每次比较，一旦当前小于或等于pre就不满足

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

//迭代
var isValidBST = function(root) {
    var pre = -Number.MAX_VALUE,
        s = [];
    while(root || s.length>0) {
        while(root) {
            s.push(root);
            root = root.left;
        }
        root = s.pop();
        if(root.val > pre) pre = root.val; //和遍历不同的地方就在于，遍历是插入数组，这里是判断pre
        else return false;
        root = root.right;
    }
    return true;
}

//递归
var isValidBST = function(root) {
    var pre = -Number.MAX_VALUE //注意不要写成Number.MIN_VALUE，Number.MIN_VALUE是最接近0的正数
        res = true;
    var inorder = (root) => {
        if(!root) return;
        inorder(root.left);
        if(root.val > pre) pre = root.val;
        else {
            res = false; //这里不能直接return false，因为在递归内部
            return;
        }
        inorder(root.right);
    }
    inorder(root);
    return res;
};
```

### 101. Symmetric Tree

```
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
```

<img src="http://lrun1124.github.io/img/leetcode/101.png" width="500"/>
<img src="http://lrun1124.github.io/img/leetcode/101_1.png" width="500"/>

该问题可以转化为：两个树在什么情况下互为镜像？

如果同时满足下面的条件，两个树互为镜像：

1. 判断两个指针当前节点值是否相等
1. 判断 A 的右子树与 B 的左子树是否对称
1. 判断 A 的左子树与 B 的右子树是否对称

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    var check = (p, q) => {
        if(!p && !q) return true; //都为空指针则返回 true,
        if(!p || !q) return false; // 只有一个为空则返回 false
        return p.val === q.val ? check(p.left, q.right) && check(p.right, q.left) : false;
    }
    return check(root, root);
};
```

### 102. Binary Tree Level Order Traversal

```
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
```

<img src="http://lrun1124.github.io/img/leetcode/102.png" width="500"/>

```js
//BFS
var bfs = function(root) {
    var q = [root],
        res = [];
    while(q.length > 0) {
        let cur = q.shift();
        res.push(cur.val);
        if(cur.left) q.push(cur.left);
        if(cur.right) q.push(cur.right);
    }
    return res;
};

//利用bfs
var levelOrder = function(root) {
    if(!root) return [];
    var q = [root],
        res = [];
    while(q.length > 0) {
        let level = [];
            len = q.length; //记录每一层长度，注意这里要提前算，因为循环里长度会变
        for(let i=0; i<len; i++) { //i无意义，只是为了取出n次
            let cur = q.shift();
            level.push(cur.val);
            if(cur.left) q.push(cur.left);
            if(cur.right) q.push(cur.right);
        }
        res.push(level);
    }
    return res;
};
```

### 104. Maximum Depth of Binary Tree

```
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
```

```js
//利用广度优先遍历，记录层数
var maxDepth = function(root) {
    if(!root) return 0;
    let q = [root],
        res = 0;
    while(q.length > 0) {
        let len = q.length;
        for(let i=0; i<len; i++) {
            let cur = q.shift();
            if(cur.left) q.push(cur.left);
            if(cur.right) q.push(cur.right);
        }
        res++;
    }
    return res;
};

//递归，左右取最大
var maxDepth = function(root) {
    if(!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

### 105. Construct Binary Tree from Preorder and Inorder Traversal

```
Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
```

```
先序遍历的顺序是根节点，左子树，右子树。中序遍历的顺序是左子树，根节点，右子树。

所以我们只需要根据先序遍历得到根节点，然后在中序遍历中找到根节点的位置，它的左边就是左子树的节点，右边就是右子树的节点。

preorder = [3,9,20,15,7]
inorder =  [9,3,15,20,7]

preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]

首先根据 preorder 找到根节点是 3, 然后根据3将 inorder 分成左子树和右子树
左子树 inorder [9] 右子树 inorder [15,20,7]

再划分，问题成两个子问题:
1. 左子树preorder[9] inorder [9]
2. 右子树preorder[20 15 7] inorder [15,20,7]

重复上边的步骤继续划分，直到 preorder 和 inorder 都为空，返回 null 即可
```

```js
var buildTree = function(preorder, inorder) {
    var len = preorder.length,
        hashMap = {};
    if(len === 0) return null;
    //构造hash，为了快速定位inorder里的根节点位置，划分左右成两部分
    for(let i=0; i<len; i++) {
        hashMap[inorder[i]] = i;
    }
    var builder = (preorder_left, preorder_right, inorder_left, inorder_right) => {
        //preorder_left - preorder_right ： 前序的数组下标
        //inorder_left -  inorder_right ： 后序的数组下标
        if(preorder_left > preorder_right) {
            return null; //叶子节点
        }
        var rootVal = preorder[preorder_left], //前序的的第一个数就是根节点，取val为当前val
            inorder_root_index = hashMap[rootVal], //通过hash快速找到根节点位置
            left_size = inorder_root_index - inorder_left; //inorder的根到左子树的距离就是左子树的长度，用于划分本轮递归范围
        return {
            val: rootVal,
            left: builder(preorder_left + 1, preorder_left + left_size, inorder_left, inorder_root_index - 1), //这里画个图确定左右子树范围
            right: builder(preorder_left + left_size + 1, preorder_right,  inorder_root_index + 1, inorder_right)
        } 
    }
    return builder(0, len-1, 0, len-1);
};

console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]));
```

### 106. Construct Binary Tree from Inorder and Postorder Traversal

```
Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]

```

关键还是找到根节点，观察规律，后序从后向前就是根节点的位置，所以对中序迭代就好

```js
var buildTree = function(inorder, postorder) {
    debugger;
    var len = inorder.length;
    if(len === 0) return null;
    var hashMap = {},
        postIdx = len-1;
    //构造hash，快速定位inorder里的根节点位置
    for(let i=0; i<len; i++) {
        hashMap[inorder[i]] = i;
    }
    var builder = (inorder_left, inorder_right) => {
        if(inorder_left > inorder_right) {
            return null;
        }
        var rootVal = postorder[postIdx], //根节点的val
            inorder_root_index = hashMap[rootVal]; //通过hash快速找到中序根节点位置，分成左右
        postIdx--;
        return {
            val: rootVal,
            right: builder(inorder_root_index + 1, inorder_right), //right要在前
            left: builder(inorder_left, inorder_root_index - 1),
        }
    }
    return builder(0, len-1);
};
console.log(buildTree([9,3,15,20,7], [9,15,7,20,3]));
```

### 114. Flatten Binary Tree to Linked List

```
Given the root of a binary tree, flatten the tree into a "linked list":

The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
The "linked list" should be in the same order as a pre-order traversal of the binary tree.
```

```js
    1
   / \
  2   5
 / \   \
3   4   6

//找到 1 的左子树的最右结点4,将右结点边接过去

    1
   / 
  2   
 / \   
3   4   
     \
      5
       \
        6
 
//将左子树放到右边去
    1
     \
      2          
     / \          
    3   4  
         \
          5
           \
            6

 //移动root到root.right到结点2           
 //同样找到 2 的左子树的最右结点3,将右结点边接过去
    1
     \
      2          
     /          
    3 
     \   
      4
       \
        5
         \
          6  

        
 //将左子树放到右边去
    1
     \
      2          
       \          
        3      
         \
          4  
           \
            5
             \
              6         
  
  ......

var flatten = function(root) {
    while(root) {
        if(!root.left) { //左边没有就看右边
            root = root.right;
            continue;
        }
        let mostRight = root.left; //找到当前左子树的最右节点
        while(mostRight.right) mostRight = mostRight.right; 
        mostRight.right = root.right; //将当前右节点挂上去
        root.right = root.left; //左边整体挪到右边去
        root.left = null; //左边置空
        root = root.right; //下一层继续
    }
}
```

```js
//解法1:先序递归
var flatten = function(root) {
    let arr = [];
    //先序递归
    const preorder = (root) => {
        if(!root) return;
        arr.push(root);
        preorder(root.left);
        preorder(root.right);
    }
    preorder(root);
    let len = arr.length;
    if(len === 0) return null;
    for(let i=0; i<len; i++) {
        let cur = arr[i];
        cur.left = null;
        cur.right = i === (len-1) ? null : arr[i+1];
    }
}

//解法2:先序迭代
var flatten = function(root) {
    let arr = [];
    //先序迭代
    const preorder = function(root) {
        var s = [];
        while(root || s.length > 0) {
            while(root) {
                arr.push(root);
                s.push(root);
                root = root.left;
            }
            root = s.pop();
            root = root.right;
        }
    };
    preorder(root);
    let len = arr.length;
    if(len === 0) return null;
    for(let i=0; i<len; i++) {
        let cur = arr[i];
        cur.left = null;
        cur.right = i === (len-1) ? null : arr[i+1];
    }
}
```

### 226. Invert Binary Tree

```
Invert a binary tree.
Input:

     4
   /   \
  2     7
 / \   / \
1   3 6   9
Output:

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

```js

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 //递归
var invertTree = function(root) {
    if(!root) return null;
    let left = invertTree(root.left);
    let right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
//迭代,BFS
var invertTree = function(root) {
    if(!root) return null;
    var q = [root];
    while(q.length) {
        let cur = q.shift();
        [cur.left, cur.right] = [cur.right, cur.left];
        if(cur.left) q.push(cur.left);
        if(cur.right) q.push(cur.right);
    }
    return root;
}

```

### 236. Lowest Common Ancestor of a Binary Tree

```
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
```

<img src="http://lrun1124.github.io/img/leetcode/236.png" width="500"/>

 lowestCommonAncestor这个函数不要理解为找公共祖先，而就理解为帮两个节点找祖先 传入的值是root, p, q，帮p和q找到一个祖先就行，找到两个就更好了，如果找不到就返回NULL 在root->left里面找一次，root->right里面再找一次，如果某一边返回值是NULL， 那么说明两个值都在另一边 由于找的时候，一定是找的最近的祖先返回，所以这里直接返回前面的返回值就行了，可以保证是最近的公共祖先 如果左右的返回值都不是NULL，那说明p和q分别在两边，则当前节点就是最近公共祖先 左右都找不到就直接返回NULL

```
 (1） 如果当前结点 root 等于 NULL，则直接返回 NULL
（2） 如果 root 等于 p 或者 q ，那这棵树一定返回 p 或者 q
（3） 然后递归左右子树，因为是递归，使用函数后可认为左右子树已经算出结果，用 leftleft 和 rightright 表示
（4） 此时若leftleft为空，那最终结果只要看 rightright；若 rightright 为空，那最终结果只要看 leftleft
（5） 如果 leftleft 和 rightright 都非空，因为只给了 pp 和 qq 两个结点，都非空，说明一边一个，因此 rootroot 是他们的最近公共祖先
（6） 如果 leftleft 和 rightright 都为空，则返回空（其实已经包含在前面的情况中了）
```

```js
var lowestCommonAncestor = function(root, p, q) {
    if(root === null || root === p || root === q) return root; //找到p,q或空就返回
    let left = lowestCommonAncestor(root.left, p, q); //看left的LCA的哪个
    let right = lowestCommonAncestor(root.right, p, q); //看right的LCA是哪个
    if(left === null) return right; //左边找不到，那就在右边
    if(right === null) return left; //右边找不到，那就在左边
    if(left && right) return root; //左右都找到了，就说明一边一个
    return null; //两边都找不到
};
```

### 337. House Robber III

```
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called the "root." Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that "all houses in this place forms a binary tree". It will automatically contact the police if two directly-linked houses were broken into on the same night.

Determine the maximum amount of money the thief can rob tonight without alerting the police.

输入: [3,2,3,null,3,null,1]

     3
    / \
   5   1
  / \   \ 
 1   3   1
          \
          10
```

这道题实际上是求，不相邻情况下，加权最大值，dp思想，check表示选中，uncheck表示不选中
```
check[root] = uncheck[root.left] + uncheck[root.right]
uncheck[root] = Math.max(check[root.left], unckeck[root.left]) + Math.max(check[root.right], uncheck[root.right]);
```

```js
var rob = function(root) {
    var check = new Map(), //要用map，对象结果不对
        uncheck = new Map();
    var cal = (root) => {
        if(!root) return; 
        if(!root.left && !root.right) { //叶子节点
            check.set(root, root.val);
            uncheck.set(root, 0);
        }
        cal(root.left);
        cal(root.right);
        
        check.set(root, root.val + (uncheck.get(root.left) || 0) + (uncheck.get(root.right) || 0));
        uncheck.set(root, Math.max(check.get(root.left) || 0, uncheck.get(root.left) || 0) + Math.max(check.get(root.right) || 0, uncheck.get(root.right) || 0));
    }
    cal(root);
    return Math.max(check.get(root) || 0, uncheck.get(root) || 0);
};
```

### 437. Path Sum III

```
You are given a binary tree in which each node contains an integer value.

Find the number of paths that sum to a given value.

The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.

root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
output: 3

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

1.  5 -> 3
2.  5 -> 2 -> 1
3. -3 -> 11
```

双递归，以每个节点为根节点，都算一遍路径和为sum的有几条，然后加起来

```js
var pathSum = function(root, sum) {
    if(!root) return 0;
    var dfs = (root, sum) => {
        if(!root) return 0;
        sum -= root.val;
        return (sum === 0 ? 1 : 0) + dfs(root.left, sum) + dfs(root.right, sum)
    }
    return dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
}
```

用sumlist记录了从当前节点往回走的各个长度的路径的和，并且因为是递归，在返回上一层时，sumlist又变回了与根节点相对应的sumlist

```js
var pathSum = function(root, sum) {
    var dfs = (root, list) => {
        if(!root) return 0;
        let count = root.val === sum ? 1 : 0;
        for(let i=0; i<list.length; i++) {
            list[i] += root.val;
            if(list[i] === sum) count++;
        }
        list.push(root.val);
        return count + dfs(root.left, list.slice()) + dfs(root.right, list.slice());//这里list要用新的
    }
    return dfs(root, []);
};
```

### 538. Convert BST to Greater Tree

```
Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

As a reminder, a binary search tree is a tree that satisfies these constraints:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
```

Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

其实就是从右边累加到左边，中序遍历是左中右，所以用逆向中序，用sum记录累加
```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {
    var sum = 0;
    var dfs = (root) => {
        if(!root) return;
        dfs(root.right);
        sum += root.val;
        root.val = sum;
        dfs(root.left);
    }
    dfs(root);
    return root;
};
```

### 543. Diameter of Binary Tree

```
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.
```

<img src="http://lrun1124.github.io/img/leetcode/543.png" width="500"/>

计算每个节点的节点深度，也就是当前节点到叶子节点的距离，叶子节点为1，左右加起来最大的就是最长的路径

```js
var diameterOfBinaryTree = function(root) {
    var max = 0;
    var dfs = (root) => {
        if(!root) return 0;
        let left = dfs(root.left);
        let right = dfs(root.right);
        if(left + right > max) max = left + right; //将每个节点最大直径(左子树深度+右子树深度)当前最大值比较并取大者
        return Math.max(left, right) + 1; //返回节点深度
    }
    dfs(root);
    return max;
};
```


### 617. Merge Two Binary Trees

```
You are given two binary trees root1 and root2.

Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

Return the merged tree.

Note: The merging process must start from the root nodes of both trees.

	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7      


Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
Output: [3,4,5,5,4,null,7]
```

不改变原本的树，用new的节点

```js
var mergeTrees = function(t1, t2) {
    if(!t1) return t2; //如果t1为空，就t2接上去
    if(!t2) return t1; //如果t2为空，就t1接上去
    let node = new TreeNode(t1.val + t2.val); //都不为空，就创造一个新节点
    node.left = mergeTrees(t1.left, t2.left);
    node.right = mergeTrees(t1.right, t2.right);
    return node;
};
```