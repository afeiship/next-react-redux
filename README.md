# next-react-redux
> React redux enhanced version based on next toolkit.

## options:
| name        | type   | value | description                     |
|:------------|:-------|:------|:--------------------------------|
| nx.$memory  | Object | {}    | Application memory data storage |
| nx.$local   | Object | null  | Application localStoarage       |
| nx.$session | Object | {}    | Application sessionStoreage     |
| nx.$app     | Object | {}    | Application instance            |


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
import { ReduxAppBase } from 'next-react-redux';

export default class extends ReduxAppBase {
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
    console.log(nx.$memory);
  }

  _onClick() {
    let {test} = nx.$local;
    test++;
    nx.$local = { test };
  }

  render() {
    const {test} = nx.$local;
    return (
      <div className="blank-module-view">
        member-list....{test}
        <button className="dc-button" onClick={this._onClick}>TEST</button>
      </div>
    );
  }
}
```
