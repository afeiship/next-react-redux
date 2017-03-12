var React = require('react');
module.exports =  React.createClass({
  displayName:'AppBase',
  componentWillMount:function(){
    Object.assign(AppBase,this.props);
  },
  render:function(){
    return null;
  }
});



