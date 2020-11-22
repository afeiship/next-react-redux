# next-react-redux
> React redux enhanced version based on next toolkit.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm i @jswork/next-react-redux
```

## options
| name        | type   | value | description                           |
| :---------- | :----- | :---- | :------------------------------------ |
| nx.$memory  | Object | {}    | Application memory data storage       |
| nx.$local   | Object | null  | Application localStoarage             |
| nx.$session | Object | {}    | Application sessionStoreage           |
| nx.$global  | Object | {}    | Application set/get global properties |
| nx.$app     | Object | {}    | Application instance                  |


## get-started
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
import { ReduxAppBase, ReduxBoot, reduxRender } from '@jswork/next-react-redux';
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
    nx.$global = { 'abc.test': 123 };
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

## license
Code released under [the MIT license](https://github.com/afeiship/next-react-redux/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-react-redux
[version-url]: https://npmjs.org/package/@jswork/next-react-redux

[license-image]: https://img.shields.io/npm/l/@jswork/next-react-redux
[license-url]: https://github.com/afeiship/next-react-redux/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-react-redux
[size-url]: https://github.com/afeiship/next-react-redux/blob/master/dist/next-react-redux.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-react-redux
[download-url]: https://www.npmjs.com/package/@jswork/next-react-redux
