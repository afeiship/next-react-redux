import React from 'react';
import EventMitt from 'event-mitt';
import nx from 'next-js-core2';

class ReduxAppBase extends React.Component {
  constructor(inProps) {
    super(inProps);
    Object.assign(ReduxAppBase, inProps, EventMitt);
    // export to nx.$app
    nx.$app = ReduxAppBase;
    ReduxAppBase.one('*', (inName, inData) => {
      this.eventBus(inName, inData);
    });
  }
  eventBus() {}
  render() {
    return null;
  }
}

export default ReduxAppBase;
