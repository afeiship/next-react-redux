'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxBoot = require('./redux-boot');

var _reduxBoot2 = _interopRequireDefault(_reduxBoot);

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DEFAULT_OPTIONS = {
  loadable: true,
  prefix: 'next-nrr'
};

exports.default = function (inId, inOptions) {
  var _Object$assign = Object.assign({}, DEFAULT_OPTIONS, inOptions),
      loadable = _Object$assign.loadable,
      options = _objectWithoutProperties(_Object$assign, ['loadable']);

  return function (inTarget) {
    if (loadable) {
      _reactLoadable2.default.preloadReady().then(function () {
        _reduxBoot2.default.run(inTarget, inId, options);
      });
    } else {
      _reduxBoot2.default.run(inTarget, inId, options);
    }
  };
};