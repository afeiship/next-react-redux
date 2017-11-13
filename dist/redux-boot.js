'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

var _nextReduxBase = require('next-redux-base');

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReduxBoot = _nextJsCore2.default.declare({
  statics: {
    run: function run(inApp, inAppId) {
      return new ReduxBoot(inApp, inAppId);
    }
  },
  properties: {
    root: {
      set: function set(inValue) {
        this._$actions.root(inValue);
      },
      get: function get() {
        return _nextReduxBase.States.getRoot(this._store);
      }
    },
    error: {
      set: function set(inValue) {
        this._$actions.error(inValue);
      },
      get: function get() {
        return _nextReduxBase.States.getError(this._store);
      }
    },
    memory: {
      set: function set(inValue) {
        this._$actions.memory(inValue);
      },
      get: function get() {
        return _nextReduxBase.States.getMemory(this._store);
      }
    },
    request: {
      set: function set(inValue) {
        this._$actions.request(inValue);
      },
      get: function get() {
        return _nextReduxBase.States.getRequest(this._store);
      }
    },
    local: {
      set: function set(inValue) {
        this._$actions.local(inValue);
      },
      get: function get() {
        return _nextReduxBase.States.getLocal();
      }
    },
    session: {
      set: function set(inValue) {
        this._$actions.session(inValue);
      },
      get: function get() {
        return _nextReduxBase.States.getSession();
      }
    }
  },
  methods: {
    init: function init(inApp, inAppId) {
      this._app = inApp;
      this._store = (0, _redux.createStore)(this.reducers.bind(this));
      this._container = document.getElementById(inAppId);
      this._$actions = (0, _redux.bindActionCreators)(_nextReduxBase.Actions, this._store.dispatch);
      this.subscribe();
      this.renderTo();
    },
    reducers: function reducers(inState, inAction) {
      var initialState = this._app.initialState();
      return (0, _nextReduxBase.Reducers)(inState || initialState, inAction);
    },
    subscribe: function subscribe() {
      this._store.subscribe(this.renderTo.bind(this));
    },
    command: function command(inName, inData, inContext) {
      inContext.fire(_const.COMMAND, {
        name: inName,
        data: inData
      }, inContext);
    },
    onCommand: function onCommand(inName, inHandler, inContext) {
      inContext.on(_const.COMMAND, function (inSender, inArgs) {
        if (inArgs.name === inName) {
          inHandler.call(inContext, inSender, inArgs.data);
        }
      }, inContext);
    },
    renderTo: function renderTo() {
      _reactDom2.default.render(_react2.default.createElement(this._app, {
        store: this._store,
        getState: this._store.getState.bind(this),
        dispatch: this._store.dispatch.bind(this),
        actions: (0, _redux.bindActionCreators)(_nextReduxBase.Actions, this._store.dispatch),
        update: _nextReduxBase.States.getUpdate.bind(this, this._store),
        command: this.command.bind(this),
        onCommand: this.onCommand.bind(this),
        $: this
      }), this._container);
    }
  }
});

exports.default = ReduxBoot;