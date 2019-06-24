'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxBoot = require('./redux-boot');

var _reduxBoot2 = _interopRequireDefault(_reduxBoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /** NOT SUPPORT IN HMR APP */


exports.default = function (inId, inOptions) {
  var loadable = inOptions.loadable,
      options = _objectWithoutProperties(inOptions, ['loadable']);

  return function (inTarget) {
    if (loadable) {
      var Loadable = require('react-loadable');
      Loadable && Loadable.preloadReady().then(function () {
        _reduxBoot2.default.run(inTarget, inId, options);
      });
    } else {
      _reduxBoot2.default.run(inTarget, inId, options);
    }
  };
};