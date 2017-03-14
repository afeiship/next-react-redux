var React = require('react');
var ReduxAppBase =  React.createClass({
  componentWillMount:function(){
    Object.assign(ReduxAppBase,this.props);
    this.initialState();
  },
  initialState(){
    console.log('Your can implment `initialState` to initial reducer state.');
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;



