import ReduxBoot from './redux-boot';
import Loadable from 'react-loadable';

const DEFAULT_OPTIONS = {
  loadable: true,
  prefix: 'next-nrr'
};

export default (inId, inOptions) => {
  const { loadable, ...options } = Object.assign({}, DEFAULT_OPTIONS, inOptions);
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
