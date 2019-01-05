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

var _nextStore = require('next-store');

var _nextStore2 = _interopRequireDefault(_nextStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var States = require('next-redux-base').states;
var Actions = require('next-redux-base').actions;
var Reducers = require('next-redux-base').reducers;
var DEFAULT_PREFIX = { prefix: 'nrrx' };

exports.default = _nextJsCore2.default.declare({
  statics: {
    _instance: null,
    run: function run(inApp, inAppId, inOptions) {
      //module.hot must create every time:
      var instance = this._instance = new this(inApp, inAppId, inOptions);
      instance.renderTo();
      instance.export();
      return instance;
    },
    initialState: function initialState() {
      return this._instance._app.initialState(_nextStore2.default);
    }
  },
  properties: {
    memory: {
      set: function set(inValue) {
        this._$actions.memory(inValue);
      },
      get: function get() {
        return States.getMemory(this._store);
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
    export: function _export() {
      _nextJsCore2.default.each(this.__properties__, function (key, value) {
        var descriptor = {
          get: value.get.bind(this),
          set: value.set.bind(this)
        };
        _nextJsCore2.default.defineProperty(_nextJsCore2.default, '$' + key, descriptor);
      }, this);
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