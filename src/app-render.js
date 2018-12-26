import ReduxBoot from './redux-boot';
import Loadable from 'react-loadable';

export default (inId, inOptions) => {
  const { loadable, ...options } = inOptions;
  return function(inTarget) {
    if (loadable) {
      Loadable.preloadReady().then(() => {
        ReduxBoot.run(inTarget, inId, options);
      });
    } else {
      ReduxBoot.run(inTarget, inId, options);
    }
  };
};
