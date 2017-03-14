var nxStore = require('next-store');
module.exports = function(inState,inAction){
  var type = inAction.type;
  var data = inAction.data;
  var state = {
    __root__: inState.root || null,
    __request__: inState.request || {},
    __memory__: inState.memory || {}
  };


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
    case '@@redux/INIT':
      data = inState.local || inState.session;
      if(data){
        nxStore.engine = inState.local ? 'localStorage' : 'sessionStorage';
        nxStore.sets(data);
      }
      break;
  }

  return state;
};
