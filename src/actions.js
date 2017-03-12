module.exports = {
  update:function(inData){
    return {
      type:'update',
      data:inData
    }
  },
  updateRoot:function(inData){
    return {
      type:'root',
      data:inData
    }
  },
  updateMemory:function(inData){
    return {
      type:'memory',
      data:inData
    }
  },
  updateRequest:function(inData){
    return {
      type:'request',
      data:inData
    }
  },
  updateSession:function(inData){
    return {
      type:'session',
      data:inData
    }
  },
  updateLocal:function(inData){
    return {
      type:'local',
      data:inData
    }
  }
};
