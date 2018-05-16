import React from 'react';
import ReactDOM from 'react-dom';
import nx from 'next-js-core2';
import {createStore, bindActionCreators} from 'redux';
import COMMAND from './const';

const States = require('next-redux-base').states;
const Actions = require('next-redux-base').actions;
const Reducers = require('next-redux-base').reducers;


const ReduxBoot = nx.declare({
  statics : {
    _instance: null,
    run: function run(inApp, inAppId, inOptions) {
      var instance = this._instance = this._instance || new ReduxBoot(inApp, inAppId, inOptions);
      instance.renderTo();
      return instance;
    }
  },
  properties: {
    root: {
      set: function (inValue) {
        this._$actions.root(inValue);
      },
      get: function () {
        return States.getRoot(this._store);
      }
    },
    error: {
      set: function (inValue) {
        this._$actions.error(inValue);
      },
      get: function () {
        return States.getError(this._store);
      }
    },
    memory: {
      set: function (inValue) {
        this._$actions.memory(inValue);
      },
      get: function () {
        return States.getMemory(this._store);
      }
    },
    request: {
      set: function (inValue) {
        this._$actions.request(inValue);
      },
      get: function () {
        return States.getRequest(this._store);
      }
    },
    local: {
      set: function (inValue) {
        this._$actions.local(inValue);
      },
      get: function () {
        return States.getLocal();
      }
    },
    session: {
      set: function (inValue) {
        this._$actions.session(inValue);
      },
      get: function () {
        return States.getSession();
      }
    }
  },
  methods: {
    init: function (inApp, inAppId, inOptions) {
      this._app = inApp;
      this._options = inOptions;
      this._store = createStore(
        this.reducers.bind(this)
      );
      this._container = document.getElementById(inAppId);
      this._$actions = bindActionCreators(Actions, this._store.dispatch);
      this.subscribe();
    },
    reducers: function (inState, inAction) {
      const initialState = this._app.initialState();
      return Reducers(inState || initialState, inAction, this._options);
    },
    subscribe: function () {
      this._store.subscribe(this.renderTo.bind(this));
    },
    command: function (inName, inData, inContext) {
      inContext.fire(COMMAND, {
        name: inName,
        data: inData
      }, inContext);
    },
    onCommand: function (inName, inHandler, inContext) {
      var handler = function (inSender, inArgs) {
        if (inArgs.name === inName) {
          inHandler.call(inContext, inSender, inArgs.data);
        }
      };

      //attache:
      inContext.on(COMMAND, handler, inContext);

      return {
        destroy: function(){
          inContext.off(COMMAND, handler, inContext);
        }
      };
    },
    renderTo: function () {
      ReactDOM.render(
        React.createElement(this._app, {
          store: this._store,
          getState: this._store.getState.bind(this),
          dispatch: this._store.dispatch.bind(this),
          actions: bindActionCreators(Actions, this._store.dispatch),
          update: States.getUpdate.bind(this, this._store),
          command: this.command.bind(this),
          onCommand: this.onCommand.bind(this),
          $: this
        }),
        this._container
      );
    }
  }
});

export default ReduxBoot;
