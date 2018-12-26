import React from 'react';
import EventMitt from 'event-mitt';

class ReduxAppBase extends React.Component {
  constructor(inProps) {
    super(inProps);
    Object.assign(ReduxAppBase, inProps, EventMitt);
    ReduxAppBase.on('*', (inName, inData) => {
      this.eventBus(inName, inData);
    });
  }

  eventBus() {}
  render() {
    return null;
  }
}

export default ReduxAppBase;
