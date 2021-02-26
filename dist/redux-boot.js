'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _next = require('@jswork/next');

var _next2 = _interopRequireDefault(_next);

var _redux = require('redux');

var _nextStore = require('@jswork/next-store');

var _nextStore2 = _interopRequireDefault(_nextStore);

var _nextGlobal = require('@jswork/next-global');

var _nextGlobal2 = _interopRequireDefault(_nextGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var States = require('@jswork/next-redux-base').states;
var Actions = require('@jswork/next-redux-base').actions;
var Reducers = require('@jswork/next-redux-base').reducers;
var DEFAULT_PREFIX = { prefix: 'nrrx' };
var storeInstance = new _nextStore2.default();

exports.default = _next2.default.declare({
  statics: {
    instance: null,
    run: function run(inApp, inAppId, inOptions) {
      //module.hot must create every time:
      var instance = this.instance = new this(inApp, inAppId, inOptions);
      instance.renderTo();
      return instance;
    },
    initialState: function initialState() {
      return this.instance._app.initialState(storeInstance);
    }
  },
  properties: {
    memory: {
      set: function set(inValue) {
        this._$actions.setMemory(inValue);
      },
      get: function get() {
        return States.getMemory(this._store);
      }
    },
    local: {
      set: function set(inValue) {
        this._$actions.setLocal(inValue);
      },
      get: function get() {
        return States.getLocal();
      }
    },
    session: {
      set: function set(inValue) {
        this._$actions.setSession(inValue);
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
      this.exports();
    },
    exports: function exports() {
      _next2.default.forIn(this.__properties__, function (key, value) {
        var descriptor = {
          get: value.get.bind(this),
          set: value.set.bind(this)
        };
        _next2.default.defineProperty(_next2.default, '$' + key, descriptor);
      }, this);
    },
    reducers: function reducers(inState, inAction) {
      //setPrefix:
      storeInstance.config(this._options.prefix);
      var initialState = this._app.initialState(storeInstance);
      (0, _nextGlobal2.default)(initialState.global);
      return Reducers(inState || initialState, inAction, this._options);
    },
    subscribe: function subscribe() {
      this._store.subscribe(this.renderTo.bind(this));
    },
    renderTo: function renderTo() {
      _reactDom2.default.render(_react2.default.createElement(this._app, {
        store: this._store,
        getState: this._store.getState.bind(this),
        dispatch: this._store.dispatch.bind(this),
        actions: (0, _redux.bindActionCreators)(Actions, this._store.dispatch),
        $: this
      }), this._container);
    }
  }
});