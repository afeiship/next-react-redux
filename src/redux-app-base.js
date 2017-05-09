var createReactClass = require('create-react-class');
var nx = require('next-js-core2');
var ReduxAppBase =  createReactClass({
  getInitialState:function(){
    nx.mix(ReduxAppBase,this.props);
    return null;
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;
