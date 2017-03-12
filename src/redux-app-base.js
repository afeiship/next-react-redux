var React = require('react');
var ReduxAppBase =  React.createClass({
  displayName:'ReduxAppBase',
  componentWillMount:function(){
    Object.assign(AppBase,this.props);
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;



