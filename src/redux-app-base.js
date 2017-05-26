var createReactClass = require('create-react-class');
var nx = require('next-js-core2');
var ReduxAppBase = createReactClass({
  mixins: [nx.event],
  getInitialState: function () {
    var self = this;
    nx.mix(ReduxAppBase, this.props, {
      command: function (inName, inData) {
        self.props.command(inName, inData, self)
      }
    });
    this.componentAttachCommands();
    return null;
  },
  componentAttachCommands: function () {
    this.init();
    this.on('__command__', function (_, inArgs) {
      this.command && this.command(inArgs.name, inArgs.data);
    });
  },
  render: function () {
    return null;
  }
});

module.exports = ReduxAppBase;
