'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReduxAppBase = function (_React$Component) {
  _inherits(ReduxAppBase, _React$Component);

  _createClass(ReduxAppBase, null, [{
    key: 'attachEmiterSystem',
    value: function attachEmiterSystem() {
      delete nx.event.init;
      nx.mix(ReduxAppBase.prototype, {
        __listeners__: {}
      }, nx.event);
    }
  }]);

  function ReduxAppBase(props) {
    _classCallCheck(this, ReduxAppBase);

    var _this = _possibleConstructorReturn(this, (ReduxAppBase.__proto__ || Object.getPrototypeOf(ReduxAppBase)).call(this, props));

    nx.mix(ReduxAppBase, props, _this.commandMethods());
    _this.attachCommands();
    return _this;
  }

  _createClass(ReduxAppBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var root = this.refs.root;

      if (root && root.history) {
        this.props.$.memory = {
          history: root.history
        };
      }
    }
  }, {
    key: 'commandMethods',
    value: function commandMethods() {
      var self = this;
      return {
        command: function command(inName, inData) {
          self.props.command(inName, inData, self);
        },
        onCommand: function onCommand(inName, inHandler) {
          self.props.onCommand(inName, inHandler, self);
        }
      };
    }
  }, {
    key: 'attachCommands',
    value: function attachCommands() {
      this.on(_const2.default, function (_, inArgs) {
        this.command && this.command(inArgs.name, inArgs.data);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return ReduxAppBase;
}(_react2.default.Component);

ReduxAppBase.attachEmiterSystem();

exports.default = ReduxAppBase;