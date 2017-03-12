var React= require('react');
var ReactDOM = require('react-dom');
var nx = require('next-js-core2');
var createStore=require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var ReduxThunk = require('redux-thunk').default;
var Reducers = require('./redux-reducers');
var States = require('./redux-states');

var ReduxBoot = nx.declare({
  statics:{
    run:function(inApp, inAppId){
      return new ReduxBoot(inApp, inAppId);
    }
  },
  methods:{
    init(inApp, inAppId){
      this._app = inApp;
      this._store = createStore(
        Reducers,
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
          store: this._store,
          getState:this._store.getState.bind(this),
          dispatch:this._store.dispatch.bind(this),
          update: States.getUpdate.bind(this,this._store),
          root: States.getRoot.bind(this,this._store),
          memory: States.getMemory.bind(this,this._store),
          request: States.getRequest.bind(this,this._store),
          local: States.getLocal.bind(this),
          session: States.getSession.bind(this),
        }),
        this._container
      );
    }
  }
});

module.exports = ReduxBoot;
