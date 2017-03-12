var React= require('react');
var ReactDOM = require('react-dom');
var nx = require('next-js-core2');
var createStore=require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var ReduxThunk = require('redux-thunk').default;
var reducers = require('./reducers');
var states = require('./states');

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
        reducers,
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
          root: states.getRoot.bind(this,this._store),
          memory: states.getMemory.bind(this,this._store),
          request: states.getRequest.bind(this,this._store),
          local: states.getLocal.bind(this),
          session: states.getSession.bind(this),
        }),
        this._container
      );
    }
  }
});

module.exports = ReduxBoot;
