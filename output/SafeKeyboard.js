define('SafeKeyboard.es6', function(require, exports, module) {

  'use strict';
  
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  /*
  *
  * @file 安全键盘
  * 
  */
  
  /*
  ios10+ 双击扩大禁止
  http://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari
   */
  document.addEventListener('touchmove', function (event) {
      event = event.originalEvent || event;
      if (event.scale > 1) {
          event.preventDefault();
      }
  }, false);
  
  var lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
      var now = Date.now();
      if (now - lastTouchEnd <= 300) {
          event.preventDefault();
      }
      lastTouchEnd = now;
  }, false);
  
  // fastclick
  if (window.FastClick) {
      if ('addEventListener' in document) {
          document.addEventListener('DOMContentLoaded', function () {
              FastClick.attach(document.body);
          }, false);
      }
  }
  
  var event = document.createEvent('Event');
  event.initEvent('build', true, true);
  
  // 按钮类
  
  var KeyboardButton = function () {
      function KeyboardButton() {
          _classCallCheck(this, KeyboardButton);
  
          this.index = 0;
      }
  
      _createClass(KeyboardButton, [{
          key: 'create',
          value: function create(v) {
              var temp = this.checktype(v);
              if (temp.show) {
                  return '<span id="keyboard' + temp.value + '" value="' + temp.value + '" data-index="' + temp.showindex + '">' + temp.facevalue + '</span>';
              }
  
              return '';
          }
      }, {
          key: 'checktype',
          value: function checktype(v) {
              var param = {};
              param.value = v.value;
              param.facevalue = v.facevalue;
              param.showindex = v.showindex;
              param.show = v.show;
              return param;
          }
      }]);
  
      return KeyboardButton;
  }();
  
  // 键盘类
  
  
  var Keyboard = function () {
      function Keyboard(params) {
          _classCallCheck(this, Keyboard);
  
          this.params = params;
          this.keyamount = 12;
          this.keyamountperline = 3;
          this.inputer = { 'value': '' };
          this.type = '';
          this.maxLength = 999;
          this.autosubmit = false;
  
          this.showMap = [{ 'value': 1, 'facevalue': 1, 'showindex': 1, 'show': true }, { 'value': 2, 'facevalue': 2, 'showindex': 2, 'show': true }, { 'value': 3, 'facevalue': 3, 'showindex': 3, 'show': true }, { 'value': 4, 'facevalue': 4, 'showindex': 4, 'show': true }, { 'value': 5, 'facevalue': 5, 'showindex': 5, 'show': true }, { 'value': 6, 'facevalue': 6, 'showindex': 6, 'show': true }, { 'value': 7, 'facevalue': 7, 'showindex': 7, 'show': true }, { 'value': 8, 'facevalue': 8, 'showindex': 8, 'show': true }, { 'value': 9, 'facevalue': 9, 'showindex': 9, 'show': true }, { 'value': 'X', 'facevalue': 'X', 'showindex': 10, 'show': false }, { 'value': 0, 'facevalue': 0, 'showindex': 11, 'show': true }, { 'value': 'delete', 'facevalue': 'delete', 'showindex': 12, 'show': true }];
  
          this.checkInputAttr();
      }
  
      _createClass(Keyboard, [{
          key: 'checkInputAttr',
          value: function checkInputAttr() {
              if (this.checkInputExist()) {
                  this.inputer.value = '';
                  if (this.getAttr(this.getInput(), 'value')) {
                      this.inputer = { 'value': this.getAttr(this.getInput(), 'value') };
                  }
                  if (this.getAttr(this.getInput(), 'autosubmit') && this.getAttr(this.getInput(), 'autosubmit') !== 'true') {
                      this.autosubmit = true;
                  }
                  this.getInput().innerHTML = this.inputer.value || '';
                  this.type = this.getAttr(this.getInput(), 'type') || '';
                  this.maxLength = this.getAttr(this.getInput(), 'max-length') || 999;
  
                  if (this.type && this.type == 'identity') {
                      this.showMap.forEach(function (ele, idx) {
                          if (ele.value == 'X') {
                              ele.show = true;
                          }
                      });
                  } else {
                      this.showMap.forEach(function (ele, idx) {
                          if (ele.value == 'X') {
                              ele.show = false;
                          }
                      });
                  }
              } else {
                  if (document.querySelector('.myinput')) {
                      // this.type = '';
                      // this.inputer = {'value':''};
                      // this.autosubmit = false;
                      // this.maxLength = 999;
                      // this.showMap.forEach((ele,idx)=>{
                      //     if(ele.value == 'X'){
                      //         ele.show = false;
                      //     }
                      // })
                  } else {
                      this.type = '';
                      this.inputer.value = '';
                      this.maxLength = 9999;
                      if (this.type && this.type == 'identity') {
                          this.showMap.forEach(function (ele, idx) {
                              if (ele.value == 'X') {
                                  ele.show = true;
                              }
                          });
                      } else {
                          this.showMap.forEach(function (ele, idx) {
                              if (ele.value == 'X') {
                                  ele.show = false;
                              }
                          });
                      }
  
                      if (this.getDom('#keyboard')) {
                          this.show();
                      }
                  }
              }
  
              this.mvvm(this.inputer, 'value', this.inputer.value);
          }
      }, {
          key: 'checkInputExist',
          value: function checkInputExist() {
              if (document.getElementById('skeyinputer')) {
                  return true;
              } else {
                  return false;
              }
          }
      }, {
          key: 'create',
          value: function create() {
  
              //create  keyboard
              var dom = document.createElement("div");
              dom.id = 'keyboard';
              dom.setAttribute('class', 'keyboard');
  
              var html = ['<ul>'];
              for (var i = 1; i < this.keyamount + 1; i++) {
                  if (i % 3 == 1) {
                      html.push('<div class="keyamountline">');
                  }
                  html.push('<li id="kholder' + i + '"></li>');
  
                  if (i % 3 == 0) {
                      html.push('</div>');
                  }
              }
              html.push('</ul>');
              dom.innerHTML = html.join('');
  
              // ceateKeyboarddom
              this.getDom('body').appendChild(dom);
  
              // 给input绑定事件
              this.bindinpudom();
  
              // render keyboard button
              this.renderButton();
          }
      }, {
          key: 'renderButton',
          value: function renderButton() {
              var _this = this;
  
              this.showMap.forEach(function (v) {
                  var btn = new KeyboardButton();
                  var btndom = btn.create(v);
                  var domholder = _this.getDom('#kholder' + v.showindex);
                  domholder.innerHTML = btndom;
              });
  
              // bind evnet
              this.showMap.forEach(function (v) {
                  var domk = _this.getDom('#keyboard' + v.value);
                  if (domk) {
                      domk.addEventListener('touchmove', function (e) {
                          e.preventDefault();
                      }, false);
  
                      domk.addEventListener('touchend', function (e) {
                          var k = _this.calculate(_this.inputer.value, v.value);
                          _this.inputer['value'] = k;
                          // this.mvvm(this.inputer,'value',k);
                      });
                  }
              });
          }
      }, {
          key: 'destory',
          value: function destory() {
              document.getElementById('keyboard').parentNode.removeChild(document.getElementById('keyboard'));
          }
      }, {
          key: 'bindinpudom',
          value: function bindinpudom() {
              var _this2 = this;
  
              if (this.checkInputExist()) {
  
                  // 是否 show
                  this.getInput().addEventListener('click', function () {
                      _this2.show();
                  }, false);
                  // 自动聚焦功能
                  if (this.getAttr(this.getInput(), 'autofocus') === 'true') {
                      this.show();
                  }
              }
          }
      }, {
          key: 'offbinddom',
          value: function offbinddom() {
              if (this.checkInputExist()) {
                  this.getInput().removeEventListener('click', function () {
                      console.log('remove');
                  });
              }
          }
      }, {
          key: 'renderKey',
          value: function renderKey(val) {
              var keybtn = new KeyboardButton();
              return keybtn.create(val, this.params);
          }
      }, {
          key: 'getDom',
          value: function getDom(selector) {
              return document.querySelector(selector);
          }
      }, {
          key: 'getInput',
          value: function getInput() {
              return this.getDom('#skeyinputer');
          }
      }, {
          key: 'getAttr',
          value: function getAttr(dom, key) {
              return dom.getAttribute(key);
          }
      }, {
          key: 'setAttr',
          value: function setAttr(dom, key, val) {
              return dom.setAttribute(key, val);
          }
      }, {
          key: 'calculate',
          value: function calculate(oldval, val) {
              var _this3 = this;
  
              var totalval = '';
              var nowvalue = oldval;
  
              if (val === 'delete') {
                  totalval = nowvalue.slice(0, nowvalue.length - 1);
              } else {
                  if (nowvalue.length < parseInt(this.maxLength, 10)) {
                      totalval = nowvalue + val;
                      if (totalval.length === parseInt(this.maxLength, 10) && this.autosubmit) {
                          setTimeout(function () {
                              _this3.callback();
                          }, 300);
                      }
                  } else {
                      totalval = nowvalue;
                  }
              }
  
              return totalval;
          }
      }, {
          key: 'show',
          value: function show() {
              var _this4 = this;
  
              var dom = this.getDom('#keyboard');
              setTimeout(function () {
                  // dom.style.bottom = 0;
                  dom.style.webkitTransform = 'scale(.5, .5) translate3d(-50%, 50%,0)';
                  dom.style.transform = 'scale(.5, .5) translate3d(-50%, 50%,0)';
  
                  if (_this4.checkInputExist()) {
                      // 处理placeholder
                      _this4.dealplaceholder();
                      _this4.getInput().classList.add('focus');
                      if (_this4.getInput.value) {
                          _this4.getInput().classList.add('active');
                      }
                  }
              }, 100);
          }
      }, {
          key: 'hide',
          value: function hide() {
              var _this5 = this;
  
              var dom = this.getDom('#keyboard');
              if (dom) {
                  setTimeout(function () {
                      // dom.style.bottom = '-50%';
                      dom.style.webkitTransform = 'scale(.5, .5) translate3d(-50%, 300%,0)';
                      dom.style.transform = 'scale(.5, .5) translate3d(-50%, 300%,0)';
                      if (_this5.checkInputExist()) {
                          _this5.getInput().classList.remove('focus');
                      }
                  }, 100);
              }
          }
      }, {
          key: 'mvvm',
          value: function mvvm(data, key, value) {
              var _this6 = this;
  
              Object.defineProperty(data, key, {
                  enumerable: true, // 可枚举
                  configurable: true, // 不能再define
                  get: function get(e) {
                      // console.log('...........'+value)
                      return value;
                  },
                  set: function set(newVal) {
                      value = newVal;
                      // console.log('~~~~~~~~~'+value)
                      _this6.updatedom();
                  }
              });
          }
      }, {
          key: 'updatedom',
          value: function updatedom() {
              var dom = this.getInput();
              if (dom) {
                  dom.value = this.inputer.value;
                  dom.innerHTML = this.inputer.value;
                  this.dealplaceholder();
              } else {
                  // this.dispatchEvent({type:'ck', message:this.inputer.value});
              }
              event.inputer = this.inputer.value;
              document.dispatchEvent(event);
          }
      }, {
          key: 'dealplaceholder',
          value: function dealplaceholder() {
              var inp = this.getInput();
              var ph = this.getAttr(inp, 'placeholder');
              var vl = this.inputer.value;
              var inpClassList = inp.classList;
              if (ph && !vl) {
                  inp.innerHTML = ph;
                  inp.classList.remove('active');
              } else {
                  inp.classList.add('active');
              }
          }
      }, {
          key: 'callback',
          value: function callback() {
              console.log('i am callback');
          }
      }, {
          key: 'getValue',
          value: function getValue() {
              return this.inputer.value;
          }
      }, {
          key: 'clearValue',
          value: function clearValue() {
              this.inputer.value = '';
          }
      }, {
          key: 'rebind',
          value: function rebind(time) {
              var _this7 = this;
  
              var time = time || 0;
              setTimeout(function () {
                  _this7.checkInputAttr();
                  _this7.renderButton();
                  _this7.offbinddom();
                  _this7.bindinpudom();
              }, time);
          }
      }]);
  
      return Keyboard;
  }();
  
  // let inputs = document.querySelectorAll('input');
  // inputs.forEach((ele,idx)=>{
  //     ele.addEventListener('focus',()=>{
  //         console.log(ele.getBoundingClientRect())
  //     })
  // })
  
  
  // Object.assign( Keyboard.prototype, EventDispatcher.prototype );
  
  var key;
  
  var getKeyboard = function getKeyboard() {
      if (key) {
          return key;
      } else {
          key = new Keyboard();
          key.create();
          return key;
      }
  };
  module.exports = getKeyboard;
  
  // if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  //     // AMD. Register as an anonymous module.
  //     define(function() {
  //         return key;
  //     });
  // } else if (typeof module !== 'undefined' && module.exports) {
  //     module.exports = key;
  // } else {
  //     window.Keyboard = key;
  // }

});
