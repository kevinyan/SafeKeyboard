define('SafeKeyboard.es6', function(require, exports, module) {

  'use strict';
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
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
  
  //fastclick
  if (window.FastClick) {
      if ('addEventListener' in document) {
          document.addEventListener('DOMContentLoaded', function () {
              FastClick.attach(document.body);
          }, false);
      }
  }
  
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
  
              return '<span id="keyboard' + temp.value + '" value="' + temp.value + '" data-index="' + temp.showindex + '">' + temp.facevalue + '</span>';
          }
      }, {
          key: 'checktype',
          value: function checktype(v) {
  
              var param = {};
  
              param.value = v.value;
              param.facevalue = v.facevalue;
              param.showindex = v.showindex;
  
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
  
          this.checkInputAttr();
  
          this.mvvm(this.inputer, 'value', this.inputer.value);
  
          this.showMap = [{ 'value': 1, 'facevalue': 1, 'showindex': 1 }, { 'value': 2, 'facevalue': 2, 'showindex': 2 }, { 'value': 3, 'facevalue': 3, 'showindex': 3 }, { 'value': 4, 'facevalue': 4, 'showindex': 4 }, { 'value': 5, 'facevalue': 5, 'showindex': 5 }, { 'value': 6, 'facevalue': 6, 'showindex': 6 }, { 'value': 7, 'facevalue': 7, 'showindex': 7 }, { 'value': 8, 'facevalue': 8, 'showindex': 8 }, { 'value': 9, 'facevalue': 9, 'showindex': 9 }, { 'value': 0, 'facevalue': 0, 'showindex': 11 }, { 'value': 'delete', 'facevalue': 'delete', 'showindex': 12 }];
  
          if (this.type) {
              if (this.type == 'identity') {
                  var tempArr = [];
                  this.showMap.forEach(function (ele, idx) {
                      tempArr.push(ele);
                      if (idx == 8) {
                          tempArr.push({ 'value': 'X', 'facevalue': 'X', 'showindex': 10 });
                      }
                  });
  
                  this.showMap = tempArr;
              }
          }
      }
  
      _createClass(Keyboard, [{
          key: 'checkInputAttr',
          value: function checkInputAttr() {
              if (this.checkInputExist()) {
                  if (this.getAttr(this.getInput(), 'value')) {
                      this.inputer = { 'value': this.getAttr(this.getInput(), 'value') };
                  }
                  if (this.getAttr(this.getInput(), 'autosubmit') && this.getAttr(this.getInput(), 'autosubmit') !== 'true') {
                      this.autosubmit = true;
                  }
                  this.getInput().innerHTML = this.inputer.value || '';
                  this.type = this.getAttr(this.getInput(), 'type') || '';
                  this.maxLength = this.getAttr(this.getInput(), 'max-length') || 999;
              }
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
              var _this = this;
  
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
  
              // ceatedom
              this.getDom('body').appendChild(dom);
  
              this.bindinpudom();
  
              // else{
              //     this.getInput().addEventListener('click',() =>{
              //         this.show();
              //     },false)
              // }
  
  
              // render keyboard button
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
                          _this.mvvm(_this.inputer, 'value', k);
                      }, false);
                  }
              });
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
              setTimeout(function () {
                  // dom.style.bottom = '-50%';
                  dom.style.webkitTransform = 'scale(.5, .5) translate3d(-50%, 150%,0)';
                  dom.style.transform = 'scale(.5, .5) translate3d(-50%, 150%,0)';
                  if (_this5.checkInputExist()) {
                      _this5.getInput().classList.remove('focus');
                  }
              }, 100);
          }
      }, {
          key: 'renderButton',
          value: function renderButton() {}
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
                      // console.log('...........'+value)
                      value = newVal;
                      if (_this6.checkInputExist()) {
                          _this6.updatedom();
                      } else {
                          document.getElementById('inputa').innerHTML = value;
                      }
                  }
              });
          }
      }, {
          key: 'updatedom',
          value: function updatedom() {
              var dom = this.getInput();
              dom.value = this.inputer.value;
              dom.innerHTML = this.inputer.value;
              this.dealplaceholder();
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
              alert(this.inputer.value);
          }
      }, {
          key: 'rebind',
          value: function rebind() {
              this.checkInputAttr();
              this.bindinpudom();
              this.mvvm(this.inputer, 'value', this.inputer.value);
          }
      }]);
  
      return Keyboard;
  }();
  
  var inputs = document.querySelectorAll('input');
  inputs.forEach(function (ele, idx) {
      ele.addEventListener('focus', function () {
          console.log(ele.getBoundingClientRect());
      });
  });
  
  var key = new Keyboard();
  
  if (typeof define === 'function' && _typeof(define.amd) === 'object' && define.amd) {
      // AMD. Register as an anonymous module.
      define(function () {
          return key;
      });
  } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = key;
  } else {
      window.Keyboard = key;
  }

});
