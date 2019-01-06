'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxBoot = require('./redux-boot');

var _reduxBoot2 = _interopRequireDefault(_reduxBoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /** NOT SUPPORT IN HMR APP */


// import Loadable from 'react-loadable';

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

exports.default = function (inId, inOptions) {
  var loadable = inOptions.loadable,
      options = _objectWithoutProperties(inOptions, ['loadable']);

  return function (inTarget) {
    if (loadable) {
      Loadable.preloadReady().then(function () {
        _reduxBoot2.default.run(inTarget, inId, options);
      });
    } else {
      _reduxBoot2.default.run(inTarget, inId, options);
    }
  };
};