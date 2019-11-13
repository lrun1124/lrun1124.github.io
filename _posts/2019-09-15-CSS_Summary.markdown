---
layout:     post
title:      "CSS Summary"
subtitle:   ""
date:       2019-09-15 2:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - Summary
---
> “Move on. ”
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [CSS](#css)
  - [盒子模型](#%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B)
  - [CSS选择器](#css%E9%80%89%E6%8B%A9%E5%99%A8)
  - [display的值及作用](#display%E7%9A%84%E5%80%BC%E5%8F%8A%E4%BD%9C%E7%94%A8)
  - [position属性（定位原点）](#position%E5%B1%9E%E6%80%A7%E5%AE%9A%E4%BD%8D%E5%8E%9F%E7%82%B9)
    - [Flexbox（弹性盒布局模型)](#flexbox%E5%BC%B9%E6%80%A7%E7%9B%92%E5%B8%83%E5%B1%80%E6%A8%A1%E5%9E%8B)
  - [display: none;与visibility: hidden;的区别](#display-none%E4%B8%8Evisibility-hidden%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [用纯css创建三角形](#%E7%94%A8%E7%BA%AFcss%E5%88%9B%E5%BB%BA%E4%B8%89%E8%A7%92%E5%BD%A2)
  - [清除浮动](#%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8)
    - [利用clear属性](#%E5%88%A9%E7%94%A8clear%E5%B1%9E%E6%80%A7)
    - [触发浮动元素父元素的BFC](#%E8%A7%A6%E5%8F%91%E6%B5%AE%E5%8A%A8%E5%85%83%E7%B4%A0%E7%88%B6%E5%85%83%E7%B4%A0%E7%9A%84bfc)
  - [zoom:1的清除浮动原理?](#zoom1%E7%9A%84%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8%E5%8E%9F%E7%90%86)
  - [CSS优先级算法如何计算？](#css%E4%BC%98%E5%85%88%E7%BA%A7%E7%AE%97%E6%B3%95%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97)
  - [CSS定义的权重](#css%E5%AE%9A%E4%B9%89%E7%9A%84%E6%9D%83%E9%87%8D)
  - [CSS优化、提高性能的方式](#css%E4%BC%98%E5%8C%96%E6%8F%90%E9%AB%98%E6%80%A7%E8%83%BD%E7%9A%84%E6%96%B9%E5%BC%8F)
  - [浏览器解析选择器过程](#%E6%B5%8F%E8%A7%88%E5%99%A8%E8%A7%A3%E6%9E%90%E9%80%89%E6%8B%A9%E5%99%A8%E8%BF%87%E7%A8%8B)
  - [全屏滚动原理](#%E5%85%A8%E5%B1%8F%E6%BB%9A%E5%8A%A8%E5%8E%9F%E7%90%86)
  - [伪类和伪元素](#%E4%BC%AA%E7%B1%BB%E5%92%8C%E4%BC%AA%E5%85%83%E7%B4%A0)
  - [CSS3新增伪类和伪元素有那些？](#css3%E6%96%B0%E5%A2%9E%E4%BC%AA%E7%B1%BB%E5%92%8C%E4%BC%AA%E5%85%83%E7%B4%A0%E6%9C%89%E9%82%A3%E4%BA%9B)
  - [元素竖向的百分比](#%E5%85%83%E7%B4%A0%E7%AB%96%E5%90%91%E7%9A%84%E7%99%BE%E5%88%86%E6%AF%94)
  - [经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？](#%E7%BB%8F%E5%B8%B8%E9%81%87%E5%88%B0%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%85%BC%E5%AE%B9%E6%80%A7%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8E%9F%E5%9B%A0%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95%E6%98%AF%E4%BB%80%E4%B9%88%E5%B8%B8%E7%94%A8hack%E7%9A%84%E6%8A%80%E5%B7%A7-)
  - [li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？](#li%E4%B8%8Eli%E4%B9%8B%E9%97%B4%E6%9C%89%E7%9C%8B%E4%B8%8D%E8%A7%81%E7%9A%84%E7%A9%BA%E7%99%BD%E9%97%B4%E9%9A%94%E6%98%AF%E4%BB%80%E4%B9%88%E5%8E%9F%E5%9B%A0%E5%BC%95%E8%B5%B7%E7%9A%84%E6%9C%89%E4%BB%80%E4%B9%88%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95)
  - [display:inline-block 什么时候会显示间隙？(携程)](#displayinline-block-%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E4%BC%9A%E6%98%BE%E7%A4%BA%E9%97%B4%E9%9A%99%E6%90%BA%E7%A8%8B)
  - [为什么要初始化CSS样式。](#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%88%9D%E5%A7%8B%E5%8C%96css%E6%A0%B7%E5%BC%8F)
  - [absolute的containing block(容器块)计算方式跟正常流有什么不同？](#absolute%E7%9A%84containing-block%E5%AE%B9%E5%99%A8%E5%9D%97%E8%AE%A1%E7%AE%97%E6%96%B9%E5%BC%8F%E8%B7%9F%E6%AD%A3%E5%B8%B8%E6%B5%81%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)
  - [position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？](#position%E8%B7%9Fdisplaymargin-collapseoverflowfloat%E8%BF%99%E4%BA%9B%E7%89%B9%E6%80%A7%E7%9B%B8%E4%BA%92%E5%8F%A0%E5%8A%A0%E5%90%8E%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7)
  - [对BFC规范(块级格式化上下文：block formatting context)的理解？](#%E5%AF%B9bfc%E8%A7%84%E8%8C%83%E5%9D%97%E7%BA%A7%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%B8%8A%E4%B8%8B%E6%96%87block-formatting-context%E7%9A%84%E7%90%86%E8%A7%A3)
  - [absolute的containing block(容器块)计算方式跟正常流有什么不同？](#absolute%E7%9A%84containing-block%E5%AE%B9%E5%99%A8%E5%9D%97%E8%AE%A1%E7%AE%97%E6%96%B9%E5%BC%8F%E8%B7%9F%E6%AD%A3%E5%B8%B8%E6%B5%81%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C-1)
  - [什么是外边距合并？外边距折叠(collapsing margins)](#%E4%BB%80%E4%B9%88%E6%98%AF%E5%A4%96%E8%BE%B9%E8%B7%9D%E5%90%88%E5%B9%B6%E5%A4%96%E8%BE%B9%E8%B7%9D%E6%8A%98%E5%8F%A0collapsing-margins)
  - [移动端的布局用过媒体查询吗？](#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%9A%84%E5%B8%83%E5%B1%80%E7%94%A8%E8%BF%87%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2%E5%90%97)
  - [margin和padding分别适合什么场景使用？](#margin%E5%92%8Cpadding%E5%88%86%E5%88%AB%E9%80%82%E5%90%88%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF%E4%BD%BF%E7%94%A8)
  - [如何修改chrome记住密码后自动填充表单的黄色背景 ？](#%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9chrome%E8%AE%B0%E4%BD%8F%E5%AF%86%E7%A0%81%E5%90%8E%E8%87%AA%E5%8A%A8%E5%A1%AB%E5%85%85%E8%A1%A8%E5%8D%95%E7%9A%84%E9%BB%84%E8%89%B2%E8%83%8C%E6%99%AF-)
  - [你对line-height是如何理解的？](#%E4%BD%A0%E5%AF%B9line-height%E6%98%AF%E5%A6%82%E4%BD%95%E7%90%86%E8%A7%A3%E7%9A%84)
  - [设置元素浮动后，该元素的display值是多少？](#%E8%AE%BE%E7%BD%AE%E5%85%83%E7%B4%A0%E6%B5%AE%E5%8A%A8%E5%90%8E%E8%AF%A5%E5%85%83%E7%B4%A0%E7%9A%84display%E5%80%BC%E6%98%AF%E5%A4%9A%E5%B0%91)
  - [怎么让Chrome支持小于12px 的文字？](#%E6%80%8E%E4%B9%88%E8%AE%A9chrome%E6%94%AF%E6%8C%81%E5%B0%8F%E4%BA%8E12px-%E7%9A%84%E6%96%87%E5%AD%97)
  - [让页面里的字体变清晰，变细用CSS怎么做？](#%E8%AE%A9%E9%A1%B5%E9%9D%A2%E9%87%8C%E7%9A%84%E5%AD%97%E4%BD%93%E5%8F%98%E6%B8%85%E6%99%B0%E5%8F%98%E7%BB%86%E7%94%A8css%E6%80%8E%E4%B9%88%E5%81%9A)
  - [如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）](#%E5%A6%82%E6%9E%9C%E9%9C%80%E8%A6%81%E6%89%8B%E5%8A%A8%E5%86%99%E5%8A%A8%E7%94%BB%E4%BD%A0%E8%AE%A4%E4%B8%BA%E6%9C%80%E5%B0%8F%E6%97%B6%E9%97%B4%E9%97%B4%E9%9A%94%E6%98%AF%E5%A4%9A%E4%B9%85%E4%B8%BA%E4%BB%80%E4%B9%88%E9%98%BF%E9%87%8C)
  - [overflow: scroll时不能平滑滚动的问题怎么处理？](#overflow-scroll%E6%97%B6%E4%B8%8D%E8%83%BD%E5%B9%B3%E6%BB%91%E6%BB%9A%E5%8A%A8%E7%9A%84%E9%97%AE%E9%A2%98%E6%80%8E%E4%B9%88%E5%A4%84%E7%90%86)
  - [有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。](#%E6%9C%89%E4%B8%80%E4%B8%AA%E9%AB%98%E5%BA%A6%E8%87%AA%E9%80%82%E5%BA%94%E7%9A%84div%E9%87%8C%E9%9D%A2%E6%9C%89%E4%B8%A4%E4%B8%AAdiv%E4%B8%80%E4%B8%AA%E9%AB%98%E5%BA%A6100px%E5%B8%8C%E6%9C%9B%E5%8F%A6%E4%B8%80%E4%B8%AA%E5%A1%AB%E6%BB%A1%E5%89%A9%E4%B8%8B%E7%9A%84%E9%AB%98%E5%BA%A6)
  - [png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？](#pngjpggif-%E8%BF%99%E4%BA%9B%E5%9B%BE%E7%89%87%E6%A0%BC%E5%BC%8F%E8%A7%A3%E9%87%8A%E4%B8%80%E4%B8%8B%E5%88%86%E5%88%AB%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E7%94%A8%E6%9C%89%E6%B2%A1%E6%9C%89%E4%BA%86%E8%A7%A3%E8%BF%87webp)
  - [什么是CSS 预处理器 / 后处理器？](#%E4%BB%80%E4%B9%88%E6%98%AFcss-%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8--%E5%90%8E%E5%A4%84%E7%90%86%E5%99%A8)
  - [rem布局的优缺点](#rem%E5%B8%83%E5%B1%80%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9)
  - [JS获取css属性](#js%E8%8E%B7%E5%8F%96css%E5%B1%9E%E6%80%A7)
  - [height, clientHeight, offsetHeigh](#height-clientheight-offsetheigh)
  - [css实现单/多行文本溢出显示](#css%E5%AE%9E%E7%8E%B0%E5%8D%95%E5%A4%9A%E8%A1%8C%E6%96%87%E6%9C%AC%E6%BA%A2%E5%87%BA%E6%98%BE%E7%A4%BA)
  - [让图文不可复制](#%E8%AE%A9%E5%9B%BE%E6%96%87%E4%B8%8D%E5%8F%AF%E5%A4%8D%E5%88%B6)
  - [有些网页为了尊重原创，复制的文本都会被加上一段来源说明，是如何做到的呢？](#%E6%9C%89%E4%BA%9B%E7%BD%91%E9%A1%B5%E4%B8%BA%E4%BA%86%E5%B0%8A%E9%87%8D%E5%8E%9F%E5%88%9B%E5%A4%8D%E5%88%B6%E7%9A%84%E6%96%87%E6%9C%AC%E9%83%BD%E4%BC%9A%E8%A2%AB%E5%8A%A0%E4%B8%8A%E4%B8%80%E6%AE%B5%E6%9D%A5%E6%BA%90%E8%AF%B4%E6%98%8E%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A%E5%88%B0%E7%9A%84%E5%91%A2)
  - [display: block;和display: inline;的区别](#display-block%E5%92%8Cdisplay-inline%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [display,float,position 的关系](#displayfloatposition-%E7%9A%84%E5%85%B3%E7%B3%BB)
  - [stacking context, 叠层顺序布局规则](#stacking-context-%E5%8F%A0%E5%B1%82%E9%A1%BA%E5%BA%8F%E5%B8%83%E5%B1%80%E8%A7%84%E5%88%99)
  - [position 属性](#position-%E5%B1%9E%E6%80%A7)
  - [absolute和relative](#absolute%E5%92%8Crelative)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## CSS
### 盒子模型

W3C标准盒子模型，content(内容)，padding(内边距)，border(边框)，margin(外边距)组成

以margin：10px； border：2px； padding：5px； width：200px；height：100px 为例

则整个盒子模型的宽是：10px*2 + 2px*2 + 5px*2 + 200px = 234px

则整个盒子模型的高是：10px*2 + 2px*2 + 5px*2 + 100px = 134px

<img src="http://lrun1124.github.io/img/cssbase1/boxModelW3C.jpg"/>

* CSS的盒子模型，低版本IE的盒子模型有什么不同的？

旧IE，主要是指IE5和（IE6的怪异模式），content部分的width和height是把padding和border也算了进去

整个盒子模型的宽是： margin*2 + width（严格来说是：margin-left + width + margin-right

整个盒子模型的高是： margin*2 + height（严格来说是：margin-left + height + margin-right）

<img src="http://lrun1124.github.io/img/cssbase1/boxModelOldIE.jpg"/>

不同：IE的content部分把 border 和 padding计算了进去

### CSS选择器

1. id选择器（# myid）
1. 类选择器（.myclassname）
1. 标签选择器（div, h1, p）
1. 相邻选择器（h1 + p）
1. 子选择器（ul > li）
1. 后代选择器（li a）
1. 通配符选择器（ * ）
1. 属性选择器（a[rel = "external"]）
1. 伪类选择器（a:hover, li:nth-child）

### display的值及作用

1. block       	块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
1. none        	缺省值。象行内元素类型一样显示。
1. inline      	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
1. inline-block  默认宽度为内容宽度，可以设置宽高，同行显示。
1. list-item   	象块类型元素一样显示，并添加样式列表标记。
1. table       	此元素会作为块级表格来显示。
1. inherit     	规定应该从父元素继承 display 属性的值。

### position属性（定位原点）

1. absolute 生成绝对定位的元素，相对于值不为static的第一个父元素进行定位。
1. fixed （老IE不支持）生成绝对定位的元素，相对于浏览器窗口进行定位。
1. relative 生成相对定位的元素，相对于其正常位置进行定位。
1. static 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。
1. inherit 规定从父元素继承 position 属性的值。

#### Flexbox（弹性盒布局模型)

一个用于页面布局的全新CSS3功能，Flexbox可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。

较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现。
采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。
它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。
常规布局是基于块和内联流方向，而Flex布局是基于flex-flow流可以很方便的用来做居中，能对不同屏幕大小自适应。
在布局上有了比以前更加灵活的空间

如何兼容低版本浏览器：手动实现响应式，为低版本浏览器些resize函数，根据浏览器窗口大小使用不同样式


### display: none;与visibility: hidden;的区别
联系：它们都能让元素不可见

区别：
1. display: none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染时元素继续占据空间，只是内容不可见;
1. 修改常规流中元素的 display 通常会造成文档重排。修改 visibility 属性只会造成本元素的重绘;
1. display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示;
1. visibility: hidden;是继承属性，子孙节点由于继承了 hidden 而消失，通过设置 visibility: visible，可以让子孙节点显示;
1. 读屏器不会读取 display: none;元素内容；会读取 visibility: hidden;元素内容。

### 用纯css创建三角形

```css
//设置内容高宽为0，利用下边框border
div {
	width: 0;	//若不为0则为梯形
	height: 0;
	border-width: 20px;
	border-style: solid;
	border-color: transparent transparent red transparent;
}
```

### 清除浮动

当容器的高度为auto时，若容器内部含有浮动元素，则容器的高度不能自动伸长，使得内容溢出到容器外部从而影响页面布局

```css
//会产生浮动问题的代码
.news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

<div class="news">
<img src="news-pic.jpg" />
<p>some text</p>
</div>
```
清除浮动的方法可以分为两大类：

#### 利用clear属性

1.使用带clear属性的空元素

```css
//会产生浮动问题的代码
.news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
 }

.news p {
  float: right;
 }

.clear {
    clear: both;
 }

<div class="news">
<img src="news-pic.jpg" />
<p>some text</p>
<div class="clear"></div>
</div>
```

2.若浮动元素后面有元素，给浮动元素后面的元素加clear属性

```css
.news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
 }

.news p {
  float: right;
 }

.content {
	clear: both;
 }

<div class="news">
<img src="news-pic.jpg" />
<p>some text</p>
<div class="content"></div>
</div>
```

3.使用CSS的:after伪元素

```css
//通过CSS伪元素在容器的内部元素最后添加了一个看不见的空格"020"或点"."，并且赋予clear属性来清除浮动。需要注意的是为了IE6和IE7浏览器，要给clearfix这个class添加一条zoom:1;触发haslayout
.news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

.clearfix::after{
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
  }

.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
  }

<div class="news clearfix">
<img src="news-pic.jpg" />
<p>some text</p>
</div>
```

#### 触发浮动元素父元素的BFC 

(Block Formatting Contexts, 块级格式化上下文)，使该父元素可以包含浮动元素

1.给浮动元素的容器添加overflow:hidden;或overflow:auto

```css
.news {
  background-color: gray;
  border: solid 1px black;
  overflow: hidden;
}

.news img {
  float: left;
}

.news p {
  float: right;
}

.clear {
	clear: both;
}

<div class="news">
<img src="news-pic.jpg" />
<p>some text</p>
<div class="clear"></div>
</div>
```

2.给浮动的元素的容器添加浮动

但是这样会使其整体浮动，影响布局，不推荐使用

- 总结

在网页主要布局时使用:after伪元素方法并作为主要清理浮动方式；在小模块如ul里使用overflow:hidden;（留意可能产生的隐藏溢出元素问题）；如果本身就是浮动元素则可自动清除内部浮动，无需格外处理；正文中使用邻接元素清理之前的浮动。

最后可以使用相对完美的:after伪元素方法清理浮动，文档结构更加清晰。

### zoom:1的清除浮动原理?
触发hasLayout，Zoom属性是IE浏览器的专有属性，它可以设置或检索对象的缩放比例当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，

### CSS优先级算法如何计算？
*  优先级就近原则，同权重情况下样式定义最近者为准;
*  载入样式以最后载入的定位为准;

优先级为:
1. 同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
1. !important >  id > class > tag
1. !important 比 内联优先级高

### CSS定义的权重
标签的权重为1，class的权重为10，id的权重为100，以下例子是演示各种定义的权重值：
```css
  /*权重为1*/
  div{
  }
  /*权重为10*/
  .class1{
  }
  /*权重为100*/
  #id1{
  }
  /*权重为100+1=101*/
  #id1 div{
  }
  /*权重为10+1=11*/
  .class1 div{
  }
  /*权重为10+10+1=21*/
  .class1 .class2 div{
  }
```
如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现

### CSS优化、提高性能的方式
<br/>
- 选择器效率优化

读取选择器的原则是从右到左。因此，我们书写的右边的最后一个选择器，被称作关键选择器，对于效率有决定性影响。

1. 避免使用通配符
1. 不使用标签名或类名修饰ID规则：如果规则使用ID选择器作为关键选择器，不要给规则添加标签名。因为ID本身就是唯一的，添加标签名会不必要地降低匹配效率。
1. 不使用标签名修饰类：相较于标签，类更具独特性。
1. 尽量选择最具体的方式：造成低效的最简单粗暴的原因就是在标签上使用太多规则。给元素添加类可以更快细分到类方式，可以减少规则去匹配标签的时间。
1. 关于后代选择器和子选择器：避免使用后代选择器，非要用的话建议用子选择器代替，但子选择器也要慎用，标签规则永远不要包含子选择器。
1. 利用可继承性：没必要在一般内容上声明样式。
1. 提取项目的通用公有样式，增强可复用性；
1. 按模块编写组件；增强项目的协同开发性、可维护性和可扩展性；
1. 使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）。

### 浏览器解析选择器过程

样式系统从关键选择器开始，然后向左移查找规则选择器的祖先元素，只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。

### 全屏滚动原理

1. 计算当前浏览器屏幕高度(document.body.clientHeight)，每次翻页显示的内容高度即为屏幕高度
2. 对鼠标滚轮事件进行监听，注意滚轮事件的浏览器兼容问题。
3. 加入时间控制，如果不加滚动会过于灵敏，一次翻好几屏

参考代码：
```html
//html
<div id="wrap">
    <div id="main">
        <div id="page1" class="page"></div>
        <div id="page2" class="page"></div>
        <div id="page3" class="page"></div>
        <div id="page4" class="page"></div>
    </div>
</div>
```

```css
//css
<style type="text/css">
html,body{
    height:100%;
}
body,ul,li,a,p,div{padding:0px; margin:0px; font-size:14px;}
#wrap{
    overflow: hidden;
    width:100%;
}
#main{
    height:2944px;
    top:0;
    position: relative;
}
.page{
    width:100%;
    margin:0;
}
#page1{
    background:#E4E6CE;
}
#page2{
    background:#6CE26C;
}
#page3{
    background:#BF4938;
}
#page4{
    background:#2932E1;
}
</style>
```

```html
//js
<script type="text/javascript">
    var wrap = document.getElementById("wrap");
    var main = document.getElementById("main");
    var hei = document.body.clientHeight;
    wrap.style.height = hei + "px";
    var obj = document.getElementsByTagName("div");
    for(var i=0;i<obj.length;i++){
        if(obj[i].className == 'page'){
             obj[i].style.height = hei + "px";
        }
    }
    //如果不加时间控制，滚动会过度灵敏，一次翻好几屏
    var startTime = 0, //翻屏起始时间  
        endTime = 0,  
        now = 0;     
    //浏览器兼容      
    if ((navigator.userAgent.toLowerCase().indexOf("firefox")!=-1)){   
        document.addEventListener("DOMMouseScroll",scrollFun,false);        
    }  
    else if (document.addEventListener) {  
        document.addEventListener("mousewheel",scrollFun,false);  
    }  
    else if (document.attachEvent) {  
        document.attachEvent("onmousewheel",scrollFun);   
    }  
    else{  
        document.onmousewheel = scrollFun;  
    }  

    //滚动事件处理函数
    function scrollFun(event){
        startTime = new Date().getTime();  
        var delta = event.detail || (-event.wheelDelta);  
        //mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
        //DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
        if ((endTime - startTime) < -1000){
            if(delta>0 && parseInt(main.offsetTop) > -(hei*3)){
                //向下滚动
                now = now - hei;
                toPage(now);
        } 
            if(delta<0 && parseInt(main.offsetTop) < 0){
                //向上滚动
                    now = now + hei;
                    toPage(now);
            }
             endTime = new Date().getTime();  
        }
           else{  
                event.preventDefault();    
            }    
    }
     function toPage(now){        
         $("#main").animate({top:(now+'px')},1000);     //jquery实现动画效果
         //setTimeout("main.style.top = now + 'px'",1000);     javascript 实现动画效果
    }   
</script>
```

### 伪类和伪元素

定义：
- CSS 伪类用于向某些选择器添加特殊的效果。
- CSS 伪元素用于将特殊的效果添加到某些选择器。

<img src="http://lrun1124.github.io/img/cssbase1/cssbase-class.jpg"/>
<img src="http://lrun1124.github.io/img/cssbase1/cssbase-element.jpg"/>

伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到，这也是为什么他们一个称为伪类，一个称为伪元素的原因。伪元素和伪类之所以这么容易混淆，是因为他们的效果类似而且写法相仿，但实际上 css3 为了区分两者，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。

```css
:Pseudo-classes
::Pseudo-elements
```

但因为兼容性的问题，所以现在大部分还是统一的单冒号，但是抛开兼容性的问题，在书写时应该尽可能养成好习惯，区分两者。

### CSS3新增伪类和伪元素有那些？
```
::after			在元素之前添加内容,也可以用来做清除浮动。
::before			在元素之后添加内容
:enabled  		
:disabled 		控制表单控件的禁用状态。
:checked        单选框或复选框被选中。
```
```
p:first-of-type	选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
p:last-of-type	选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:only-of-type	选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
p:only-child		选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2)	选择属于其父元素的第二个子元素的每个 <p> 元素。
```
### 元素竖向的百分比

对于竖直方向的margin和padding，参照父元素的宽度。
对于水平方向的margin和padding，也是参照父元素的宽度

### 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？
1. png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.
1. 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一
1. IE下,可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性;Firefox下,只能使用getAttribute()获取自定义属性。解决方法:统一通过getAttribute()获取自定义属性。
1. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示, 可通过加入 CSS 属性 -webkit-text-size-adjust: none; 
1. 超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}

### li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
原因：

浏览器会把inline元素间的空白字符（空格、换行、Tab等）渲染成一个空格。而为了美观。我们通常是一个<li>放在一行，这导致<li>换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

解决：

1. 为<li>设置float: left。不足：有些容器是不能设置浮动，如左右切换的焦点图等。
1. 将所有<li>写在同一行。不足：代码不美观。
1. 将<ul>内的字符尺寸直接设为0，即font-size: 0。不足：<ul>中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔。
1. 消除<ul>的字符间隔`letter-spacing`: -8px，而这也设置了<li>内的字符间隔，因此需要将<li>内的字符间隔设为默认`letter-spacing`: normal。

### display:inline-block 什么时候会显示间隙？(携程)
1. 将html标签要display:inline-block 的元素写在一行。缺点：代码可读性差。
1. 给父元素设置font-size:0,缺点是子元素如果里面有文字，文字会消失不见，所以又要给子元素设置font-size:0,增加了代码量。
1. 给元素设置float:left,缺点高度塌陷，要清楚浮动。
1. 设置子元素的margin-left为负值，但是元素之间的间隙大小是根据上下文的字体大小确定的，而每个浏览器的换行空隙大小不同，如果font-szie：16px,chrome空隙为8px,火狐空隙为4px.所以这个方法不通用。
1. 设置父元素 `display:table;word-spacing:-1em;`目前这个方法可以完美解决，且兼容其他浏览器。

### 为什么要初始化CSS样式。

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

最简单的初始化方法： * {padding: 0; margin: 0;} （强烈不建议）

淘宝的样式初始化代码：
```css
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
  body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
  h1, h2, h3, h4, h5, h6{ font-size:100%; }
  address, cite, dfn, em, var { font-style:normal; }
  code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
  small{ font-size:12px; }
  ul, ol { list-style:none; }
  a { text-decoration:none; }
  a:hover { text-decoration:underline; }
  sup { vertical-align:text-top; }
  sub{ vertical-align:text-bottom; }
  legend { color:#000; }
  fieldset, img { border:0; }
  button, input, select, textarea { font-size:100%; }
  table { border-collapse:collapse; border-spacing:0; }
```

### absolute的containing block(容器块)计算方式跟正常流有什么不同？
无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：
1. 若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
1. 否则,则由这个祖先元素的 padding box 构成。
如果都找不到，则为 initial containing block。

补充：
1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
1. absolute: 向上找最近的定位为absolute/relative的元素
1. fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block

### position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？

如果元素的display为none,那么元素不被渲染,position,float不起作用,如果元素拥有position:absolute;或者position:fixed;属性那么元素将为绝对定位,float不起作用.如果元素float属性不是none,元素会脱离文档流,根据float属性值来显示.有浮动,绝对定位,inline-block属性的元素,margin不会和垂直方向上的其他元素margin折叠.

### 对BFC规范(块级格式化上下文：block formatting context)的理解？
W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。
一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。

BFC 的一个作用：使 BFC 内部的浮动元素不会到处乱跑。

### absolute的containing block(容器块)计算方式跟正常流有什么不同？
1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
1. absolute: 向上找最近的定位为absolute/relative的元素
1. fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block

### 什么是外边距合并？外边距折叠(collapsing margins)
外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。
合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

规则：
1. 两个或多个毗邻的普通流中的块元素垂直方向上的 margin 会折叠
1. 浮动元素/inline-block 元素/绝对定位元素的 margin 不会和垂直方向上的其他元素的 margin 折叠
1. 创建了块级格式化上下文的元素，不会和它的子元素发生 margin 折叠
1. 元素自身的 margin-bottom 和 margin-top 相邻时也会折叠

<img src="http://lrun1124.github.io/img/css_summary/margin_merge.png"/>

外边距合并初看上去可能有点奇怪，但是实际上，它是有意义的。以由几个段落组成的典型文本页面为例。第一个段落上面的空间等于段落的上外边距。如果没有外边距合并，后续所有段落之间的外边距都将是相邻上外边距和下外边距的和。这意味着段落之间的空间是页面顶部的两倍。如果发生外边距合并，段落之间的上外边距和下外边距就合并在一起，这样各处的距离就一致了。

### 移动端的布局用过媒体查询吗？
Media Queries能在不同的条件下使用不同的样式，使页面在不同在终端设备下达到不同的渲染效果。
比如`max-width`是媒体特性中最常用的一个特性，其意思是指媒体类型小于或等于指定的宽度时，样式生效。如：
```css
@media screen and (max-width:480px){
 .ads {
   display:none;
  }
}
```

### margin和padding分别适合什么场景使用？

1. margin是用来隔开元素与元素的间距；padding是用来隔开元素与内容的间隔。
1. margin用于布局分开元素使元素与元素互不相干；
1. padding用于元素与内容之间的间隔，让内容（文字）与（包裹）元素之间有一段

### 如何修改chrome记住密码后自动填充表单的黄色背景 ？
```css
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189); /* #FAFFBD; */
    background-image: none;
    color: rgb(0, 0, 0);
  }
```

### 你对line-height是如何理解的？
设置元素浮动后，该元素的display值是多少?自动变成了 display:block

### 设置元素浮动后，该元素的display值是多少？
自动变成了 display:block

### 怎么让Chrome支持小于12px 的文字？
1. 用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。
1. 继续使用小于12px字体大小样式设置：如果不考虑chrome可以不用考虑兼容，同时在设置小于12px对象设置-web,kit-text-size-adjust:none，做到最大兼容考虑。
1. 使用12px及12px以上字体大小：为了兼容各大主流浏览器，建议设计美工图时候设置大于或等于12px的字体大小，如果是接单的这个时候就需要给客户讲解小于12px浏览器不兼容等事宜。

### 让页面里的字体变清晰，变细用CSS怎么做？
CSS3属性`-webkit-font-smoothing`字体抗锯齿渲染, 对字体进行抗锯齿渲染可以使字体看起来会更清晰舒服。
```css
-webkit-font-smoothing: antialiased;
```

### 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）
多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms

### overflow: scroll时不能平滑滚动的问题怎么处理？
如果你对某个div或模块使用了overflow: scroll属性，在iOS系统的手机上浏览时，则会出现明显的卡顿现象。
以下代码可解决这种卡顿的问题：`-webkit-overflow-scrolling: touch`;，是因为这行代码启用了硬件加速特性，所以滑动很流畅。

实际上，Safari真的用了原生控件来实现，对于有-webkit-overflow-scrolling的网页，会创建一个UIScrollView，提供子layer给渲染模块使用。

### 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。
```html
<body>
     <div class="box">
         <div class="a"></div>
         <div class="b"></div>
     </div>
</body>
```
- flex
该方法主要部分就是使用了flex:1属性来实现box2的自动伸缩
```css
  .box {
        height: 400px;
        display: flex;
        flex-direction: column;
      }
  .a {height:100px;background:green;}
  .b {background:blue;flex:1}
```

- css计算
```css
  .box {
    height: 400px;
    display: flex;
    flex-direction: column;
  }

  .a {height:100px;background:green;}
  .b {background:blue; height: calc(100vh - 100px);}
```

- absolute
外容器：position:relative。高度固定为100px的盒子使用相对定位，高度要求自适应的盒子使用绝对定位，再设定它的top：100px;left:0;bottom:0;
```css
  .box { height: 400px; position: relative; }
  .a { height: 100px; background: green; }
  .b { background: blue; width: 100%; position: absolute; top: 100px ; left: 0 ; bottom: 0;}
```

- js解法

获取外层盒子和固定高度盒子的高度值，将其相减，结果就是自适应盒子的高度。

### png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
GIF/PNG/JPG/WEBP/APNG都是属于位图（位图 ,务必区别于矢量图)
1. gif图形交换格式，索引颜色格式，颜色少的情况下，产生的文件极小，支持背景透明，动画，图形渐进，无损压缩, 适合线条，图标等, 缺点只有256种颜色
1. jpg支持上百万种颜色，有损压缩，压缩比可达180：1，而且质量受损不明显，不支持图形渐进与背景透明，不支持动画，适合照片
1. png为替代gif产生的，支持透明，半透明，不透明。不支持动画，无损图像格式。Png8简单说是静态gif，也只有256色，png24不透明，但不止256色。适合背景、按钮。
1. webp谷歌开发的旨在加快图片加载速度的图片格式，图片压缩体积是jpeg的2/3，同时提供了有损压缩与无损压缩。高版本的W3C浏览器才支持，google39+，safari7+

### 什么是CSS 预处理器 / 后处理器？

- 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，
  还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

- 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的
  是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

### rem布局的优缺点
 - rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其出初始字体大小 -MDN
rem布局的本质是等比缩放，一般是基于宽度。

优点： rem是相对于根元素,这样就意味着,我们只需要在根元素确定一个px字号,则可以来算出元素的宽高, 适合做web app, 能等比例适配所有屏幕，提高体验

缺点： 目前ie不支持，对pc页面来讲使用次数不多，数据处理复杂

### JS获取css属性
1. 使用style属性,这种方法的前提是必须之前已经显示的在css中声明过height,才能取得正确的值。
```js
document.getElementById("id").style.height
```
2. window.getComputedStyle(a, null) 第一个参数为目标元素，第二个参数为伪类
```js
var a = document.getElementById('mstr259')
window.getComputedStyle(a).height
```
3. 只有IE和Opera支持使用 `CurrentStyle`获取的元素计算后的样式。

下面这个函数，能够获取一个元素的任意 CSS 属性值，考虑了浏览器兼容性。
```js
function getStyle(element, attr) {
  if(element.currentStyle) {
    return element.currentStyle[attr];
  } else {
    return getComputedStyle(element, false)[attr];
  }
}
```

### height, clientHeight, offsetHeigh
* height：指元素内容的高度，jQuery中的height()方法返回的就是这个高度。
* clientHeight：内容高度+padding高度，jQuery中的innerHeight()方法返回的就是这个高度。
* offsetHeight：内容高度+padding高度+边框宽度，jQuery中的outerHeight()方法返回的就是这个高度。
* width：指元素内容的宽度，jQuery中的width()方法返回的就是这个宽度。
* clientWidth：内容高度+padding宽度，jQuery中的innerWidtht()方法返回的就是这个宽度。
* offsetWidth：内容高度+padding高度+边框宽度，jQuery中的outerWidth()方法返回的就是这个宽度。

### css实现单/多行文本溢出显示
```css
//单行
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;

//多行
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

### 让图文不可复制
```css
-webkit-user-select: none; 
-ms-user-select: none;
-moz-user-select: none;
-khtml-user-select: none;
user-select: none;
```

### 有些网页为了尊重原创，复制的文本都会被加上一段来源说明，是如何做到的呢？
1. 答案区域监听copy事件，并阻止这个事件的默认行为。
1. 获取选中的内容（window.getSelection()）加上版权信息，
1. 然后设置到剪切板（clipboarddata.setData()）

* 经测测试，在chrome上window.clipboardData是undefined
* 出于安全考虑，clipboardData.getData("text", text)也不可用

```html
<script type="text/javascript">
function addLink(e) {
    e.preventDefault();
    //经测测试，在chrome上window.clipboardData是undefined
    //出于安全考虑，clipboardData.getData("text", text)也不可用
    var pagelink = '\nRead more: ' + document.location.href,
        copytext =  window.getSelection() + pagelink,
        clipdata = e.clipboardData || window.clipboardData;
    if (clipdata) {
        clipdata.setData('Text', copytext);
    }
}
document.addEventListener('copy', addLink);
```

### display: block;和display: inline;的区别
block元素特点

1. 处于常规流中时，如果width没有设置，会自动填充满父容器 
1. 可以应用margin/padding 
1. 在没有设置高度的情况下会扩展高度以包含常规流中的子元素 
1. 处于常规流中时布局时在前后元素位置之间（独占一个水平空间） 
1. 忽略vertical-align

inline元素特点

1. 水平方向上根据direction依次布局 
1. 不会在元素前后进行换行 
1. margin/padding在竖直方向上无效，水平方向上有效 
1. 受white-space控制  
1. width/height属性对非替换行内元素无效，宽度由元素内容决定 
1. 非替换行内元素的行框高由line-height确定，替换行内元素的行框高由height,margin,padding,border决
1. 浮动或绝对定位时会转换为block 
1. vertical-align属性生效

### display,float,position 的关系
<img src="http://lrun1124.github.io/img/css_summary/display&position&float.png"/>
1. display值为none。当元素display值为none时，元素不产生框，float和position都不起作用。
2. position是absolute或fixed。当元素display值不为none，而position是absolute或者fixed时，此时float不起作用，计算值也为none，display值会按上表设置。元素框的位置由top、left、right、bottom值和其父元素决定。
3. float值不为none。当元素有了浮动属性（float不为none，是left或right）后，该框浮动且display值会按上表转换。例如，span是行内元素，设置浮动后会变为块级元素。
4. 元素为根元素。如果元素是根元素，设置的display也会按上表进行转换。否则，元素的display值为指定值或默认值。

### stacking context, 叠层顺序布局规则

从下到上

1. 形成层叠上下文环境的元素的背景与边框
1. 拥有负 z-index 的子堆叠上下文元素 （负的越高越堆叠层级越低）
1. block元素
1. float元素
1. inline/inline-block元素
1. 拥有 z-index:0 的子堆叠上下文元素
1. 拥有正 z-index: 的子堆叠上下文元素（正的越低越堆叠层级越低）

### position 属性

1. static：默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right或者z-index声明）。
1. relative：生成相对定位的元素，通过top,bottom,left,right的设置相对于其正常位置进行定位。可通过z-index进行层次分级。
1. absolute：生成绝对定位的元素，相对于static定位以外的第一个父元素进行定位。元素的位置通过"left","top","right"以及"bottom"属性进行规定。可通过z-index进行层次分级。
1. fixed：生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过"left","top","right"以及"bottom"属性进行规定。可通过z-index进行层次分级。

### absolute和relative

1. relative定位的层总是相对于其最近的父元素，无论其父元素是何种定位方式。对于absolute定位的层总是相对于其最近的定义为absolute或relative的父层，而这个父层并不一定是其直接父层。
1. 定位为relative的元素脱离正常的文本流中，但其在文本流中的位置依然存在，定位为absolute的层脱离正常文本流，但与relative的区别是其在正常流中的位置不在存在。