
// function getInitialState() {
//   return {
//     __root__: null,
//     __request__: {},
//     __memory__: {},
//   };
// }

// export default  function (state = getInitialState(), action) {
//   const {type,data} = action;

//   switch (type) {
//     case 'update':
//       return Object.assign(state, data);
//     case 'request':
//       return Object.assign(state, { __request__: data});
//     case 'memory':
//       return Object.assign(state, { __memory__: data});
//     case 'session':
//       break;
//     case 'local':
//       break;
//   }
//   return state;
// }

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
    case 'request':
      return Object.assign(state, { __request__: data});
    case 'memory':
      return Object.assign(state, { __memory__: data});
    case 'session':
      break;
    case 'local':
      break;
  }

};
