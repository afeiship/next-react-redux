# next-react-redux
> React redux enhanced version based on next toolkit.

## options:
| name        | type   | value | description                           |
| :---------- | :----- | :---- | :------------------------------------ |
| nx.$memory  | Object | {}    | Application memory data storage       |
| nx.$local   | Object | null  | Application localStoarage             |
| nx.$session | Object | {}    | Application sessionStoreage           |
| nx.$global  | Object | {}    | Application set/get global properties |
| nx.$app     | Object | {}    | Application instance                  |


## initial your reducer:
+ HTML
```html
<main id="app"></main>
```
+ index.js
```javascript
import  { $api, $config, $store } from '#';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { ReduxAppBase, ReduxBoot, reduxRender } from 'next-react-redux';
import 'assets/styles/index.scss';

// DO NOT USE `@hotable`
@reduxRender('app', { prefix: 'react-spa', loadable: false })
export default class extends ReduxAppBase {
  static initialState(inStore) {
    const { login } = inStore.local;
    return {
      local: {
        login: login || null
      },
      memory: {
        modalUser: false,
        modalUserQuery: false
      }
    };
  }

  componentDidMount() {
    const { history } = this.root;
    nx.$memory = { history };
  }

  eventBus(inName, inData) {
    console.log('*, I am - global event bus center:->', inName, inData);
  }

  render() {
    return (
      <Router ref={(root) => (this.root = root)}>
        <Switch>{renderRoutes(routes)}</Switch>
      </Router>
    );
  }
}
```
