#next-redux-boot
> Redux boot enhanced version based on next toolkit.


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
import {ReduxBoot} from 'next-redux-boot';
import App from './app';
ReduxBoot.run(App,'app');

//app.js:
import React from 'react';
import {ReduxAppBase} from 'next-redux-boot';

export default class extends ReduxAppBase {
  componentDidMount() {
    console.log(ReduxAppBase.memory());
  }

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
          {key:1}
        ]
      },
      session:{
        afei:'session test..'
      }
    }
  }

  _onClick() {
    const {actions} = ReduxAppBase;
    let {test} = ReduxAppBase.local(['test']);
    test++;
    actions.local({test: test})
  }

  render() {
    const {test} = ReduxAppBase.local(['test']);
    return (
      <div className="blank-module-view">
        member-list....{test}

        <button className="dc-button" onClick={this._onClick.bind(this)}>TEST</button>
      </div>
    );
  }
}
```
