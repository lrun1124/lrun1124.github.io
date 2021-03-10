---
layout:     post
title:      "LeetCode Bit合集"
subtitle:   ""
date:       2021-01-08 10:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - LeetCode
---

### 2. Add Two Numbers

```
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Input: l1 = [0], l2 = [0]
Output: [0]

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output:   [8,9,9,9,0,0,0,1]

```

按位相加，有值取值，没值取0，记录进位

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var addTwoNumbers = function(l1, l2) {
    let head = tail = new ListNode(-1); //前面放一个node，这样避免里面初始化的if else判断
        carry = 0; //进位
    while(l1 || l2) {
        let sum = (l1? l1.val : 0) + (l2? l2.val : 0) + carry; //有值取值，没值取0，加上进位
        tail.next = new ListNode(sum%10); //插入结果
        carry = sum >= 10 ? 1 : 0; //更新进位
        if(l1) l1 = l1.next;
        if(l2) l2 = l2.next;
        tail = tail.next;
    }
    if(carry > 0) {
        tail.next = new ListNode(1);
    }
    return head.next; 
};
```

### 19. Remove Nth Node From End of List
```
Given the head of a linked list, remove the nth node from the end of the list and return its head.

Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Example 2:

Input: head = [1], n = 1
Output: []
Example 3:

Input: head = [1,2], n = 1
Output: [1]
```

要删除的是len-n这个，first先走n步，然后first，second一起走，first到末尾，second就走len-n步。要一个哑指针，因为head自己可能被删掉，不然就要处理麻烦的边界问题。

```js
/**
 * @param {ListNode} head
 * @param {nsumber} n
 * @return {ListNode}
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var removeNthFromEnd = function(head, n) {
    let pre = new ListNode(-1); //哑指针
    pre.next = head;
    let first = second = pre;
    while(n>0){ //快的先走n步, 这里用for循环慢很多
        first = first.next;
        n--;
    }
    while(first.next) { //快的走到末尾，这时候慢指向要删除的前一个
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next; //因为有哑指针，所以second.next可能为head这种情况不用处理了
    return pre.next;
};

let a = new ListNode(1);
removeNthFromEnd(a,1)
```

### 21. Merge Two Sorted Lists
```
Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.

Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: l1 = [], l2 = []
Output: []
Example 3:

Input: l1 = [], l2 = [0]
Output: [0]
```

哪个小放哪个，最后补上剩下的

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let pre = new ListNode(0),
        tail = pre;
    while(l1 && l2) {
        if(l1.val <= l2.val) {
            //tail.next = new ListNode(l1.val);
            tail.next = l1; //不需要新new节点，速度快55%
            l1 = l1.next;
        } else {
            //tail.next = new ListNode(l2.val);
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    if(l1) tail.next = l1;
    if(l2) tail.next = l2;
    return pre.next;
};
```

递归
```js
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
```

### 23. Merge k Sorted Lists

```
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
```

二分+递归

```js
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if(lists.length === 0) return null; //如果不加这一句，[]跳不出循环
    const merge = (left, right) => {
        if(left === right) return lists[left]; //碰到相同的，就开始真正mergetwo了
        let mid = (left + right) >> 1;
        return mergeTwoLists(merge(left,mid), merge(mid+1,right));
    }
    return merge(0, lists.length-1);
};

const  mergeTwoLists = (l1, l2) => { //合并两个链表
    let pre = new ListNode(0),
        tail = pre;
    while(l1 && l2) {
        if(l1.val <= l2.val) {
            tail.next = l1; 
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    if(l1) tail.next = l1;
    if(l2) tail.next = l2;
    return pre.next;
};
```

### 141. Linked List Cycle

```
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

```

<img src="http://lrun1124.github.io/img/leetcode/141.png" width="500"/>

快慢指针

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let fast = slow = head;
    while(fast) {
        if(fast.next === null) return false; //如果fast能到达末尾，肯定没有环
        fast = fast.next.next; 
        slow = slow.next;
        if(slow === fast) return true; //指针相遇，说明有环
    }
    return false;
};
```

### 142. Linked List Cycle II
```
Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Notice that you should not modify the linked list.
```

<img src="http://lrun1124.github.io/img/leetcode/142.png" width="500"/>

链表a+b, 相遇时，slow走了s步，f走了s+nb步， 2s = s+nb, s = nb，
然后让res走a步，s走了nb+a，这里肯定是入口

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let fast = slow = head;
    while(true) {
        if(fast === null || fast.next === null) return null;
        fast = fast.next.next,
        slow = slow.next
        if(fast === slow) break;
    }
    let res = head;
    while(res !== slow) {
        res = res.next;
        slow = slow.next;
    }
    return res;
};
```

### 148. Sort List
```
Given the head of a linked list, return the list after sorting it in ascending order.

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?
```

<img src="http://lrun1124.github.io/img/leetcode/148.png" width="500"/>

方法一：js的做法，先断链，再排序后reduce

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if(!head) return null;
    var res = [];
    while(head) {
        res.push(head); 
        let tmp = head.next; //要把next断掉，不然最后一个值还会有next，就出现了环
        head.next = null;
        head = tmp;
    }
    res.sort((a, b) => a.val - b.val).reduce((p, v) => p.next = v)
    return res[0];
};
```

迭代，主要是split, mergeTwoLists这两个函数

```js

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var sortList = function(head) {
    //debugger;
    let pre = new ListNode(0),
        len = getLength(head);

    pre.next = head;

    for(let i = 1; i<len; i*=2) { //每次合并2个，每次合并4个，8个...
        let cur = pre.next; //current指针每次向前直到末尾
        let tail = pre; //tail记录每次合并后的信息
        while(cur) {
            let left = cur; 
            let right = mySplit(cur, i);
            cur = mySplit(right, i); //cur移动，准备下一次合并
            tail.next = mergeTwoLists(left, right);
            while(tail.next) { //注意这里是next!不然tail为null了
                tail = tail.next; // 保持 tail 为尾部
            }
        }
    }
    return pre.next;
}

//切断linklist
var mySplit = (head, pos) => {
    if(head === null) return null;
    let cur = head;
    //注意这里cur.next!=null 有可能出现后半段还没到规定步长但是走完的情况
    for(let i=1; i<pos && cur.next; i++) {
        cur = cur.next;
    }
    let tmp = cur.next; //切断前面部分
    cur.next = null;
    return tmp
}

//获取长度
var getLength = (head) => {
    let len = 0;
    while(head) {
        head = head.next;
        len++;
    }
    return len;
}
//合并两个链表
var mergeTwoLists = (l1, l2) => {
    let pre = new ListNode(0),
        tail = pre;
    while(l1 && l2) {
        if(l1.val <= l2.val) {
            tail.next = l1; 
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    if(l1) tail.next = l1;
    if(l2) tail.next = l2;
    return pre.next;
};

var a = new ListNode(4);
var b = new ListNode(3);
var c = new ListNode(1);
var d = new ListNode(2);
a.next = b; b.next = c; c.next = d
sortList(a)
```

### 160. Intersection of Two Linked Lists

```
Write a program to find the node at which the intersection of two singly linked lists begins.
```

<img src="http://lrun1124.github.io/img/leetcode/160.png" width="500"/>

```
思想: 找到两个链表，距离末尾一样长的点

a的长单独为a+n,b的长度为b+n，若a<b, 两者走了a+n步后a的指针到头，这时，b离末尾还有（b+n）-（a+n） = b-a 步，此时将a指针设到b的开头，继续走，b-a步后，b开始的指针到了末尾，把他放到a的（短的）开头，这时，两个指针到末尾的距离为别为a+n，(b+n) -（b-a）= n+a,相同，一起走到相交，如果到末尾还没相交就说明不相交
```

```js

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let a = headA,
        b = headB;
    while( a && b ) {
        a = a.next;
        b = b.next;
    }
    if (a) {
        b = headA;
        while(a) {
            b = b.next;
            a = a.next;
        }
        a = headB;
    } else {
        a = headB;
        while(b) {
            b = b.next;
            a = a.next;
        }
        b = headA;
    }
    while( a && b ) {
        if(a === b) return a;
        a = a.next;
        b = b.next;
    }
    return null;
};
```

优化写法，由于ab每次都要么到next，要么到另一个的开头，所以可以合并为一个循环，如果不相交

```js
//不能处理不相交的情况
var getIntersectionNode = function(headA, headB) {
    if(!headA || !headB) return null;
    let a = headA, b = headB;
    while(a !== b) {
        a = a === null ? headB : a.next;
        b = b === null ? headA : b.next;
    }
    return a;
}
```

### 206. Reverse Linked List

<img src="http://lrun1124.github.io/img/leetcode/206.png" width="500"/>


辅助指针，当前要指向前一个，所以要记得前一个，当前的next会丢，所以要tmp，pre往前走成了cur，cur往前走成tmp，画图！

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let pre = null, 
        cur = head;
    while(cur) {
        let tmp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = tmp;
    }
    return pre;
};
```

使用递归函数，一直递归到链表的最后一个结点，该结点就是反转后的头结点，记作 right .
此后，每次函数在返回的过程中，让当前结点的下一个结点的 next.next 指针指向当前节点。
同时让当前结点的 next 指针指向 null ，从而实现从链表尾部开始的局部反转
当递归函数全部出栈后，链表反转完成。

```js
var reverseList = function(head) {
    if(head || head.next) {
        return head;
    }
    let right = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return right;
}
```

### 234. Palindrome Linked List

```
Given a singly linked list, determine if it is a palindrome.

Input: 1->2
Output: false
Example 2:

Input: 1->2->2->1
Output: true
```

先找到中间问题，反转后部分，按个比较，O(1)空间复杂度

```js
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var isPalindrome = function(head) {
    debugger;
    let fast = slow = head,
        len = 0;
    while(fast && fast.next) { //找到中间位置
        fast = fast.next.next;
        slow = slow.next;
    }
    if(fast) { //如果fast不为空就说明是奇数长度，slow在前一步
        slow = slow.next;
    }
    slow = reverse(slow); //反转
    fast = head;
    while(fast && slow) { //对比
        if(fast.val !== slow.val) return false;
        fast = fast.next;
        slow = slow.next;
    }
    return true;
};

var reverse = (head) => {
    let cur = head,
        pre = null;
    while(cur) {
        let tmp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = tmp;
    }
    return pre;
}

var a = new ListNode(1);
var b = new ListNode(2);
var c = new ListNode(2);
var d = new ListNode(1);
a.next = b; b.next = c; c.next = d
isPalindrome(a)
```

放到栈里，在取出来和链表比较，可以优化，比较一半就行了，O(n)空间复杂度

```js
var isPalindrome = function(head) {
    let len = 0,
        s = [],
        cur = head;
    while(cur) {
        s.push(cur.val);
        cur = cur.next;
        len++;
    }
    len  = len >> 1;
    while(len > 0) {
        if(head.val !== s.pop()) return false;
        head = head.next;
        len--;
    }
    return true;
}
```


