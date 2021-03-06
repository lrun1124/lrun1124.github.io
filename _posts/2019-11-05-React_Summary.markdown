---
layout:     post
title:      "React Summary"
subtitle:   ""
date:       2019-11-05 12:00:00
author:     "Run"
header-img: "img/ArrayUnique-bg.jpg"
tags:
    - Summary
---

**Table of Contents** 

- [React 使用场景](#react-%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- [React 生命周期](#react-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  - [Mounting](#mounting)
    - [constructor](#constructor)
    - [componentWillMount](#componentwillmount)
    - [render](#render)
    - [componentDidMount](#componentdidmount)
  - [Updating](#updating)
    - [componentWillReceiveProps](#componentwillreceiveprops)
    - [shouldComponentUpdate](#shouldcomponentupdate)
    - [componentWillUpdate](#componentwillupdate)
    - [render](#render-1)
    - [componentDidUpdate](#componentdidupdate)
  - [Unmounting](#unmounting)
    - [componentWillUnmount](#componentwillunmount)
  - [React v16.3](#react-v163)
    - [getDerivedStateFromProps的帮助来实现](#getderivedstatefromprops%E7%9A%84%E5%B8%AE%E5%8A%A9%E6%9D%A5%E5%AE%9E%E7%8E%B0)
    - [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate)
- [并不是父子关系的组件，如何实现相互的数据通信？](#%E5%B9%B6%E4%B8%8D%E6%98%AF%E7%88%B6%E5%AD%90%E5%85%B3%E7%B3%BB%E7%9A%84%E7%BB%84%E4%BB%B6%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9B%B8%E4%BA%92%E7%9A%84%E6%95%B0%E6%8D%AE%E9%80%9A%E4%BF%A1)
- [应该在React生命周期的什么阶段发出ajax请求，为什么？](#%E5%BA%94%E8%AF%A5%E5%9C%A8react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%9A%84%E4%BB%80%E4%B9%88%E9%98%B6%E6%AE%B5%E5%8F%91%E5%87%BAajax%E8%AF%B7%E6%B1%82%E4%B8%BA%E4%BB%80%E4%B9%88)
- [实现组件有哪些方式？](#%E5%AE%9E%E7%8E%B0%E7%BB%84%E4%BB%B6%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B9%E5%BC%8F)
- [高阶组件HoC（Higher-Order Component）](#%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6hochigher-order-component)

### React 使用场景
逻辑复杂单页应用，偏中后台管理系统，纯展示性的UI页面不合适

### React 生命周期

<img src="http://lrun1124.github.io/img/react_summary/lifeCycle.png" width = "700px"/>

#### Mounting
##### constructor
super(props)用来调用基类的构造方法( constructor() ), 通常，在 React 中，在构造函数中只做两件事：
 - 通过给 this.state 赋值对象来初始化内部 state。
 - 为事件处理函数绑定实例
```js
import React, { Component } from 'react';
class Test extends Component {
  constructor(props) {
    super(props);
  }
}
```
Test类继承了react Component这个基类，也就继承这个react的基类，才能有render(),生命周期等方法可以使用，这也说明为什么函数组件不能使用这些方法的原因。

##### componentWillMount

在组件挂载到DOM前调用，且只会被调用一次，在这边调用this.setState不会引起组件重新渲染，也可以把写在这边的内容提前到constructor()中，所以项目中很少用。

##### render
根据组件的props和state（无两者的重传递和重赋值，论值是否有变化，都可以引起组件重新render） ，return 一个React元素（描述组件，即UI），不负责组件实际渲染工作，之后由React自身根据此元素去渲染出页面DOM。render是纯函数（Pure function：函数的返回结果只依赖于它的参数；函数执行过程里面没有副作用），不能在里面执行this.setState，会有改变组件状态的副作用。

##### componentDidMount
componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。在这里可以
1. setState
2. 操作dom
3. 发请求获取初始数据

#### Updating
react组件更新机制。setState引起的state更新或父组件重新render引起的props更新，更新后的state和props相对之前无论是否有变化，都将引起子组件的重新render。

##### componentWillReceiveProps
组件将要接收新属性，此时，只要这个方法被触发，就证明父组件为当前子组件传递了新的属性值（首次并不会触发函数, 此方法只调用于props引起的组件更新过程中，参数nextProps是父组件传给当前组件的新props。但父组件render方法的调用不能保证重传给当前组件的props是有变化的，所以在此方法中根据nextProps和this.props来查明重传的props是否改变，以及如果改变了要执行啥，比如根据新的props调用this.setState出发当前组件的重新render

##### shouldComponentUpdate
此方法通过比较nextProps，nextState及当前组件的this.props，this.state，返回true时当前组件将继续执行更新过程，返回false则当前组件更新停止，以此可用来减少组件的不必要渲染，优化组件性能。

##### componentWillUpdate
此方法在调用render方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用。内存中的虚拟 DOM 树还是旧的，页面上的 DOM 树也是旧的

##### render
此时，又要重新根据最新的 state 和 props 重新渲染一颗内存中的虚拟 DOM 树，当 render 调用完毕，内存中的旧 DOM 树，已经被新 DOM 树替换了，此时页面还是旧的

##### componentDidUpdate
更新(dom已经更新)后会被立即调用。首次渲染不会执行此方法。当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求，componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语件里，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。

#### Unmounting
##### componentWillUnmount
在组件卸载及销毁之前直接调用。在这里可以释放资源, 比如清除定时器, removeEventListener，这里边setState是无效的, 不应该调用

#### React v16.3
React v16.3 deprecate了一组生命周期API，除了shouldComponentUpdate之外，render之前的所有生命周期函数全灭。包括：

- componentWillReceiveProps
- componentWillMount
- componentWillUpdate

##### getDerivedStateFromProps的帮助来实现
以前需要利用被deprecate的所有生命周期函数才能实现的功能，都可以通过getDerivedStateFromProps的帮助来实现。这个getDerivedStateFromProps是一个静态函数，所以函数体内不能访问this，简单说，就是应该一个纯函数。每当父组件引发当前组件的渲染过程时，getDerivedStateFromProps会被调用，这样我们有一个机会可以根据新的props和之前的state来调整新的state。

```js
static getDerivedStateFromProps(nextProps, prevState) {
  //根据nextProps和prevState计算出预期的状态改变，返回结果会被送给setState
}
```
##### getSnapshotBeforeUpdate
这函数会在render之后执行，而执行之时DOM元素还没有被更新，给了一个机会去获取DOM信息， 这个snapshot会作为componentDidUpdate的第三个参数传入。
```js
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('#enter getSnapshotBeforeUpdate');
    return 'foo';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('#enter componentDidUpdate snapshot = ', snapshot);
  }
```

所以新的流程如下：

<img src="http://lrun1124.github.io/img/react_summary/lifeCycle_new.jpeg" width = "700px"/>

可以注意到，说getDerivedStateFromProps取代componentWillReceiveProps是不准确的，因为componentWillReceiveProps只在Updating过程中才被调用，而且只在因为父组件引发的Updating过程中才被调用。

此外，从上面这个也看得出来，同样是Updating过程，如果是因为自身setState引发或者forceUpdate引发，而不是不由父组件引发，那么getDerivedStateFromProps也不会被调用。React v16.4修正了这一点。自身setState引发也会调用。


### 并不是父子关系的组件，如何实现相互的数据通信？
1. 父子组件之间的通信，一般是通过props来。简单来说，就是通过一个将需要通信的变量a定义在父组件中，然后通过props来传递给子组件，如果子组件要更改这个变量，那么父组件就需要定义setA方法，然后也通过props传递给子组件，这样就完成了父子组件之间的通信。
1. 如果两个组件离得近的话，我们可以在两个组件外层嵌套一个父组件，通过父组件共享变量进行通信。这样的话就可以采用上面那个方法来实现了。

下面是一个todo list的例子：
todo list包含一个输入组件和一个列表组件，这两个组件需要通信就需要在外层包裹一个TodoComponent，然后维护一个list列表，输入组件调用changeList方法添加事项，列表组件通过this.state.list的变化来重新渲染列表。
```js
export default class TodoComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[]
        };


    }
    changeList(last){
        this.setState({
            list: [...this.state.list, last]

    })
    }
    handleRemove(index){
        //console.log(this.state.list.splice(index,1));
        this.state.list.splice(index,1);
        this.setState({
            list:this.state.list
        })
    }


    render(){
        return(
            <div>
                <Inputcomponent changeList={(last)=>this.changeList(last)} list={this.state.list}/>
                <Listcomponent list={this.state.list} handleRemove={(index)=>this.handleRemove(index)}/>
            </div>

        )
    }

}
```
### 应该在React生命周期的什么阶段发出ajax请求，为什么？
AJAX请求应在 componentDidMount函数 进行请求。

### 实现组件有哪些方式？

1. React.createClass 使用API来定义组件
1. React ES6 class component 用 ES6 的class 来定义组件
1. Functional stateless component 通过函数定义无状态组件

### 高阶组件HoC（Higher-Order Component）
高阶组件就是一个 React 组件包裹着另外一个 React 组件

