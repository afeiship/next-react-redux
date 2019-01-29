import React from 'react';
import EventMitt from 'event-mitt';
import nx from 'next-js-core2';

export default class extends React.Component {
  constructor(inProps) {
    super(inProps);
    const App = this.constructor;
    Object.assign(App, inProps, EventMitt);
    nx.$app = App;
    nx.$app.one('*', (inName, inData) => {
      this.eventBus(inName, inData);
    });
  }
  eventBus() {}
  render() {
    return null;
  }
}
