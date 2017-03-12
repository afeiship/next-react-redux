module.exports = {
  update:function(inData){
    return {
      type:'update',
      data:inData
    }
  },
  root:function(inData){
    return {
      type:'root',
      data:inData
    }
  },
  memory:function(inData){
    return {
      type:'memory',
      data:inData
    }
  },
  request:function(inData){
    return {
      type:'request',
      data:inData
    }
  },
  session:function(inData){
    return {
      type:'session',
      data:inData
    }
  },
  local:function(inData){
    return {
      type:'local',
      data:inData
    }
  }
};
