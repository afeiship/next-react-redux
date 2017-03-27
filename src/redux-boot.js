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
  properties:{
    root:{
      set:function(inValue){
        var actions = bindActionCreators(Actions, this._store.dispatch);
        actions.root(inValue);
      },
      get:function(){
        return States.getRoot(this._store);
      }
    },
    memory:{
      set:function(inValue){
        var actions = bindActionCreators(Actions, this._store.dispatch);
        actions.memory(inValue);
      },
      get:function(){
        return States.getMemory(this._store);
      }
    },
    request:{
      set:function(inValue){
        var actions = bindActionCreators(Actions, this._store.dispatch);
        actions.request(inValue);
      },
      get:function(){
        return States.getRequest(this._store);
      }
    },
    local:{
      set:function(inValue){
        console.log('set local rboot:',inValue);
        var actions = bindActionCreators(Actions, this._store.dispatch);
        actions.local(inValue);
      },
      get:function(){
        return States.getLocal();
      }
    },
    session:{
      set:function(inValue){
        var actions = bindActionCreators(Actions, this._store.dispatch);
        actions.session(inValue);
      },
      get:function(){
        return States.getSession();
      }
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
          $:this
        }),
        this._container
      );
    }
  }
});

module.exports = ReduxBoot;
