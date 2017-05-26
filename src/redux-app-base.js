var createReactClass = require('create-react-class');
var nx = require('next-js-core2');
var COMMAND = require('./const').COMMAND;

var ReduxAppBase = createReactClass({
  statics:{
    attachEmiterSystem:function(){
      var emiterSystem = nx.delete(nx.event, ['init']);
      nx.mix(ReduxAppBase.prototype, {
        __listeners__:{}
      },emiterSystem);
    }
  },
  getInitialState: function () {
    var self = this;
    nx.mix(ReduxAppBase, this.props, this.commandMethods());
    this.attachCommands();
    return null;
  },
  commandMethods:function(){
    var self = this;
    return {
      command: function (inName, inData) {
        self.props.command(inName, inData, self);
      },
      onCommand: function (inName, inHandler) {
        self.props.onCommand(inName, inHandler, self);
      }
    }
  },
  attachCommands: function () {
    this.on(COMMAND, function (_, inArgs) {
      this.command && this.command(inArgs.name, inArgs.data);
    });
  },
  render: function () {
    return null;
  }
});

//add nx.event for ReduxAppBase.
ReduxAppBase.attachEmiterSystem();

module.exports = ReduxAppBase;
