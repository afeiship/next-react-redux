var React = require('react');
var ReduxAppBase =  React.createClass({
  getInitialState:function(){
    let initialReducer = this.initialReducer ;
    Object.assign(ReduxAppBase,this.props);
    initialReducer && initialReducer(ReduxAppBase.actions);
    return null;
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;



