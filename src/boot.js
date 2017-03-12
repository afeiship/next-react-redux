//import { createStore } from 'redux';
var React= require('react');
var ReactDOM = require('react-dom');
var nx = require('next-js-core2');
var createStore=require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var ReduxThunk = require('redux-thunk').default;


var ReduxBoot = nx.declare({
  statics:{
    run:function(inApp, inReducer, inAppId){
      return new ReduxBoot(inApp, inReducer, inAppId);
    }
  },
  methods:{
    init(inApp, inReducer, inAppId){
      this._app = inApp;
      this._store = createStore(
        inReducer,
        applyMiddleware(ReduxThunk)
      );
      this._container = document.getElementById(inAppId);
      this.subscribe();
      this.renderTo();
    },
    subscribe: function() {
      this._store.subscribe(this.renderTo.bind(this));
    },
    renderTo: function() {
      ReactDOM.render(
        React.createElement(this._app, {
          store: this._store
        }),
        this._container
      );
    }
  }
});

module.exports = ReduxBoot;
