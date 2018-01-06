import COMMAND from './const';
import React from 'react';
import nx from 'next-js-core2';

class ReduxAppBase extends React.Component {
  static attachEmiterSystem() {
    delete nx.event.init;
    nx.mix(ReduxAppBase.prototype, {
      __listeners__: {}
    }, nx.event);
  }

  constructor(props) {
    super(props);
    nx.mix(ReduxAppBase, props, this.commandMethods());
    this.attachCommands();
  }

  // componentDidMount() {
  //   const {root} = this.refs;
  //   if (root && root.history) {
  //     this.props.$.memory = {
  //       history: root.history
  //     };
  //   }
  // }

  commandMethods() {
    const self = this;
    return {
      command: function (inName, inData) {
        self.props.command(inName, inData, self);
      },
      onCommand: function (inName, inHandler) {
        self.props.onCommand(inName, inHandler, self);
      }
    }
  }

  attachCommands() {
    this.on(COMMAND, function (_, inArgs) {
      this.command && this.command(inArgs.name, inArgs.data);
    });
  }

  render() {
    return null;
  }
}

ReduxAppBase.attachEmiterSystem();

export default ReduxAppBase;
