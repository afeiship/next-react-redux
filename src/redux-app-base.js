var React = require('react');
var ReduxAppBase =  React.createClass({
  displayName:'ReduxAppBase',
  componentWillMount:function(){
    Object.assign(ReduxAppBase,this.props);
    this.initialReducerState();
  },
  initialReducerState(){
    console.log('Your can implment `initialReducerState` to initial reducer state.');
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;



