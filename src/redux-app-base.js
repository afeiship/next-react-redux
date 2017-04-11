var createReactClass = require('create-react-class');
var ReduxAppBase =  createReactClass({
  getInitialState:function(){
    Object.assign(ReduxAppBase,this.props);
    return null;
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;
