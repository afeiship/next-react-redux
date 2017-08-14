# next-react-redux
> React redux enhanced version based on next toolkit.

## todo:
+ [ ] bugfix: inHandler.call(inContext, inSender, inArgs);(inArgs.data) 

## options:
| name | type | value | description |
| :----| :----| :----| :----|
| root  | ReactInstnace | null | Your root instance of the application |
| memory  | Object | {} | Application memory data storage |
| local  | Object | null | Application localStoarage |
| session  | Object | {} | Application sessionStoreage |
| request  | Object | {} | Application request data |


## initial your reducer:
```javascript
// index.js:
import {ReduxBoot} from 'next-react-redux';
import App from './app';
ReduxBoot.run(App,'app');

//app.js:
import React from 'react';
import {ReduxAppBase} from 'next-react-redux';

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

        <button className="dc-button" onClick={this._onClick.bind(this)}>TEST</button>
      </div>
    );
  }
}
```
