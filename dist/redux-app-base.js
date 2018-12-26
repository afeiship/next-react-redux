'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eventMitt = require('event-mitt');

var _eventMitt2 = _interopRequireDefault(_eventMitt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReduxAppBase = function (_React$Component) {
  _inherits(ReduxAppBase, _React$Component);

  function ReduxAppBase(inProps) {
    _classCallCheck(this, ReduxAppBase);

    var _this = _possibleConstructorReturn(this, (ReduxAppBase.__proto__ || Object.getPrototypeOf(ReduxAppBase)).call(this, inProps));

    Object.assign(ReduxAppBase, inProps, _eventMitt2.default);
    ReduxAppBase.one('*', function (inName, inData) {
      _this.eventBus(inName, inData);
    });
    return _this;
  }

  _createClass(ReduxAppBase, [{
    key: 'eventBus',
    value: function eventBus() {}
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return ReduxAppBase;
}(_react2.default.Component);

exports.default = ReduxAppBase;