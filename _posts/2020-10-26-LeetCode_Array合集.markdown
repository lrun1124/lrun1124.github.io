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