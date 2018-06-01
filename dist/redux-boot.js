'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

var _redux = require('redux');

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _nextStore = require('next-store');

var _nextStore2 = _interopRequireDefault(_nextStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var States = require('next-redux-base').states;
var Actions = require('next-redux-base').actions;
var Reducers = require('next-redux-base').reducers;
var DEFAULT_PREFIX = { prefix: 'nrrx' };

var ReduxBoot = _nextJsCore2.default.declare({
  statics: {
    _instance: null,
    run: function run(inApp, inAppId, inOptions) {
      //module.hot must create every time:
      var instance = this._instance = new ReduxBoot(inApp, inAppId, inOptions);
      instance.renderTo();
      return instance;
    },
    initialState: function initialState() {
      return this._instance._app.initialState(_nextStore2.default);
    }
  },
  properties: {
    root: {
      set: function set(inValue) {
        this._$actions.root(inValue);
      },
      get: function get() {
        return States.getRoot(this._store);
      }
    },
    error: {
      set: function set(inValue) {
        this._$actions.error(inValue);
      },
      get: function get() {
        return States.getError(this._store);
      }
    },
    memory: {
      set: function set(inValue) {
        this._$actions.memory(inValue);
      },
      get: function get() {
        return States.getMemory(this._store);
      }
    },
    request: {
      set: function set(inValue) {
        this._$actions.request(inValue);
      },
      get: function get() {
        return States.getRequest(this._store);
      }
    },
    local: {
      set: function set(inValue) {
        this._$actions.local(inValue);
      },
      get: function get() {
        return States.getLocal();
      }
    },
    session: {
      set: function set(inValue) {
        this._$actions.session(inValue);
      },
      get: function get() {
        return States.getSession();
      }
    }
  },
  methods: {
    init: function init(inApp, inAppId, inOptions) {
      this._app = inApp;
      this._options = inOptions || DEFAULT_PREFIX;
      this._store = (0, _redux.createStore)(this.reducers.bind(this));
      this._container = document.getElementById(inAppId);
      this._$actions = (0, _redux.bindActionCreators)(Actions, this._store.dispatch);
      this.subscribe();
    },
    reducers: function reducers(inState, inAction) {
      //setPrefix:
      _nextStore2.default.config(this._options.prefix);
      var initialState = this._app.initialState(_nextStore2.default);
      return Reducers(inState || initialState, inAction, this._options);
    },
    subscribe: function subscribe() {
      this._store.subscribe(this.renderTo.bind(this));
    },
    command: function command(inName, inData, inContext) {
      inContext.fire(_const2.default, {
        name: inName,
        data: inData
      }, inContext);
    },
    onCommand: function onCommand(inName, inHandler, inContext) {
      var handler = function handler(inSender, inArgs) {
        if (inArgs.name === inName) {
          inHandler.call(inContext, inSender, inArgs.data);
        }
      };

      //attache:
      inContext.on(_const2.default, handler, inContext);

      return {
        destroy: function destroy() {
          inContext.off(_const2.default, handler, inContext);
        }
      };
    },
    renderTo: function renderTo() {
      _reactDom2.default.render(_react2.default.createElement(this._app, {
        store: this._store,
        getState: this._store.getState.bind(this),
        dispatch: this._store.dispatch.bind(this),
        actions: (0, _redux.bindActionCreators)(Actions, this._store.dispatch),
        update: States.getUpdate.bind(this, this._store),
        command: this.command.bind(this),
        onCommand: this.onCommand.bind(this),
        $: this
      }), this._container);
    }
  }
});

exports.default = ReduxBoot;