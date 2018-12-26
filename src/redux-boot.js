import React from 'react';
import ReactDOM from 'react-dom';
import nx from 'next-js-core2';
import { createStore, bindActionCreators } from 'redux';
import NxStore from 'next-store';

const States = require('next-redux-base').states;
const Actions = require('next-redux-base').actions;
const Reducers = require('next-redux-base').reducers;
const DEFAULT_PREFIX = { prefix: 'nrrx' };

export default nx.declare({
  statics: {
    _instance: null,
    run: function(inApp, inAppId, inOptions) {
      //module.hot must create every time:
      const instance = (this._instance = new this(inApp, inAppId, inOptions));
      instance.renderTo();
      return instance;
    },
    initialState: function() {
      return this._instance._app.initialState(NxStore);
    }
  },
  properties: {
    memory: {
      set: function(inValue) {
        this._$actions.memory(inValue);
      },
      get: function() {
        return States.getMemory(this._store);
      }
    },
    local: {
      set: function(inValue) {
        this._$actions.local(inValue);
      },
      get: function() {
        return States.getLocal();
      }
    },
    session: {
      set: function(inValue) {
        this._$actions.session(inValue);
      },
      get: function() {
        return States.getSession();
      }
    }
  },
  methods: {
    init: function(inApp, inAppId, inOptions) {
      this._app = inApp;
      this._options = inOptions || DEFAULT_PREFIX;
      this._store = createStore(this.reducers.bind(this));
      this._container = document.getElementById(inAppId);
      this._$actions = bindActionCreators(Actions, this._store.dispatch);
      this.subscribe();
    },
    reducers: function(inState, inAction) {
      //setPrefix:
      NxStore.config(this._options.prefix);
      const initialState = this._app.initialState(NxStore);
      return Reducers(inState || initialState, inAction, this._options);
    },
    subscribe: function() {
      this._store.subscribe(this.renderTo.bind(this));
    },
    renderTo: function() {
      ReactDOM.render(
        React.createElement(this._app, {
          store: this._store,
          getState: this._store.getState.bind(this),
          dispatch: this._store.dispatch.bind(this),
          actions: bindActionCreators(Actions, this._store.dispatch),
          update: States.getUpdate.bind(this, this._store),
          $: this
        }),
        this._container
      );
    }
  }
});
