---
layout:     post
title:      "LeetCode Array合集"
subtitle:   ""
date:       2020-10-26 10:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - LeetCode
---

### 001.Two Sum

<img src="http://lrun1124.github.io/img/leetcode/001.png" width="500"/>

```JS
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var m = new Map();
    for(let i = 0; i < nums.length; i++){
    	if(m.has(target - nums[i])){
    		return [m.get(target - nums[i]), i];
    	} else{
    		m.set(nums[i], i);
    	}
    }
};
//test
console.log(twoSum([2,7,11,15],9));
```

### 167. Two Sum II - Input array is sorted

<img src="http://lrun1124.github.io/img/leetcode/167.png" width="500"/>

```js   
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    debugger;
    let left = 0,
        right = numbers.length - 1,
        sum;
    while(left < right) {
        sum = numbers[left] + numbers[right];
        if(sum === target) return [++left, ++right];
        if(sum > target) {
            right--;
        } else {
            left++;
        }
    }
}; 
twoSum([2,7,11,15],9)
```
因为有序，可以用双指针，一头一尾，大了就尾挪动，小了就头动，如果无序，还是用hash


### 011.Contain the most water

<img src="http://lrun1124.github.io/img/leetcode/011_1.png" width="500"/>
<img src="http://lrun1124.github.io/img/leetcode/011_2.png" width="500"/>

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    var res = 0,
        i = 0,
        j = height.length - 1;
    while(i < j) {
        let water = (j-i) * Math.min(height[i], height[j]);
        res = Math.max(res, water);
        if(height[i] < height[j]) {
            i++;
        } else {
            j--;
        }
    }
    return res;
};
//console.log(maxArea([1,8,6,2,5,4,8,3,7]));
//console.log(maxArea([1,2,4,3]));
```

两个指针数组开始和结尾，每次计算面积，记录最大的，哪边是短板就从哪边开始滑动

### 015.Sum3

<img src="http://lrun1124.github.io/img/leetcode/015.png" width="500"/>

```js
var threeSum = function(nums) {
    //处理边界
    if(nums.length < 3) return [];
    //先排序
    nums = nums.sort(function(a,b){ return a - b });
    //特殊处理全0和全其他值
    if(nums[0] === nums[nums.length-1]) {
        return nums[0] === 0 ? [0,0,0] : [];
    }
    let res = [];
    for(let i=0; i<nums.length; i++) {
        if(i !== 0 && nums[i] === nums[i-1]) continue;
        //two point，变成sum2问题
        let mid = i+1,
            end = nums.length-1;
        while(mid < end) {
            let sum = nums[i] + nums[mid] + nums[end];
            if(sum === 0) {
                res.push([nums[i], nums[mid], nums[end]]);
                //两边找到第一个不同的值，注意就算没有相同的值也要滑动，所以用do-while，否则会无限循环
                do{ mid++; } while(mid < end && nums[mid] === nums[mid-1]) 
                do{ end--; } while(mid < end && nums[end] === nums[end+1])
            } else if(sum > 0) {
                do{ end--; } while(mid < end && nums[end] === nums[end+1])
            } else {
                do{ mid++; } while(mid < end && nums[mid] === nums[mid-1])
            } 
        }
    }
    return res;
};
console.log(threeSum([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]));
```

先排序，循环数组，内层变成2sum问题，再用两个指针滑动，和为0就记录，大于0右滑，小于0左滑，遇相同的值跳过

### 016.3SumClosest

<img src="http://lrun1124.github.io/img/leetcode/016.png" width="500"/>

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort(function(a,b){return a - b;});
    var gap = Number.MAX_VALUE,
        res;

    for(let i=0; i<nums.length; i++) {
        if(i!=0 && nums[i] === nums[i-1]) continue;
        let mid = i+1,
            end = nums.length - 1,
            sum;
        while(mid < end) {
            sum = nums[i] + nums[mid] + nums[end];
            if(Math.abs(sum - target) < gap){
                gap = Math.abs(sum - target);
                res = sum;
            }
            if(sum > target) {
                do {end--} while(mid < end && nums[end] === nums[end+1]);
            } else if (sum < target) {
                do {mid++} while(mid < end && nums[mid] === nums[mid-1]);
            } else {
                return sum;
            }
        }
    }
    return res;
};

console.log(threeSumClosest([1,2,5,10,11],12))
```

思路和sum3类似，先排序，外层遍历数组，内层开头结尾两个指针，去除前后相同值


### 018.4Sum
<img src="http://lrun1124.github.io/img/leetcode/018.png" width="500"/>

```JS
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    if(nums.length < 4) {
        return [];
    }
    var res = [];
    nums.sort(function(a,b) {return a - b;})
    for(let i=0; i<nums.length; i++) {
        if(i!==0 && nums[i] === nums[i-1]) continue;
        for(let j=i+1; j<nums.length; j++) {
            if(j!==i+1 && nums[j] === nums[j-1]) continue;
            var mid = j + 1,
                end = nums.length - 1,
                sum;
            while(mid < end) {
                sum = nums[i] + nums[j] + nums[mid] + nums[end];
                if(sum === target) {
                    res.push([nums[i],nums[j],nums[mid],nums[end]]);
                    do{ mid++ } while(mid < end && nums[mid] === nums[mid-1]);
                    do{ end-- } while(mid < end && nums[end] === nums[end+1]);
                } else if (sum < target) {
                    do{ mid++ } while(mid < end && nums[mid] === nums[mid-1]);
                } else {
                    do{ end-- } while(mid < end && nums[end] === nums[end+1]);
                }
            }
        }
    }
    return res;
};

console.log(fourSum([1, 0, -1, 0, -2, 2], 0))
```

外层加入循环，内层变成3Sum的问题，NSum的问题都可以简化成3Sum的问题，N每加一层，外层加一层循环，每层循环开始跳过重复值

### 026.Remove Duplicates from Sorted Array
<img src="http://lrun1124.github.io/img/leetcode/018.png" width="500"/>

```js

nums = [0,0,1,1,1,2,2,3,3,4];

var removeDuplicates = function(nums) {
    let l = 0, r = 1,
        len = nums.length;
    if(len === 0) return 0;
    while(r < len) {
        if(nums[l] !== nums[r]) {
            l++;
            nums[l] = nums[r];
        }
        r++;
    }
    return l+1; //长度等于下标+1
}
```
双指针，r一直走，l做记录

```js
/**
 * @param {number[]} nums
 * @return {number}
 */

//有序情况，需要改变nums的ref的情况
var removeDuplicates = function(nums) {
    if(nums.length === 0) return 0;
    var current = nums[0];
    for(let i=1; i<nums.length; i++) {
        //splice后需要指针前移一位，因为splice掉一个值后
        //i自然指向下一位了，如果不--，下次循环又++后，会跳过一个值
        if(nums[i] === current) {
            nums.splice(i,1);
            i--;
        } else {
            current = nums[i];
        }
    }
    return nums.length;
}
```

有序用current记录，指针滑动，遇到相同的splice，否则更新current


```js
/**
 * @param {number[]} nums
 * @return {number}
 */

//无序情况，需要改变nums的ref的情况
var removeDuplicates = function(nums) {
    var res = 0,
        hash = {};
    for(let i=0; i<nums.length; i++) {
        if(hash[nums[i]]) {
            //splice后需要指针后移，不然会跳过一个值
            nums.splice(i,1);
            i--;
        } else {
            hash[nums[i]] = true;
        }
    }
    return nums.length;
};

console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))

//无需改变ref的去重
var removeDuplicates = function(nums) {
    return nums = [...new Set(nums)];
}
removeDuplicates([1,1,2])
```

无序用hash记录，指针滑动，遇到相同的splice，否则更新记入hash

### 027.Remove Element
<img src="http://lrun1124.github.io/img/leetcode/027.png" width="500"/>

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for(let i = 0; i<nums.length; i++) {
        if(nums[i] === val) {
            nums.splice(i, 1);
            i--;
        }
    }
    return nums.length;
};
```

```js
var removeElement = function(nums, val) {
    let l = 0, r = 0, len = nums.length;
    while (r < len) {
        if (nums[r] != val) {
            nums[l] = nums[r];
            l++;
        }
        r++;
    }
    return l;
}
```

1. 用splice, splice后记得--
2. 两个指针l和r, r一直走，l做记录

### 031.Next Permutation
<img src="http://lrun1124.github.io/img/leetcode/031.png" width="500"/>

```JS
Input: nums = [1,2,3]
Output: [1,3,2]
Input: nums = [3,2,1]
Output: [1,2,3]

//123465

var nextPermutation = function(nums) {
    debugger;
    let len = nums.length;
    if(len === 0) return;
    let p = q = len-1;
    while(p > 0 && nums[p] <= nums[p-1]) p--; //先从后往前，找后一个比前一个大的位置p-1
    if(p > 0) { //如果找不到说明本身就是逆序，跳过这步
        while(q >= p && nums[q] <= nums[p-1]) q--; //再从后往前，找第一个比位置q
        [nums[p-1], nums[q]] = [nums[q], nums[p-1]];
    }
    for(let i=p,j=len-1; i<j; i++,j--) { //revese [p-1, len-1]这部分
        [nums[i], nums[j]] = [nums[j], nums[i]]; //交换的es5结构写法
    }
}

nextPermutation([5,1,1])

```
Permutation是字典字，next Permutation就是按字典序排列的下一个排列

思路：

主要思想是先找到要替换的位置，再找到最小的替换数,123465为例，先从后向前找到6>4, 再从后向前找到5第一个大于4，交换4，6让数字变大，变成123564，再把5后面的部分升序排列，这样数字再尽可能小

1. 先从后往前，找后一个比前一个大的位置p-1
1. 再从后往前，找第一个比位置q
1. 交换p-1 和 q
1. 将p-1之后的数组升序
1. 如没有进入前四步，说明输入已经是最大的字典序，直接输出倒序

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    if(nums.length === 1) return nums;
    for(let i=nums.length-1; i>0; i--) {
        if(nums[i]>nums[i-1]) {
            for(let j=nums.length-1; j>i-1; j--) {
                if(nums[j]>nums[i-1]){
                    swap(nums, i-1, j);
                    var tempArr = nums.slice(i);
                    tempArr.sort(function(a,b){return a-b;})
                    nums.splice(i, tempArr.length, ...tempArr);
                    return nums;
                }
            }
        }
    }
    return nums.reverse();
};
var swap = function(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}
console.log(nextPermutation([1,2,3]))

```

### 035.Search Insert Position

<img src="http://lrun1124.github.io/img/leetcode/035.png" width="500"/>

```JS
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    debugger;
    var left = 0,
        right = nums.length - 1,
        mid;
    while(left <= right) {
        mid = (left + right) >> 1;
        if(nums[mid] === target) return mid;
        if(nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return right + 1;
};

console.log(searchInsert([1,3,5,6],2))
```

二分查找，最终right所在的位置一定是target前的位置，注意二分如果mid-1，那么left<=right, =不能丢

### 039.Combination Sum

<img src="http://lrun1124.github.io/img/leetcode/039.png" width="500"/>

combination组合问题就是递归，递归遍历一棵树的模板如下

```js
/**
 * @param begin      搜索起点
 * @param target     目标值，用于判断终止或者push结果
 * @param path       记录结果
 */
const dfs = (begin, sum, path) => {
    if(终止条件) {
        //一些操作，比如push进res
        return;
    }
    for(从begin开始循环) {
        //加一些剪枝
        path.push(当前); //当前入栈
        dfs(...);
        path.pop() //上一次return，说明不满足，最后一次结果出栈
    }
}
```

```JS
var combinationSum = function(candidates, target) {
    var res = [];
    const dfs = (begin, target, path) => {
        //终止条件
        if(target < 0) return;
        if(target === 0) {
            res.push(path.slice());
            return;
        }
        for(let i = begin; i < candidates.length; i++) {
            path.push(candidates[i]);
            //console.log(path); //打印出所有路径序列
            dfs(i, target - candidates[i], path);
            path.pop();
        }
    }
    dfs(0, target, []);
    return res;
}
console.log(combinationSum([2,3,6,7],7));
```

递归思想，先想好终止条件，往往来自题目，回溯

<img src="http://lrun1124.github.io/img/leetcode/039_1.png" width="500"/>

以上方法是列出所有的回溯结果，考虑到如果 target 减去一个数得到负数，那么减去一个更大的树依然是负数，同样搜索不到结果。基于这个想法，我们可以对输入数组进行排序，添加相关逻辑达到进一步剪枝的目的

```JS
var combinationSum = function(candidates, target) {
    var res = [];
    candidates.sort((a, b) => {return a - b});
    const dfs = (begin, target, path) => {
        //终止条件
        if(target < 0) return;
        if(target === 0) {
            res.push(path.slice());
            return;
        }
        for(let i = begin; i < candidates.length; i++) {
            //剪枝
            if(target - candidates[i] < 0) break;
            path.push(candidates[i]);
            dfs(i, target - candidates[i], path);
            path.pop();
        }
    }
    dfs(0, target, []);
    return res;
}
console.log(combinationSum([10,1,2,7,6,1,5],8));
```

### 040.Combination Sum II

<img src="http://lrun1124.github.io/img/leetcode/040.png" width="500"/>

```JS
var combinationSum2 = function(candidates, target) {
    var res = [];
    candidates.sort((a, b) => {return a - b});

    const dfs = (begin, target, path) => {
        //终止条件
        if(target < 0) return;
        if(target === 0) {
            res.push(path.slice());
            return;
        }
        for(let i = begin; i < candidates.length; i++) {
            // 大剪枝：减去 candidates[i] 小于 0，减去后面的 candidates[i + 1]、candidates[i + 2] 肯定也小于 0，因此用 break
            if(target - candidates[i] < 0) break;
            // 小剪枝：同一层相同数值的结点，从第 2 个开始，候选数更少，结果一定发生重复，因此跳过，用 continue
            if(i > begin && candidates[i] === candidates[i-1]) continue;
            path.push(candidates[i]);
            // 因为元素不可以重复使用，这里递归传递下去的是 i + 1 而不是 i
            dfs(i + 1, target - candidates[i], path);
            path.pop();
        }
    }
    dfs(0, target, []);
    return res;
}
console.log(combinationSum([10,1,2,7,6,1,5],8));

```

### 216. Combination Sum III

<img src="http://lrun1124.github.io/img/leetcode/216.png" width="500"/>

```js
Input: k = 3, n = 7
Output: [[1,2,4]]
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    var res = [];
    const dfs = (begin, sum, path) => {
        //console.log(path);
        if(path.length === k) {
            if(sum === 0) {
                res.push(path.slice(0));
                return;
            }
            if(sum < 0) {
                return;
            }
        }
        for(let i=begin; i<=9; i++) {
            path.push(i);
            dfs(i+1, sum-i, path);
            path.pop();
        }
    }
    dfs(1,n,[]);
    return res;
};
combinationSum3(3,7)
```

### 041.First Missing Positive
<img src="http://lrun1124.github.io/img/leetcode/041.png" width="500"/>

```js
/**
 * @param {number[]} nums
 * @return {number}
 */

var firstMissingPositive = function(nums) {
    debugger;
    for(let i=0; i<nums.length; i++) {
        //位置不对就交换，用while是因为交换后，i位置变成交换来的数，这个数也要找到自己的位置
        //所以while最多执行两次，复杂度不会是O(n)不会是O(n2)
        while(nums[i]>0 && nums[i]<=nums.length && nums[i] !== nums[nums[i]-1]) {
            let temp = nums[nums[i]-1];
            nums[nums[i]-1] = nums[i];
            nums[i] = temp;
            // let t = nums[i]-1;
            // [nums[i], nums[t]] = [nums[t], nums[i]]
        }
    }
    //第一个位置不对的数位置+1
    for(let i =0; i<nums.length; i++) {
        if(nums[i] !== i+1) return i+1; //注意返回的是key
    }
    return nums.length + 1;
};
console.log(firstMissingPositive([3,4,-1,1]))

执行顺序
[3,4,-1,1]
[-1,4,3,1]
[-1,1,3,4]
[1,-1,3,4]

```

原地hash，哈希的规则是nums[i] = i+1, 因为第一个位置坐1，所以不是nums[i] = i

占座思想，让nums[i]都坐在i-1的位置上，最后第一个不满足规则的数的位置+1，就是结果

### 004.Median of Two Sorted Arrays

<img src="http://lrun1124.github.io/img/leetcode/004.png" width="500"/>

```JS
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

var findMedianSortedArrays = function(nums1, nums2) {
    debugger;
    var i = 0, //nums1的指针
        j = 0, //nums2的指针
        m = nums1.length,
        n = nums2.length,
        len = m+n,
        last, //上一次循环到的数，用于len为偶数时的中位数计算
        current; //现在循环到的数

    for(let k=0; k<=len/2; k++){
        last = current; //记下上一次循环的数
        if(i<m && j<n) { //如果两个数组都没结束，谁小谁指针移动
            current = nums1[i]< nums2[j] ?  nums1[i++] : nums2[j++];
        } else { //如果一个数组结束了，另一个一直向后
            current = i<m ? nums1[i++] : nums2[j++];  
        } 
    }
    if(len%2 === 0) { //偶数
        return (last + current)/2.0;
    } else { //奇数
        return current;
    }
};
console.log(findMedianSortedArrays([1,2],[3,4]))
```

O(m+n)的解法：找中位数就是找nums1和nums2合并起来的下标为len/2的数，所以遍历len/2+1次，找到这个数，同时记录他前面的数，再分别处理奇偶情况

O(log(m+n))的解法

```js

```



### 048.Rotate Image

<img src="http://lrun1124.github.io/img/leetcode/048.png" width="500"/>

```js
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]] 
Output: [[7,4,1],[8,5,2],[9,6,3]]

Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

过程：
1,2,3  1,4,7  7,4,1
4,5,6  2,5,8  8,5,2
7,8,9  3,6,9  9,6,3 

var rotate = function(matrix) {
    //左上右下对角线翻转一次(转置)
    for(let i=0; i<matrix.length; i++) {
        for(let j=i; j<matrix.length; j++) {
            //matrix[i][j]别写成matrix[i,j]!!!
            [matrix[i][j],matrix[j][i]] = [matrix[j][i],matrix[i][j]];
        }
    }
    //横向中线翻转一次
    for(let i=0; i<matrix.length; i++) {
        for(let left=0, right=matrix[0].length-1; left < right; left++, right--) {
            [matrix[i][left], matrix[i][right]] = [matrix[i][right], matrix[i][left]];
        }
    }
}
//拓展：左转
var rotate = function(matrix) {
    for(let i=0; i<matrix.length; i++) {
        for(let j=i; j<matrix.length; j++) {
            [matrix[i][j],matrix[j][i]] = [matrix[j][i],matrix[i][j]];
        }
    }
    //竖向中线翻转一次
    for(let i=0; i<matrix[0].length; i++) {
        for(let up=0, down=matrix.length-1; up < down; up++, down--) {
            [matrix[up][i], matrix[down][i]] = [matrix[down][i], matrix[up][i]];
        }
    }
}
rotate([[1,2,3],[4,5,6],[7,8,9]])
```
右翻：左上右下对角线翻转一次（转置），横向中线翻转一次（反转每行）
左翻：左上右下对角线翻转一次（转置），竖向中线翻转一次（反转每列）

### 55.Jump Game

<img src="http://lrun1124.github.io/img/leetcode/055.png" width="500"/>

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let max = 0; //代表最远能到的距离
    for(let i=0; i<nums.length; i++) {
        if (i > max) return false;
        max = Math.max(max, i+nums[i]);
    }
    return true;
};
console.log(canJump([2,3,1,1,4]));
```

用一个max距离，记录目前能到的最远距离，遍历数组，每次更新max的情况，当i>max, 意味着当前位置到不了了，那么后面也就肯定到不了了

### 56.Merge Intervals
<img src="http://lrun1124.github.io/img/leetcode/056.png" width="500"/>

```js
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

var merge = function(intervals) {
    var current,
        next;
    intervals.sort((a,b) => {
        return a[0] - b[0];
    });
    for(let i=0; i<intervals.length-1; i++) {
        current = intervals[i];
        next = intervals[i+1];
        if(current[1] >= next[0]) {
            current[1] = Math.max(next[1],current[1])
            intervals.splice(i+1,1);
            i--;
        }
    }
    return intervals;
};
console.log(merge([[1,4],[0,2],[3,5]]));
```

首先按第一个数字的大小排序，然后判断前后两个元素，如果前元素的第二个值大于后元素的第一个值，就说明需要合并，这时候两种情况一种是部分重叠[1,4],[2,6]，一种后一个包含在前一个之内[1,4],[2,3],所以直接取两个元素第二个值的max，然后splice掉第二个值，记得--，因为下次还需要从合并后的数组元素开始检测。

### 57.Insert Interval
<img src="http://lrun1124.github.io/img/leetcode/057.png" width="500"/>

```js
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]

var insert = function(intervals, newInterval) {
    let len = intervals.length,
        i = 0,
        res = [];
    //第一部分，不和newInterval重叠，在newInterval前面的部分，直接push
    while(i<len && intervals[i][1] < newInterval[0]) {
        res.push(intervals[i]);
        i++;
    }
    //第二阶段，确定重叠部分
    if(i < len) { //确定左侧
        newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    }
    while(i<len && intervals[i][0] <= newInterval[1]) { //确定右侧
        newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
        i++;
    }
    res.push(newInterval);
    //第三阶段，不和newInterval重叠，在newInterval后面的部分，直接push
    while(i < len) {
        res.push(intervals[i]);
        i++;
    }
    return res;
};
insert([[1,3],[6,9]],[2,5])
```
分成3个阶段，不重叠 -> 重叠 -> 不重叠，关键在于判断两次边界


### 53. Maximum Subarray
<img src="http://lrun1124.github.io/img/leetcode/053.png" width="500"/>

```js
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let sum = 0,
        res = nums[0];
    for(let num of nums) {
        if(sum > 0) { //sum为正意味着可以加上之前的sum
            sum += num;
        } else {  //sum为负意味着可以加上会更小，要舍弃
            sum = num;
        }
        res = Math.max(res, sum);
    }
    return res;
};
console.log(maxSubArray([1]))
```

DP思想，如果前面的sum是负的，意味着对结果是副作用，直接舍弃了前面的结果，从这个数字开始重新计算
```
 [-2,1,-3,4,-1,2,1,-5,4]
取-2，sum = -2，变负增益，下次舍弃
取1， sum = 1
取-3，sum = 1 +（-3） = -2， 变负增益，下次舍弃
取4， sum = 4
取-1，sum = 4 + （-1） = 3
...
```

### 54. Spiral Matrix
<img src="http://lrun1124.github.io/img/leetcode/054.png" width="500"/>

```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output: [1,2,3,6,9,8,7,4,5]

[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]

var spiralOrder = function(matrix) {
    debugger;
    if(matrix.length === 0) return [];
    //定义上下左右四条边界
    let up = 0,
        down = matrix.length - 1,
        left = 0,
        right = matrix[0].length - 1,
        res = [];
    while(true) {
        for(let i=left; i<=right; i++) { res.push(matrix[up][i])};//向右
        if(++up > down) break;
        for(let i=up; i<=down; i++) {res.push(matrix[i][right])};//向下
        if(--right < left) break;
        for(let i=right; i>=left; i--) {res.push(matrix[down][i])};//向左
        if(--down < up) break;
        for(let i=down; i>=up; i--) {res.push(matrix[i][left])};//向上
        if(++left > right) break;
    }
    return res;
};
```

定义上下左右四条边界，关键的点是，每次遍历一条边后，将当前边从矩阵中移除（通过挪动边界）
然后判断是否过界，过界直接break

### 59. Spiral Matrix II
<img src="http://lrun1124.github.io/img/leetcode/059.png" width="500"/>

```js
Input: 3
Output:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    debugger;
    if(n===0) return [];
    let up = 0,
        down = n-1,
        left = 0,
        right = n-1,
        res = [],
        count = 1;
    for(let i=0; i<n; i++) {
        res.push(new Array(n));
    }
    while(count <= n*n) {
        for(let i=left; i<=right; i++) {
            res[up][i] = count;
            count++;
        }
        up++;
        for(let i=up; i<=down; i++) {
            res[i][right] = count;
            count++;
        }
        right--;
        for(let i=right; i>=left; i--) {
            res[down][i] = count;
            count++;
        }
        down--;
        for(let i=down; i>=up; i--) {
            res[i][left] = count;
            count++;
        }
        left++;
    }
    return res; 
};
console.log(generateMatrix(3))
```

原理同上，设定4条边界，终止条件是n*n

### 62. Unique Paths
<img src="http://lrun1124.github.io/img/leetcode/062_1.png" width="500"/>
<img src="http://lrun1124.github.io/img/leetcode/062_2.png" width="500"/>

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    debugger;
    let dp = [];
    for(let i=0; i<m; i++) {
        dp.push(new Array(n).fill(1));
    }
    for(let i=1; i<m; i++) {
        for(let j=1; j<n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
};
console.log(uniquePaths(3,7))
```

dp思想，用dp[i][j]表示到i，j的路线数，那么dp[i][j] = dp[i-1][j] + dp[i][j-1]

### 63. Unique Paths II
<img src="http://lrun1124.github.io/img/leetcode/063.png" width="500"/>

```js
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    if(!obstacleGrid && obstacleGrid.length === 0) return 0;
    let m = obstacleGrid.length,
        n = obstacleGrid[0].length,
        dp = [];
    for(let i=0; i<m; i++) {
        dp.push(new Array(n).fill(0));
    }
    //第一列，碰到障碍前都设为1
    for(let i=0; i<m && obstacleGrid[i][0] === 0; i++) {
        dp[i][0] = 1;
    }
    //第一行，碰到障碍前都设为1
    for(let i=0; i<n && obstacleGrid[0][i] === 0; i++) {
        dp[0][i] = 1;
    }
    for(let i=1; i<m; i++) {
        for(let j=1; j<n; j++) {
            dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
};
```

DP思想同上，第一行第一列，如果碰到障碍，后面的位置就都到不了，设为0

### 64. Minimum Path Sum
<img src="http://lrun1124.github.io/img/leetcode/064.png" width="500"/>

```js
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    if(!grid) return 0;
    var m = grid.length,
        n = grid[0].length,
        dp = [];
    for(let i=0; i<m; i++) {
        dp.push(new Array(n));
    }
    dp[0][0] = grid[0][0];
    for(let i=1; i<m; i++) {
        dp[i][0] = grid[i][0] + dp[i-1][0];
    }
    for(let i=1; i<n; i++) {
        dp[0][i] = grid[0][i] + dp[0][i-1];
    }
    for(let i=1; i<m; i++) {
        for(let j=1; j<n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m-1][n-1];
};
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]))
```

DP思想，dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1]);

### 66. Plus One
<img src="http://lrun1124.github.io/img/leetcode/066.png" width="500"/>

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
Input: digits = [1,2,3]
Output: [1,2,4]
var plusOne = function(digits) {
    debugger;
    for(let i=digits.length-1; i>=0; i--) {
        if(digits[i] !== 9) {
            digits[i]++;
            break;
        }
        digits[i] = 0;
        if(i===0) digits.splice(0,0,1);
    }
    return digits;
};
console.log(plusOne([1,9,9]))
```

碰到非9就+1然后break，否则继续，如果最高位还没break，插入1

### 73. Set Matrix Zeroes
<img src="http://lrun1124.github.io/img/leetcode/073.png" width="500"/>

```js
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    debugger;
    var m = matrix.length,
        n = matrix[0].length;
    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            if(matrix[i][j] === 0) {
                for(let k=0; k<m; k++) matrix[k][j] = 'a';
                for(let p=0; p<n; p++) matrix[i][p] = 'a';
            }
        }
    }
    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            if(matrix[i][j] === 'a') {
                matrix[i][j] = 0;
            }
        }
    }            
};
test = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(test);
console.log(test);
```

题目要求有限空间
O(m+n)解法是用一个set记录下值0所在的横竖坐标
O(1)解法是遍历中将值为0的横竖都变成一另一个值，最后再遍历一次将0换回来

### 74. Search a 2D Matrix
<img src="http://lrun1124.github.io/img/leetcode/074.png" width="500"/>

```js
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,50]], target = 3
Output: true
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if(!matrix || matrix.length===0) return false;
    let m = matrix.length,
        n = matrix[0].length,
        left = 0,
        right = m*n-1,
        mid;
    while(left <= right) { //注意是<=,不然会丢一次循环
        mid = (left + right) >> 1;
        x = Math.floor(mid/n);
        y = mid % n;
        if(matrix[x][y] === target) return true;
        if(matrix[x][y] > target) right = mid-1;
        else left = mid+1;
    }
    return false;
};
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,50]],3))
```

两种思路，一种两次二分，先找到行，在对行内二分; 另一种，对整个矩阵进行二分，计算坐标，x = Math.floor(mid/n); y = mid % n;

### 75. Sort Colors
<img src="http://lrun1124.github.io/img/leetcode/075.png" width="500"/>

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
var sortColors = function(nums) {
    if(!nums || nums.length === 0) return;
    let len = nums.length,
        zero = 0, //指向下一个0该在的位置
        two = len - 1; //指向下一个2该在的位置
    for(let i=0; i<=two; i++) {
        if(nums[i] === 0) {
            nums[i] = nums[zero];
            nums[zero] = 0;
            zero++;
        } else if(nums[i] === 2){
            nums[i] = nums[two];
            nums[two] = 2;
            two--;
            i--; //换过来的可能还是2，所以i--继续
        }
    }
};


var test = [2,0,1];
sortColors(test);
console.log(test);
```

双指针两个指针分别指向 下一个0、2应该存放的位置

遇0则交换 当前元素 和 p0空间的值，并 使得 p0指针 指向 下一个0应该存放的位置，遍历下一个元素
遇2则交换 当前元素 和 p2空间的值，并 使得 p2指针 指向 下一个2应该存放的位置，继续遍历 交换后的当前元素

### 78. Subsets

<img src="http://lrun1124.github.io/img/leetcode/078.png" width="500"/>

```js
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Input: nums = [0]
Output: [[],[0]]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    if(nums.length === 0) return [[]];
    var res = [[]];
    for(let i=0; i<nums.length; i++) {
        var temp = [];
        for(let j=0; j<res.length; j++) {
            temp.push([...res[j], nums[i]]);
        }
        res = [...res, ...temp];
    }
    return res;
};
console.log(subsets([1,2,3]))
```

DP思想, [1,2,3] 是[1,2]的subset+3, 初始化结果[[], [nums[0]]]

### 90. Subsets II
<img src="http://lrun1124.github.io/img/leetcode/090.png" width="500"/>

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

Input: [1,2,2]
Output:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]

var subsetsWithDup = function(nums) {
    if(nums.length === 0) return [[]];
    nums.sort((a,b) => {return a-b;}) //先排序
    var res = [[], [nums[0]]],
        last = [[nums[0]]]; //记下上一次的子序列，用于处理重复
    for(let i=1; i<nums.length; i++) {
        var temp = [],
            start = 0;
        if(nums[i] === nums[i-1]) { //规律是碰到和上一个相同的数，那就从上一次新加的子数组中生产
           for(let j=0; j<last.length; j++) {
               temp.push([...last[j], nums[i]]);
           }
        } else { //否则从整个结果数组生产子集
            for(let j=0; j<res.length; j++) {
                temp.push([...res[j], nums[i]]);
            }
        }
        res = [...res, ...temp];
        last = temp.slice(0);
    }
    return res;
};
console.log(subsetsWithDup([4,4,4,1,4]))
```
动态规划，跟78题Subsets比主要是处理重复的情况, 先排序, 规律是碰到和上一个相同的数，那就从上一次新加的子数组中生产，而不是从整个结果数组生产子集，每次记下上一次的子数组，击败99.7%

### 79. Word Search 

<img src="http://lrun1124.github.io/img/leetcode/079.png" width="500"/>

```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
var exist = function(board, word) {
  const m = board.length;
  const n = board[0].length;
  const used = new Array(m); // 二维矩阵used，存放bool值
  for (let i = 0; i < m; i++) {
    used[i] = new Array(n);
  }
  // dfs 判断当前点是否是目标路径上的点
  const dfs = (row, col, i) => { // row col 当前点的坐标，i当前考察的word字符索引
    if (i == word.length) return true;// 递归结束条件
    if (row < 0 || row >= m || col < 0 || col >= n) return false; // 当前点要存在，不越界
    if (used[row][col] || board[row][col] != word[i]) return false; // 当前点已经访问过，或，非目标点
    // 排除掉上面的false情况，当前点是合格的，可以继续递归考察
    used[row][col] = true;  // 记录一下当前点被访问了
    const canFindRest = dfs(row + 1, col, i + 1) || dfs(row - 1, col, i + 1) ||
      dfs(row, col + 1, i + 1) || dfs(row, col - 1, i + 1); 
    if (canFindRest) return true;// 基于当前点[row,col]，可以为剩下的字符找到路径
    used[row][col] = false; // 不能为剩下字符找到路径，返回false，撤销当前点的访问状态，继续考察别的分支
  };

  for (let i = 0; i < m; i++) {   // 找 dfs 的入口
    for (let j = 0; j < n; j++) {
      if (board[i][j] == word[0] && dfs(i, j, 0)) { // 找到起点，递归结果true，找到目标路径
        return true; 
      }
    }
  }
  return false; // 怎么样都没有返回true，则返回false
};
exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCCED")
```
回溯经典题，标记

### 80. Remove Duplicates from Sorted Array II
<img src="http://lrun1124.github.io/img/leetcode/080.png" width="500"/>

```js
[0,0,1,1,1,1,2,3,3]
//双指针
var removeDuplicates = function(nums) {
    debugger;
    let l = 1,
        r = 1,
        count = 1;
    while(r < nums.length) {
        if(nums[r] === nums[r-1]) {
            count++;
        } else {
            count = 1;
        }
        if(count <= 2) {
            nums[l] = nums[r];
            l++;
        }
        r++;
    }
    return l;
}
removeDuplicates([1,1,1,2,2,3])
```

```js
//用splice
/**
 * @param {number[]} nums
 * @return {number}
 */
//用splice,对有序的，O(1)空间的解法
var removeDuplicates = function(nums) {
    if(nums.length == 0) return 0;
    var count = 1; //记录出现次数
    for(let i=1; i<nums.length; i++) {
        if(nums[i] === nums[i-1]) {
            if(count >= 2) {
                nums.splice(i,1);
                i--;
                continue;
            }
            count++;
        } else {
            count = 1;
        }
    }
    return nums.length;
};
console.log(removeDuplicates([0,0,1,1,1,1,2,3,3]));
```

```js
//拓展，对于无序的，不考虑O(1)空间的解法，用hash
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    debugger;
    let hash = {};
    for(let i=0; i<nums.length; i++) {
        if(!hash[nums[i]]) {
            hash[nums[i]] = 1;
        } else if(hash[nums[i]] < 2) {
            hash[nums[i]]++;
        } else {
            nums.splice(i,1);
            i--;
        }
    }
    return nums.length;
};
console.log(removeDuplicates([0,0,1,1,1,1,2,3,3]));
```


### 118. Pascal's Triangle

<img src="http://lrun1124.github.io/img/leetcode/118.png" width="500"/>

```js
Input: 5
Output:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    if(numRows === 0 ) return [];
    var res = [[1]];
    for(let i=1; i<numRows; i++) {
        var row = new Array(i+1);
        for(let j=0; j<i+1; j++) {
            if(j===0 || j===i) {
                row[j] = 1;
            } else {
                row[j] = res[i-1][j] + res[i-1][j-1];
            } 
        }
        res.push(row);
    }
    return res;
};
console.log(generate(5));
```
动态规划，动态方程row[j] = res[i-1][j] + res[i-1][j-1];

### 119. Pascal's Triangle II

<img src="http://lrun1124.github.io/img/leetcode/119.png" width="500"/>

```js
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
Input: rowIndex = 3
Output: [1,3,3,1]
var getRow = function(rowIndex) {
    if(rowIndex === 0 ) return [1];
    var res = [[1]];
    for(let i=1; i<=rowIndex; i++) {
        var row = new Array(i+1);
        for(let j=0; j<i+1; j++) {
            if(j===0 || j===i) {
                row[j] = 1;
            } else {
                row[j] = res[i-1][j] + res[i-1][j-1];
            } 
        }
        res.push(row);
    } 
    return res[rowIndex];
};
console.log(getRow(3))
```
同118 DP

### 120. Triangle
<img src="http://lrun1124.github.io/img/leetcode/120.png" width="500"/>

```js
//DP解法
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    let len = triangle.length;
    if(len === 0) return 0;
    if(len === 1) return triangle[0][0];
    const dp = triangle.slice();
    for(let i=len-2; i>=0; i--) {
        for(let j=0; j<=i; j++) {
            dp[i][j] = triangle[i][j] + Math.min(dp[i+1][j], dp[i+1][j+1]);
        }
    }
    return dp[0][0];
};
var test =  [
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
];
minimumTotal(test)
```
dp公式dp[i][j] = triangle[i][j] + Math.min(dp[i+1][j], dp[i+1][j+1]);

```js
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
2->3->5>1
//递归解法
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    var helper = (i, j) => {
        if(i === triangle.length - 1) {
            return triangle[i][j];
        }
        return triangle[i][j] + Math.min(helper(i+1,j), helper(i+1,j+1));
    }
    return helper(0, 0);
};
```
递归, triangle[i][j]到底部的最小距离，等于triangle[i][j]+ 下一层的邻居triangle[i+1][j]和triangle[i+1][j+1]到底部距离的较小值，递归会超时


### 121. Best Time to Buy and Sell Stock

<img src="http://lrun1124.github.io/img/leetcode/121.png" width="500"/>

```js

Input: [7,1,5,1,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let len = prices.length;
    if(len <= 1) return 0;
    let minPrice = prices[0], //记下最低的买入价格
        res = 0;
    for(let i=1; i<len; i++) {
        let cur = prices[i] - minPrice;
        if(cur > res) { //同时记住最大的值
            res = cur;
        }
        minPrice = Math.min(prices[i], minPrice);
    }
    return res;
}
maxProfit([7,1,5,1,3,6,4])
```

只能单次买卖，遍历过程要记下最低的价格，用于计算当前利润，更新最大的利润

### 122. Best Time to Buy and Sell Stock II
<img src="http://lrun1124.github.io/img/leetcode/122.png" width="500"/>

```js
Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let len = prices.length;
    if(len <= 1) return 0;
    let dp = [0];
    for(let i=1; i<prices.length; i++) {
        //如果比昨天跌了，那就是昨天的收益不变，如果涨了就是今天卖，加上今天和昨天的差价，因为如果昨天卖了，那么今天价格更高，就等今天卖，加差值，如果昨天没卖，那就加上一笔昨天买，今天卖的收益，还是加差值。
        dp[i] = prices[i] < prices[i-1] ? dp[i-1] : (dp[i-1] + prices[i] - prices[i-1]);
    }
    return dp[len-1];
};
maxProfit([7,1,5,3,6,4]);
```
可以多次买卖，dp公式  dp[i] = prices[i] < prices[i-1] ? dp[i-1] : (dp[i-1] + prices[i] - prices[i-1]); 和上一题的区别在于，不用记住最小的买入值了，直接算卖出差价就知道当前的值, 为什么？
因为如果昨天卖了，那么今天价格更高，就等今天卖，加差值，如果昨天没卖，那就加上一笔昨天买，今天卖的收益，还是加差值。

### 123. Best Time to Buy and Sell Stock III
<img src="http://lrun1124.github.io/img/leetcode/123.png" width="500"/>

```js
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

[
    没有操作过，0
    第一次买入，1
    第一次卖出，2
    第二次买入，3
    第二次卖出 4
]
//错误，以每天的操作来算
dp[i][0] = dp[i-1][0], dp[i-1][2], dp[i-1][4]); //昨天可能不操作，或者卖出
dp[i][1] = dp[i-1][0] - prices[i] //昨天肯定没操作
dp[i][2] = Math.max(dp[i-1[0]], dp[i-1][1]) + prices[i] //要么昨天第一次买，要么之前买的昨天没动
dp[i][3] = Math.max(dp[i-1][0], dp[i-1][2]) - prices[i] //要么昨天不动，要么昨天第一次卖
dp[i][4] = Math.max(dp[i-1][0], dp[i-1][3]) + prices[i] //要么昨天第二次买，要么之前买的昨天没动

//正确，要以每天结束的状态来算!!
dp[i][0] = dp[i-1][0] //之前都没操作过
dp[i][1] = Math.max(dp[i-1][0] - prices[i], dp[i-1][1]) //今天买的，或者之前买的
dp[i][2] = Math.max(dp[i-1][1] + prices[i], dp[i-1][2])//今天卖的，昨天第一次买入的状态, 或者之前卖的，昨天已经是第一次卖出状态
dp[i][3] = Math.max(dp[i-1][2] - prices[i], dp[i-1][3])//今天买的，昨天要处于第一次卖出状态，或者之前买的
dp[i][4] = Math.max(dp[i-1][3] + prices[i], dp[i-1][4]) //今天卖的，昨天第二次买入的状态, 或者之前卖的，昨天已经是第二次卖出状态

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let len = prices.length;
    if(len <= 1) return 0;
    let dp = [];
    dp.push([0, -prices[0], 0, -prices[0], 0]);
    for(let i=1; i<len; i++) {
        dp.push([
            dp[i-1][0],
            Math.max(dp[i-1][0] - prices[i], dp[i-1][1]),
            Math.max(dp[i-1][1] + prices[i], dp[i-1][2]),
            Math.max(dp[i-1][2] - prices[i], dp[i-1][3]),
            Math.max(dp[i-1][3] + prices[i], dp[i-1][4])
        ]);
    }
    return Math.max(dp[len-1][0], dp[len-1][2], dp[len-1][4]);
};
maxProfit([3,3,5,0,0,3,1,4]);
```

### 309. Best Time to Buy and Sell Stock with Cooldown


<img src="http://lrun1124.github.io/img/leetcode/309.png" width="500"/>

```js
Input: [1,2,3,0,2]
Output: 3 
Explanation: transactions = [buy, sell, cooldown, buy, sell]

考虑每天结束时的状态，先分持股和不持股两种情况，再分今天操作不操作两种状态
[
    持股&今天买的，0
    持股&之前买的，1
    不持股&今天卖的，2
    不持股&之前卖的 3
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
    dp.push([-prices[0],  -prices[0], 0, 0]); 
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

### 033.Search in Rotated Sorted Array
<img src="http://lrun1124.github.io/img/leetcode/033.png" width="500"/>

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    debugger;
    var left = 0,
        right = nums.length-1,
        mid;
    while(left <= right) {
        mid = (left + right) >> 1;
        if(nums[mid] === target) return mid;
        if(nums[mid] > nums[right]) { //左边有序
            if(nums[left] <= target && nums[mid] >= target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else { //右边有序
            if(nums[mid] <= target && nums[right] >= target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return  -1;
};
console.log(search([4,5,6,7,0,1,2],0));
```

继续用二分查找，目的是判断target在前半段还是后半段

<img src="http://lrun1124.github.io/img/leetcode/032_1.png" width="500"/>

观察规律，当中间的数大于最右边大的数，左边有序，否则右边有序，把target跟有序的数组的头尾比较，就能确认target是否在有序这边

### 153. Find Minimum in Rotated Sorted Array
<img src="http://lrun1124.github.io/img/leetcode/153.png" width="500"/>

```js
Input: nums = [3,4,5,1,2]
Output: 1
Input: nums = [11,13,15,17]
Output: 11
/**
 * @param {number[]} nums
 * @return {number}
 */

var findMin = function(nums) {
    let left = 0,
        right = nums.length - 1,
        mid;
    while(left < right) {
        mid = (left + right) >> 1;
        if(nums[mid] > nums[right]) left = mid+1;
        else right = mid; //注意这里right = mid，不是right = mid-1,因为有可能就是mid自己
    }
    return nums[left];
}

findMin([3,4,5,1,2]);
```
三种情况可以合并，二分一直缩小范围

### 152. Maximum Product Subarray
<img src="http://lrun1124.github.io/img/leetcode/152.png" width="500"/>

```js
Input: [2,3,-2,4]
Output: 6
Input: [-2,0,-1]
Output: 0
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let len = nums.length,
        dpMax = [nums[0]],
        dpMin = [nums[0]],
        res = nums[0];
    for(let i=1; i<len; i++) {
        dpMax[i] = Math.max(dpMax[i-1]*nums[i], dpMin[i-1]*nums[i], nums[i]);
        dpMin[i] = Math.min(dpMax[i-1]*nums[i], dpMin[i-1]*nums[i], nums[i]);
        if(dpMax[i] > res) res = dpMax[i];
    }
    return res;
};
maxProduct([2,3,-2,4]);
```
DP思想，因为负数相乘可能更大，所以要同时记住最大最小的数

### 169. Majority Element

<img src="http://lrun1124.github.io/img/leetcode/169.png" width="500"/>

```js
//先排序，中间肯定是众数
Input: [3,2,3]
Output: 3
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    nums.sort((a,b)=>{return a-b;});
    return nums[Math.floor(nums.length/2)];
};
majorityElement([3,2,3]);
```

解法一：先排序，取中间值

```js
//摩尔投票
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    var res = nums[0],
        count = 1;
    for(let i=1; i<nums.length; i++) {
        if(res === nums[i]) {
            count++;
        } else { 
            count--;
        }
        if(count > Math.floor(nums.length/2)) return res;
        if(count === 0) {
            res = nums[i];
            count = 1;
        }
    }
    return res;
};
majorityElement([3,2,3]);
```
解法二：摩尔投票，如果碰到相同的就count+1，否则-1，到0换新数字，原理很简单，因为majority num的数目肯定是大于一半以上的，也就是说会有一半以上的人投支持票+1，也就是投反对票-1的人少于一半，+1-1抵消，那最后剩下的多的肯定是majority num

### 229.Majority Element II

<img src="http://lrun1124.github.io/img/leetcode/229.png" width="500"/>

```js
Input: nums = [3,2,3]
Output: [3]

Input: nums = [1]
Output: [1]

Input: nums = [1,2]
Output: [1,2]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
    debugger;
    let len = nums.length;
    if(len === 0) return [];
    nums.sort((a,b)=>{return a-b;});
    let current,
        count = 0,
        target = Math.floor(len/3),
        res = [];
    for(let i=0; i<=nums.length; i++) { //<=多执行一遍,结尾的值也要写入结果
            if(nums[i] === current) {
            count++;
        } else {
            if(count > target) {
                res.push(current);
            }
            current = nums[i];
            count = 1
        }
    }
    return res;
};
majorityElement([3,2,3])
```

### 189. Rotate Array

<img src="http://lrun1124.github.io/img/leetcode/189.png" width="500"/>

```js
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    if(k === 0) return nums;
    nums.splice(0, nums.length, ...[...nums.slice(nums.length-k), ...nums.slice(0,nums.length-k)]);
};
var nums = [1,2,3,4,5,6,7];
rotate(nums,3);
console.log(nums);
```
用splice和slice跑赢97%...，这道题要注意不能直接num=，因为是要改变原数组，js共享传递，导致直接=不能覆盖原数组，要用splice

### 209. Minimum Size Subarray Sum

<img src="http://lrun1124.github.io/img/leetcode/209.png" width="500"/>

```js
Input: s = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: the subarray [4,3] has the minimal length under the problem constraint.
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
    debugger;
    if(nums.length === 0) return 0;
    let start = 0,
        end = 0,
        sum = 0,
        res = nums.length+1; //最长就是nums.length
    while(end < nums.length) {
        sum += nums[end]; //每次向右滑动
        while(sum >= s) { //然后从左开始缩短数组，记录到最短的值
            res = Math.min(res, end - start + 1)
            sum -=nums[start];
            start++;
        }
        end++;
    }
    return res === nums.length+1 ? 0 : res;
};
minSubArrayLen(3,[2,3,1,2,4,3])
```

滑动窗口，双指针


### 217. Contains Duplicate

<img src="http://lrun1124.github.io/img/leetcode/217.png" width="500"/>

```js
用set
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};
containsDuplicate([1,2,3,1]);
```

或者用hash

### 219. Contains Duplicate II

<img src="http://lrun1124.github.io/img/leetcode/219.png" width="500"/>

```js
Input: nums = [1,2,3,1], k = 3
Output: true
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    let s = new Set(), //使用一个滑动窗口Set
        start = 0; //记录每次滑动需要delete的
    for(let i=0; i<nums.length; i++) {
        if(i > k) { //当窗口内的值够的时候，每次循环把开始的位置删掉
            s.delete(nums[start]);
            start++;
        }
        if(s.has(nums[i])) return true; //判断当前set里有无重复
        s.add(nums[i]);
    }
    return false;
};
containsNearbyDuplicate([0,1,2,3,4,0,0,7,8,9,10,11,12,0], 1);
```
这种判断一个距离内判断的题都是滑动窗口

### 228. Summary Ranges

<img src="http://lrun1124.github.io/img/leetcode/228.png" width="500"/>


```js
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]

Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]

var summaryRanges = function(nums) {
    if(nums.length === 0) return [];
    if(nums.length === 1) return [`${nums[0]}`]
    let res = [],
        start = 0, //双指针
        end = 0;
    while(end < nums.length) {
        if(nums[end+1]-nums[end] === 1) end++;
        else {
            if(end === start) {
                res.push(`${nums[end]}`);
            } else {
                res.push(`${nums[start]}->${nums[end]}`);
            }
            end++;
            start = end;
        }
    }
    return res;
};
summaryRanges([0,2,3,4,6,8,9])
```

### 238. Product of Array Except Self
<img src="http://lrun1124.github.io/img/leetcode/238.png" width="500"/>

```js
Input:  [1,2,3,4] 
Output: [24,12,8,6]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    var len = nums.length,
        RightProduct = 1, //记录右边总乘
        res = new Array(len); //利用结果数组不计入空间复杂度的方式，res[i]为左边数的总乘
    res[0] = 1;//第一个左边没有数，设为1
    for(let i=1; i<len; i++) {
        res[i] = res[i-1] * nums[i-1]; //计算左边总乘
    }
    for(let i=len-1; i>=0; i--) {
        res[i] = res[i] * RightProduct; //nums[i]的结果为它左边总乘，乘右边总乘
        RightProduct *=nums[i]; //右边总乘用过就改
    }
    return res;
};
productExceptSelf([1,2,3,4]);
```

题目要求不能用除法并且O(1)， 思路：nums[i]的结果为它左边总乘，乘右边总乘，用res数组本身记录左侧总乘，节省空间复杂度


### 268. Missing Number
<img src="http://lrun1124.github.io/img/leetcode/268.png" width="500"/>

```js
Input: nums = [3,0,1]
Output: 2

var missingNumber = function(nums) {
    var sum = nums.length;
    for(let i=0; i<nums.length; i++) {
        sum += i - nums[i]; 
    }
    return sum;
};
missingNumber([3,0,1]);
```
比较hack的解法，加i再减去当前数，剩下的就是缺失的那个，击败98%

```js
var missingNumber = function(nums) {
    var res = nums.length;
    for(let i=0; i<nums.length; i++) {
        res ^= i ^ nums[i];
    }
    return res;
};
missingNumber([3,0,1]);
```

利用异或，两个N^N = 0, 最后剩下的就是缺的，击败80%

### 283. Move Zeroes
<img src="http://lrun1124.github.io/img/leetcode/283.png" width="500"/>

```js
/**
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let left = right = 0;
    while(right < nums.length) {
        if(nums[right]) {
            nums[left] = nums[right];
            left++;
        }
        right++;
    }‘


    for(let i=left; i<nums.length; i++) {
        nums[i] = 0;
    }
};
var test = [0,0,1];
moveZeroes(test);
console.log(test)
```

双指针，思想就是把非0的值，按顺序放到前面去，再把后面的0补齐，left就代表非0值的序列，right代表遍历数组的序列

### 287. Find the Duplicate Number

<img src="http://lrun1124.github.io/img/leetcode/287.png" width="500"/>

```js
var findDuplicate = function(nums) {
    debugger;
    let left = 1,
        right = nums.length-1,
        mid;
    while(left < right) {
        mid = (left + right) >>> 1;
        let count = 0;
        for(let i=0; i<nums.length; i++) {
            if(nums[i] <= mid) count++;
        }
        if(count > mid) {
            right = mid;
        } else {
            left = mid+1;
        }
    }
    return left;
}
findDuplicate([1,3,4,2,2]);
```
由于范围是[1，n]，又是整数，所以可以用抽屉原理，每次找一个[left,right]中间的数mid，然后遍历nums找有多少个比mid小或等于mid数，如果count比mid大，根据抽屉原理，说明肯定有一个[left, mid]中间的数混了进去，缩小范围到[left, mid]继续找，否则就肯定在另一边，直到left和right相遇

```js
Input: nums = [1,3,4,2,2]
Output: 2
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let fast = 0, slow = 0;
    while(true){
        fast = nums[nums[fast]];
        slow = nums[slow];
        if(fast == slow)
            break;
    }
    let finder = 0;
    while(true){
        finder = nums[finder];
        slow = nums[slow];
        if(slow == finder)
            break;        
    }
    return slow;
};
findDuplicate([1,3,4,2,2])
```
快慢指针, 快慢指针相遇的地方肯定是环的入口

### 414. Third Maximum Number

<img src="http://lrun1124.github.io/img/leetcode/414.png" width="500"/>

```js
Input: [3, 2, 1]
Output: 1
Input: [2, 2, 3, 1]
Output: 1
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
    let first = second = third = -Number.MAX_VALUE;
    for(let i=0; i<nums.length; i++) {
        if(nums[i] === first || nums[i] === second || nums[i] === third) continue;
        if(nums[i] > first) {
            third = second;
            second = first;
            first = nums[i];
        } else if(nums[i] > second) {
            third = second;
            second = nums[i];
        } else if (nums[i] > third) {
            third = nums[i];
        }
    }
    return third === -Number.MAX_VALUE ? first : third;
};
thirdMax([1,2,-2147483648]);
```
领奖台机制，每次都更新前三大的数，注意Number.MIN_VALUE表示的最小值为5e-324 MIN_VALUE代表的并不是负最小,而是最接近0的一个数 负最小值可以使用-Number.MAX_VALUE表示，满足O(n)

### 442. Find All Duplicates in an Array

<img src="http://lrun1124.github.io/img/leetcode/442.png" width="500"/>

```js
Input:
[4,3,2,7,8,2,3,1]
Output:
[2,3]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    let hash = {},
        res = [];
    for(let i=0; i<nums.length; i++) {
        if(hash[nums[i]]) {
            res.push(nums[i]);
        } else {
            hash[nums[i]] = true;
        }
    }
    return res;
};
findDuplicates([4,3,2,7,8,2,3,1]);
```
如果可以使用额外空间，就用hash，这种办法可以使用在范围在[0,n]之外的情况
```js
var findDuplicates = function(nums) {
    let res = [];
    for(let i=0; i<nums.length; i++) {
        let current = Math.abs(nums[i]);
        if(nums[current-1] < 0) {
            res.push(current);
        }
        nums[current-1] = -nums[current-1]
    }
    return res;
}
findDuplicates([4,3,2,7,8,2,3,1]);
```
如果不能用额外空间，因为有[0,n]的范围，讲对应的位置取反，如果当前值已经是负数了，说明之前已经取反了，就证明是重复的数

### 448. Find All Numbers Disappeared in an Array

<img src="http://lrun1124.github.io/img/leetcode/448.png" width="500"/>

```js
Input:
[4,3,2,7,8,2,3,1]
Output:
[5,6]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    debugger;
    let len = nums.length,
        res = [];
    for(let i=0; i<len; i++) {
        let current = Math.abs(nums[i]);
        if(nums[current-1] > 0) {
            nums[current-1] = -nums[current-1];
        }
    }
    for(let i=0; i<len; i++) {
        if(nums[i] > 0) res.push(i+1);
    }
    return res;
};
findDisappearedNumbers([4,3,2,7,8,2,3,1]);
```
和前面题目思路类似，利用[1,n]的范围，把对应值置负数，最后遍历一遍，index上不是负数的就是缺失的数，击败91%，

### 485. Max Consecutive Ones

<img src="http://lrun1124.github.io/img/leetcode/485.png" width="500"/>

```js
Input: [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s.
    The maximum number of consecutive 1s is 3.
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    debugger;
    let count = 0,
        res = 0;
    for(let i=0; i<nums.length; i++) {
        if(nums[i] === 1) {
            count++;
            if(count > res) res = count;
        } else {
            count = 0;
        }
    }
    return res;
};
findMaxConsecutiveOnes([1,0,1,1,0,1])
```

### 509. Fibonacci Number

<img src="http://lrun1124.github.io/img/leetcode/509.png" width="500"/>

```js
Input: 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    let fb = new Array(N+1);
    fb[0] = 0;
    fb[1] = 1;
    for(let i=2; i<=N; i++) {
        fb[i] = fb[i-1] + fb[i-2];
    }
    return fb[N];
};
fib(2);
```
DP
```js
var fib = function(N) {
    if(N<=1) return N;
    else return fib(N-1) + fib(N-2);
}
fib(2);
```
递归

### 532. K-diff Pairs in an Array

<img src="http://lrun1124.github.io/img/leetcode/532.png" width="500"/>

```js
Input: nums = [3,1,4,1,5], k = 2
Output: 2
Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
Although we have two 1s in the input, we should only return the number of unique pairs.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function(nums, k) {
    let res = 0;
    nums.sort((a,b)=>{return a-b;})
    for(let i=0; i<nums.length; i++) {
        if(nums[i] === nums[i-1]) continue;
        for(let j=i+1; j<nums.length; j++) {
            if(nums[j] - nums[i] > k) break;
            if((nums[j] - nums[i]) === k) {
                res++;
                break; //记得break，不然相同值会重复记录
            }
        }
    }
    return res;
};
findPairs([1,2,4,4,3,3,0,9,2,3],3)
```
先排序，再根据每个当前值向后遍历，遇到和前一个相同的就跳过，因为排序了所以不会有重复

### 560.Subarray Sum Equals K

<img src="http://lrun1124.github.io/img/leetcode/560.png" width="500"/>

```js
Input: nums = [1,1,1], k = 2
Output: 2
Input: nums = [1,2,3], k = 3
Output: 2
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let hash = {},
        res = 0,
        sum = 0;
    for(let i=0; i<nums.length; i++) {
        sum += nums[i];
        if(sum === k) res++;
        if(hash[sum-k]) res+=hash[sum-k];
        if(hash[sum]) hash[sum]++;
        else hash[sum] = 1; 
    }
    return res;
};
subarraySum([1,1,1],2);
```

O(n)的解法，因为我们只关心数量不关心具体值，用hash记录，key为累加值，value为次数, 计算某项的结果时，就去前面找sum-k有多少种组合

### 628. Maximum Product of Three Numbers

<img src="http://lrun1124.github.io/img/leetcode/628.png" width="500"/>

```js
Input: nums = [1,2,3]
Output: 6
Input: nums = [1,2,3,4]
Output: 24
Input: nums = [-1,-2,-3]
Output: -6

[-1,-2,0, 2,3]
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
    let len = nums.length;
    nums.sort((a,b)=>{return a-b;});
    //找两个最小的负数和最大整数相乘，或者三个最大的正数相乘，注意这里实际上有0，负数只有1个，这两种情况已经被包含进去了
    //[-1,-2,0,2,3]
    //[-1,2,3]
    //[-1,-2,-3,0]
    return Math.max(nums[0] * nums[1] * nums[len-1], nums[len-1] * nums[len-2] * nums[len-3]);
};
maximumProduct([1,2,3])
```
也可以把这个五个数遍历出来，效率会更高，复杂度线性

### 643. Maximum Average Subarray I

<img src="http://lrun1124.github.io/img/leetcode/643.png" width="500"/>

```js
Input: [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let sum = 0;
    for(let i=0; i<k; i++) { //先算前k个数的和
        sum +=nums[i];
    }
    let maxSum = sum; 
    for(let i=k; i<nums.length; i++) {
        sum = sum + nums[i] - nums[i-k]; //每次滑动，加上新的减掉旧的
        maxSum = Math.max(sum, maxSum); //记录下更大的
    }
    return maxSum/k;
};

findMaxAverage([1,12,-5,-6,50,3],4)
```

双指针滑动窗口，击败96.7%

### 581. Shortest Unsorted Continuous Subarray

<img src="http://lrun1124.github.io/img/leetcode/581.png" width="500"/>

```js
Input: nums = [2,6,5,4,8,10,9,15] 
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
Input: nums = [1,2,3,4] 
Output: 0
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
    let len = nums.length,
        left = 0,
        right = nums.length-1;
    //从左边找到逆序开始
    while(left < len-1 && nums[left] <= nums[left+1]) left++;
    //如果一直递增，那就不需要重排
    if(left === len-1) return 0;
    //从右边找到逆序开始
    while(right > 0 && nums[right] >= nums[right-1]) right--;

    let maxVal = minVal = nums[left];
    //找中间部分数组的最大最小值
    for(let i=left; i<=right; i++) {
        if(nums[i] > maxVal) maxVal = nums[i];
        if(nums[i] < minVal) minVal = nums[i];
    }

    //从左找到第一个比中间最小值大的数，说明中间最小值应该放在这个数前面，这个点就是左边起点
    for(let i=0; i<left; i++) {
        if(nums[i] > minVal) {left = i; break;}
    }
    //从右找到第一个比中间最大值小的数，说明中间最大值应该放在这个数后面，这个点就是右边终点
    for(let i=len-1; i>right; i--) {
        if(nums[i] < maxVal) {right = i; break;}
    }
    return right - left + 1;
};

findUnsortedSubarray([1,2,3,3,3])
findUnsortedSubarray([1]);
findUnsortedSubarray([2,6,4,8,10,9,15]);
```

把数组分成，[左边递增) + [中间乱序] + (右边递增]，满足左边都比中间最小值小，右边都比中间最大值大，注意中间乱序需要包括两个边界，不然处理不了右边比左边都小的情况，比如[2,6,4,8,10,0,1]

