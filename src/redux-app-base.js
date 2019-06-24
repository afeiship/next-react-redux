import React from 'react';
import EventMitt from 'event-mitt';
import nx from 'next-js-core2';

export default class extends React.Component {
  constructor(inProps) {
    super(inProps);
    nx.$app = nx.mix(this.constructor, inProps, EventMitt);
    nx.$app.one('*', (inName, inData) => {
      this.eventBus(inName, inData);
    });
  }
  eventBus() {}
  render() {
    return null;
  }
}
