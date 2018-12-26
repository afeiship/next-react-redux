# next-react-redux
> React redux enhanced version based on next toolkit.

## options:
| name    | type   | value | description                     |
|:--------|:-------|:------|:--------------------------------|
| memory  | Object | {}    | Application memory data storage |
| local   | Object | null  | Application localStoarage       |
| session | Object | {}    | Application sessionStoreage     |


## initial your reducer:
+ HTML
```html
<main id="app"></main>
```
+ index.js
```javascript
// index.js:
import 'assets/styles/index.scss';
import { ReduxBoot } from 'next-react-redux';
import App from './app';

ReduxBoot.run(App, 'root', {
  prefix: 'react-spa'
});


//app.js:
import React from 'react';
import { ReduxAppBase } from 'next-react-redux';

export default class AppBase extends ReduxAppBase {
  static initialState() {
    return {
      memory: {
        initialData: {
          tes: 123,
          age: 100,
          items: []
        },
        myInitial: 0,
        sum: 0
      },
      local:{
        store:0,
        items:[
          { key:1 }
        ]
      },
      session:{
        afei:'session test..'
      }
    }
  }

  constructor(inProps){
    super(inProps);
    this._onClick = this._onClick.bind(this);
  }

  eventBus(inName,inData){
    console.log(inName,inData, 'I am global event bus!');
  }

  componentDidMount() {
    console.log(AppBase.$.memory);
  }

  _onClick() {
    let {test} = AppBase.$.local;
    test++;
    AppBase.$.local = { test };
  }

  render() {
    const {test} = AppBase.$.local;
    return (
      <div className="blank-module-view">
        member-list....{test}
        <button className="dc-button" onClick={this._onClick}>TEST</button>
      </div>
    );
  }
}
```
