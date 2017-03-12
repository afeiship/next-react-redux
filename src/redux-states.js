var nxStore = require('next-store');
module.exports={
  getUpdate:function(inStore){
    return inStore.getState();
  },
  getRoot:function(inStore){
    return inStore.getState().__root__;
  },
  getMemory:function(inStore){
    return inStore.getState().__memory__;
  },
  getRequest:function(inStore){
    return inStore.getState().__request__;
  },
  getLocal:function(inKeys){
    nxStore.engine='localStorage';
    return nxStore.gets(inKeys);
  },
  getSession:function(inKeys){
    nxStore.engine='sessionStorage';
    return nxStore.gets(inKeys);
  }
};
