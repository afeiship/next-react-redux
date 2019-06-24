/** NOT SUPPORT IN HMR APP */
import ReduxBoot from './redux-boot';

/**
import  { $api, $config, $store } from '#';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import hotable from 'react-hmr-decorator';
import routes from './routes';
import { ReduxAppBase, ReduxBoot, reduxRender } from 'next-react-redux';
import 'assets/styles/index.scss';


@reduxRender('root', { prefix: 'fei-test' })
@hotable(module)
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
    AppBase.$.memory = {
      history: this.root.history
    };
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
 */

export default (inId, inOptions) => {
  const { loadable, ...options } = inOptions;
  return function(inTarget) {
    if (loadable) {
      const { preloadReady } = require('react-loadable');
      preloadReady().then(() => {
        ReduxBoot.run(inTarget, inId, options);
      });
    } else {
      ReduxBoot.run(inTarget, inId, options);
    }
  };
};
