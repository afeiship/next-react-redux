var React = require('react');
var ReduxAppBase =  React.createClass({
  getInitialState:function(){
    Object.assign(ReduxAppBase,this.props);
    return null;
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;



