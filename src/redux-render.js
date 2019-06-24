/** NOT SUPPORT IN HMR APP */
import ReduxBoot from './redux-boot';

export default (inId, inOptions) => {
  const { loadable, ...options } = inOptions;
  return function(inTarget) {
    if (loadable) {
      const Loadable = require('react-loadable');
      Loadable &&
        Loadable.preloadReady().then(() => {
          ReduxBoot.run(inTarget, inId, options);
        });
    } else {
      ReduxBoot.run(inTarget, inId, options);
    }
  };
};
