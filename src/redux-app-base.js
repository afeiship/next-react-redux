var React = require('react');
var ReduxAppBase =  React.createClass({
  displayName:'ReduxAppBase',
  componentWillMount:function(){
    Object.assign(ReduxAppBase,this.props);
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;



