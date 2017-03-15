var React= require('react');
var ReactDOM = require('react-dom');
var nx = require('next-js-core2');
var createStore=require('redux').createStore;
var bindActionCreators=require('redux').bindActionCreators;
var applyMiddleware = require('redux').applyMiddleware;
var ReduxThunk = require('redux-thunk').default;
var States = require('next-redux-base').states;
var Actions = require('next-redux-base').actions;
var Reducers = require('next-redux-base').reducers;

var ReduxBoot = nx.declare({
  statics:{
    run:function(inApp,inAppId){
      return new ReduxBoot(inApp,inAppId);
    }
  },
  methods:{
    init(inApp,inAppId){
      this._app = inApp;
      this._store = createStore(
        this.reducers.bind(this),
        applyMiddleware(ReduxThunk)
      );
      this._container = document.getElementById(inAppId);
      this.subscribe();
      this.renderTo();
    },
    reducers:function (inState,inAction) {
      var initialState = this._app.initialState();
      return Reducers( inState || initialState ,inAction);
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
          actions:bindActionCreators(Actions, this._store.dispatch),
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
