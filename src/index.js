// import React, { Component } from 'react';
// import ReactDom from 'react-dom'

// class App extends Component {
//   render() {
//     return <div>Hello world!</div>
//   }
// }

// ReactDom.render(<App />, document.getElementById('root'))
// import _ from 'loadsh'

// console.log(_.join(['a', 'b', 'c']))

// function getComponent() {
//   return import(/* webpackChunkName:"loadsh" */ 'loadsh').then(res => {
//     var element = document.getElement('div')
//     element.innerHTML = _.join(['a', 'b', 'c'])
//     return element
//   })
// }

// document.addEventListener('click', () => {
//   import(/* webpackPrefetch: true*/ './click.js').then(({default: func}) => {
//     func()
//   })
// })
// import './style.css'
// import _ from 'loadsh'
// import $ from 'jquery'
// import { ui } from './jquery.ui'

// ui()
// console.log('hello world1111')
// console.log('body', $('body'))

console.log('this === window:', this === window)