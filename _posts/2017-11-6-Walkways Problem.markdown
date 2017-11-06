---
layout:     post
title:      "Walkways Problem"
subtitle:   "陶哲轩的数学问题"
date:       2017-11-06 17:00:00
author:     "Run"
header-img: "img/walkway-bg.jpg"
tags:
    - Math
---

> “Yeah It's on. ”


## 前言

前段时间看到一篇文章，其中讨论了陶哲轩（Terrence Tao）blog上提出的一个数学问题，文章并没有给出明确的解答，在此记录自己的一点思考：

<p id = "build"></p>
---

## 问题

Suppose you are trying to get from one end A of a terminal to the other end B. (For simplicity, assume the terminal is a one-dimensional line segment.) Some portions of the terminal have moving walkways (in both directions); other portions do not. Your walking speed is a constant v, but while on a walkway, it is boosted by the speed u of the walkway for a net speed of v+u. (Obviously, given a choice, one would only take those walkways that are going in the direction one wishes to travel in.) Your objective is to get from A to B in the shortest time possible.

在机场中，你想从A点前往B点。（为了将问题简化，假设机场是一条线性通道。）一些区域有电动扶梯（双向的），另一些区域没有。你的步行速度恒定为v，电动扶梯的运行速度为u，因此在扶梯上，你的实际速度为v+u。（显然，你不会搭乘与你前进方向不一致的扶梯。）你的目标是尽可能快地从A点到达B点。

### 问题1
Suppose you need to pause for some period of time, say to tie your shoe. Is it more efficient to do so while on a walkway, or off the walkway? Assume the period of time required is the same in both cases.

假定你需要暂停片刻，比如系鞋带。请问你应该在电动扶梯上系，还是在没有上电动扶梯时系？假定两种情况下，系鞋带的时间相同。

### 问题2
Suppose you have a limited amount of energy available to run and increase your speed to a higher quantity v' (or v'+u, if you are on a walkway). Is it more efficient to run while on a walkway, or off the walkway? Assume that the energy expenditure is the same in both cases.

假定你有有限数量的多余能量，用来奔跑。在跑动时，你的速度提高到v'（如果在电动扶梯上，就相应为v'+u）。请问你应该在电动扶梯上跑，还是在没有上电动扶梯时跑？假定两种情况下，你可供奔跑的能量相同。

### 问题3
Do the answers to the above questions change if one takes into account the various effects of special relativity? (This is of course an academic question rather than a practical one. But presumably it should be the time in the airport frame that one wants to minimise, not time in one's personal frame.)

在狭义相对论的情况下，上述答案是否发生改变？

## 思考

首先，第一问很简单，肯定是在电梯上，主要讨论第二问：

设想有3个人，A不加速，B行走时加速，C扶梯时加速。加速值记为dV，加速时间记为dT。

假设A和B先比赛，从起点到终点A和B都是先扶梯再走路，A和B同时下扶梯，B到终点时，A落后 dS=dV*dT 距离，相当于B领先A dS/v 时间。

假设A和C后比赛，是同一段路反向走，即先走路后电梯，则A与C同一时间走上扶梯，C到终点（也是扶梯终点）时，A仍然落后 dS=dV*dT 距离，但A只用 dS/(v+u) 时间即可到达终点
由于是同一段路A只是正反向走
因此，B最快，C次之，A最慢。

还可以这么解释我觉得也不错，时间是匀速流逝的前提下，当然是要充分利用传送带，因为传送带的长度是固定，所以鞋带留在传送带上系，加速在地面来做。属于一种“边际效益递减”。

---
