define('pubsub.es6', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var Pubsub = function () {
      function Pubsub() {
          _classCallCheck(this, Pubsub);
  
          this.handlers = {};
      }
  
      _createClass(Pubsub, [{
          key: "on",
          value: function on(eventType, handler) {
              if (!(eventType in this.handlers)) {
                  this.handlers[eventType] = [];
              }
              this.handlers[eventType].push(handler);
              console.log();
              return this;
          }
      }, {
          key: "emit",
          value: function emit(eventType) {
              var handlerArgs = Array.prototype.slice.call(arguments, 1);
              for (var i = 0; i < this.handlers[eventType].length; i++) {
                  this.handlers[eventType][i].apply(this, handlerArgs);
              }
              return this;
          }
      }, {
          key: "off",
          value: function off(eventType, handler) {
              var currentEvent = this.handlers[eventType];
              var len = 0;
              if (currentEvent) {
                  len = currentEvent.length;
                  for (var i = len - 1; i >= 0; i--) {
                      if (currentEvent[i] === handler) {
                          currentEvent.splice(i, 1);
                      }
                  }
              }
              return this;
          }
      }]);
  
      return Pubsub;
  }();
  
  exports.default = Pubsub;
  
  // demo:
  // let pubsub = new Pubsub();
  // pubsub.on('A', function(data){
  //             console.log(1 + data);
  //  });
  // pubsub.emit('A', 'test');

});
