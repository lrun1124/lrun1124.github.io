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
    	}
    	else{
    		m.set(nums[i], i);
    	}
    }
};
//test
console.log(twoSum([2,7,11,15],9));
```

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
    let res = [];
    //特殊处理全0和全其他值
    if(nums[0] === nums[nums.length-1]) {
        if(nums[0] === 0) {
            res.push([0,0,0]);
            return res;
        } else {
            return [];
        }
    }
    for(let i=0; i<nums.length; i++) {
        if(i !== 0 && nums[i] === nums[i-1]) continue;
        //two point，变成sum2问题
        let mid = i+1,
            end = nums.length-1;
        while(mid < end) {
            let sum = nums[i] + nums[mid] + nums[end];
            if(sum === 0) {
                res.push([nums[i], nums[mid], nums[end]]);
                //向右向左滑动，找到第一个不同的值，注意就算没有相同的值也要滑动，所以用do-while，否则会无限循环
                do{ mid++; } while(mid < end && nums[mid] === nums[mid-1])
                do{ end--; } while(mid < end && nums[end] === nums[end+1])
            }
            else if(sum > 0) {
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

先排序，循环数组，内层变成2sum问题，再用两个指针滑动，和为0记录，内外循环过程中下一个遇相同的值跳过

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
                do {end--} while(mid<end && nums[end] === nums[end+1]);
            } else if (sum < target) {
                do {mid++} while(mid<end && nums[mid] === nums[mid-1]);
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
                    do{ mid++ } while(mid<end && nums[mid] === nums[mid-1]);
                    do{ end-- } while(mid<end && nums[end] === nums[end+1]);
                } else if (sum < target) {
                    do{ mid++ } while(mid<end && nums[mid] === nums[mid-1]);
                } else {
                    do{ end-- } while(mid<end && nums[end] === nums[end+1]);
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
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] != val) {
            nums[i] = nums[j];
            i++;
        }
    }
    return i;
}
```

1. 用splice, splice后记得--
2. 两个指针i和j, j一直+1，i遇到非target+1并赋值

### 031.Next Permutation
<img src="http://lrun1124.github.io/img/leetcode/031.png" width="500"/>

```JS
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    debugger;
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

Permutation是字典字，next Permutation就是按字典序排列的下一个排列

思路：

主要思想是找到两个值，一个是从后第一个比前一个大的值，第二个第一个是比这个值大的，后面升序排列即可

1. 先从后往前，找后一个比前一个大的nums[i-1]
1. 再从后往前，找第一个比nums[i-1]大的nums[j]
1. 交换nums[i-1] 和 nums[j]
1. 将nums[i-1]之后的数组排列
1. 如没有进入前四步，说明输入已经是最大的字典序，直接输出倒序

### 032.Search in Rotated Sorted Array
<img src="http://lrun1124.github.io/img/leetcode/032.png" width="500"/>

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
        mid = Math.floor(left + (right-left) / 2);
        if(nums[mid] === target) return mid;
        if(nums[mid] > nums[right]) {
            if(nums[left] <= target && nums[mid] >= target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
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

### 035.Search Insert Position
<img src="http://lrun1124.github.io/img/leetcode/032.png" width="500"/>

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
        mid = Math.floor(left + (right - left)/2);
        if(nums[mid] === target) return mid;
        if(nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return  right + 1;
};

console.log(searchInsert([1,3,5,6],2))
```

二分查找，最终right所在的位置一定是target前的位置，注意二分如果mid-1，那么left<=right, =不能丢

### 039.Combination Sum
<img src="http://lrun1124.github.io/img/leetcode/039.png" width="500"/>

```JS
var combinationSum = function(candidates, target) {
    var res = [];
    /**
     * @param candidates 候选数组
     * @param begin      搜索起点
     * @param target     每减去一个元素，目标值变小
     * @param path       从根结点到叶子结点的路径，是一个栈
     */
    const dfs = (candidates, begin, target, path) => {
        //终止条件
        if(target < 0) return;
        if(target === 0) {
            res.push(path.slice());
            return;
        }
        for(let i = begin; i < candidates.length; i++) {
            path.push(candidates[i]);
            //打印出所有路径序列
            console.log(path);
            dfs(candidates, i, target - candidates[i], path);
            path.pop();
        }
    }
    dfs(candidates, 0, target, [], res);
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
    /**
     * @param candidates 候选数组
     * @param begin      搜索起点
     * @param target     每减去一个元素，目标值变小
     * @param path       从根结点到叶子结点的路径，是一个栈
     */
    const dfs = (candidates, begin, target, path) => {
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
            //打印出所有路径序列
            //console.log(path);
            dfs(candidates, i, target - candidates[i], path);
            path.pop();
        }
    }
    dfs(candidates, 0, target, [], res);
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
    /**
     * @param candidates 候选数组
     * @param begin      搜索起点
     * @param target     每减去一个元素，目标值变小
     * @param path       从根结点到叶子结点的路径，是一个栈
     */
    const dfs = (candidates, begin, target, path) => {
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
            //打印出所有路径序列
            //console.log(path);
            // 因为元素不可以重复使用，这里递归传递下去的是 i + 1 而不是 i
            dfs(candidates, i + 1, target - candidates[i], path);
            path.pop();
        }
    }
    dfs(candidates, 0, target, [], res);
    return res;
}
console.log(combinationSum([10,1,2,7,6,1,5],8));

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
        }
    }
    //第一个位置不对的数位置+1
    for(let i =0; i<nums.length; i++) {
        if(nums[i] !== i+1) return i+1;
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

原地hash，哈希的规则是nums[i] = i+1, 占座思想，让nums[i]都坐在i-1的位置上，最后第一个不满足规则的数的位置+1，就是结果

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

O(log(m+n))的解法：Todo...


### 048.Rotate Image

<img src="http://lrun1124.github.io/img/leetcode/048.png" width="500"/>

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]] 
Output: [[7,4,1],[8,5,2],[9,6,3]]

Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

 1,2,3  7,4,1
 4,5,6  8,5,2
 7,8,9  9,6,3 

var rotate = function(matrix) {
    debugger;
    //先矩阵转置
    for(let i=0; i<matrix.length; i++) {
        for(let j=i; j<matrix.length; j++) {
            //matrix[i][j]别写成matrix[i,j]!!!
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    //再反转每行
    for(let i=0; i<matrix.length; i++) {
        matrix[i].reverse();
    }
}
console.log(rotate([[1,2,3],[4,5,6],[7,8,9]]))
```

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
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

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
    //第一阶段，不和newInterval重叠，在newInterval前面的部分，直接push
    while(i<len && intervals[i][1] < newInterval[0]) {
        res.push(intervals[i]);
        i++;
    }
    //第二阶段，和newInterval重叠，不断更新前后端的值，直到不重叠
    while(i<len && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
        newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
        i++;
    }
    //第三阶段，不和newInterval重叠，在newInterval后面的部分，直接push
    res.push(newInterval);
    while(i<len) {
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
        dp.push(new Array(n));
    }
    for(let i=0; i<n; i++) {dp[0][i] = 1;} //填上横1
    for(let i=0; i<m; i++) {dp[i][0] = 1;} //填上竖1
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
    debugger;
    if(!obstacleGrid && obstacleGrid.length === 0) return 0;
    let m = obstacleGrid.length,
        n = obstacleGrid[0].length,
        dp = [];
    for(let i=0; i<m; i++) {
        dp.push(new Array(n));
    }
    for(let i=0; i<m; i++) {
        dp[i][0] = 0;
    }
    for(let i=0; i<n; i++) {
        dp[0][i] = 0;
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
            if(obstacleGrid[i][j] === 1) dp[i][j] = 0;
            else {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
    }
    return dp[m-1][n-1];
};
```

DP思想同上，第一行第一列，如果碰到障碍，后面的位置就都到不了，设为0

### 64. Minimum Path Sum
<img src="http://lrun1124.github.io/img/leetcode/064.png" width="500"/>

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    debugger;
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
        if(i===0){digits.splice(0,0,1);}
    }
    return digits;
};
console.log(plusOne([1,9,9]))
```

碰到非9就+1然后break，否则继续，直到最高位，插入1

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
        mid = left + Math.floor(right-left);
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

两种思路，一种两次二分，先找到行，在对行内二分;另一种，对整个矩阵进行二分，计算坐标，x = Math.floor(mid/n); y = mid % n;

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
            i--;
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
    debugger;
    if(nums.length === 0) return [[]];
    var res = [[], [nums[0]]];
    for(let i=1; i<nums.length; i++) {
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
  const used = new Array(m);    // 二维矩阵used，存放bool值
  for (let i = 0; i < m; i++) {
    used[i] = new Array(n);
  }
  // canFind 判断当前点是否是目标路径上的点
  const canFind = (row, col, i) => { // row col 当前点的坐标，i当前考察的word字符索引
    if (i == word.length) {          // 递归结束条件
      return true;
    }
    if (row < 0 || row >= m || col < 0 || col >= n) { // 当前点要存在，不越界
      return false;
    }
    if (used[row][col] || board[row][col] != word[i]) { // 当前点已经访问过，或，非目标点
      return false;
    }
    // 排除掉上面的false情况，当前点是合格的，可以继续递归考察
    used[row][col] = true;  // 记录一下当前点被访问了

    const canFindRest = canFind(row + 1, col, i + 1) || canFind(row - 1, col, i + 1) ||
      canFind(row, col + 1, i + 1) || canFind(row, col - 1, i + 1); 

    if (canFindRest) { // 基于当前点[row,col]，可以为剩下的字符找到路径
      return true;    
    }
    used[row][col] = false; // 不能为剩下字符找到路径，返回false，撤销当前点的访问状态，继续考察别的分支
    return false;
  };

  for (let i = 0; i < m; i++) {   // 找 dfs 的入口
    for (let j = 0; j < n; j++) {
      if (board[i][j] == word[0] && canFind(i, j, 0)) { // 找到起点，递归结果true，找到目标路径
        return true; 
      }
    }
  }
  return false; // 怎么样都没有返回true，则返回false
};

```

回溯经典题，标记

### 80. Remove Duplicates from Sorted Array II
<img src="http://lrun1124.github.io/img/leetcode/080.png" width="500"/>

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
 对于无序的，不考虑O(1)空间的解法，用hash
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

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
对有序的，O(1)空间的解法
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

### 105. Construct Binary Tree from Preorder and Inorder Traversal
<img src="http://lrun1124.github.io/img/leetcode/105.png" width="500"/>

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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

preorder = [3,9,20,15,7]
inorder =  [9,3,15,20,7]

var buildTree = function(preorder, inorder) {
    var len = preorder.length,
        hashMap = {};
    if(len === 0) return null;
    //构造hash，快速定位inorder里的根节点位置
    for(let i=0; i<len; i++) {
        hashMap[inorder[i]] = i;
    }
    var builder = (preorder_left, preorder_right, inorder_left, inorder_right) => {
        if(preorder_left > preorder_right) {
        return null;
        }
        var rootVal = preorder[preorder_left], //根节点的val
            inorder_root_index = hashMap[rootVal], //通过hash快速找到根节点位置
            left_size = inorder_root_index - inorder_left; //计算左子树的长度，用于划分本轮递归范围
        return {
            val: rootVal,
            left: builder(preorder_left + 1, preorder_left + left_size, inorder_left, inorder_root_index - 1),
            right: builder(preorder_left + left_size + 1, preorder_right,  inorder_root_index + 1, inorder_right)
        } 
    }
    return builder(0, len-1, 0, len-1);
};

console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]));
```

### 106. Construct Binary Tree from Inorder and Postorder Traversal

<img src="http://lrun1124.github.io/img/leetcode/106.png" width="500"/>

```js
inorder = [9,3,15,20,7]
postorder = [9,15,7,20,3]

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

观察规律，后续从后向前就是根节点的位置，所以对中序迭代就好

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
递归解法
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
var test =  [
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
];
minimumTotal(test)
```
递归, triangle[i][j]到底部的最小距离，等于triangle[i][j]+ 下一层的邻居triangle[i+1][j]和triangle[i+1][j+1]到底部距离的较小值，递归会超时

```js
DP解法
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    debugger;
    let len = triangle.length,
        dp = [];
    if(len === 0) return 0;
    if(len === 1) return triangle[0][0];
    for(let i=0; i<len; i++) {
        if(i===len-1) {
            dp.push(triangle[i].slice(0));
        } else {
            dp.push(new Array(i+1));
        }
    }
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