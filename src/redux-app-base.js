var React = require('react');
var ReduxAppBase =  React.createClass({
  getInitialState(){
    Object.assign(ReduxAppBase,this.props);
    //console.log('Your can implment `initialState` to initial reducer state.');
    return null;
  },
  render:function(){
    return null;
  }
});

module.exports = ReduxAppBase;



