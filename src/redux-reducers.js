var nxStore = require('next-store');
var defaultState = {
  __root__: null,
  __request__: {},
  __memory__: {},
};

module.exports = function(inState,inAction){
  var type = inAction.type;
  var data = inAction.data;
  var state = Object.assign(defaultState,inState);

  switch(type){
    case 'update':
      return Object.assign(state, data);
    case 'root':
      return Object.assign(state, { __root__: data});
    case 'request':
      return Object.assign(state, { __request__: data});
    case 'memory':
      return Object.assign(state, { __memory__: data});
    case 'session':
    case 'local':
      nxStore.engine = type+'Storage';
      nxStore.sets(data);
      return state;
  }

  return state;
};
