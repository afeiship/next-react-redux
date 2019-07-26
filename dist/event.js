"use strict";

nx.event = {
  init: function init() {
    this.__listeners__ = {};
  },
  destroy: function destroy() {
    this.__listeners__ = {};
  },
  on: function on(inName, inHandler, inContext) {
    var map = this.__listeners__;
    var listeners = map[inName] = map[inName] || [];
    listeners.push({
      owner: this,
      handler: inHandler,
      context: inContext
    });
  },
  off: function off(inName, inHandler, inContext) {
    var listeners = this.__listeners__[inName];
    if (inHandler) {
      nx.each(listeners, function (index, listener) {
        if (listener.handler === inHandler && (!inContext || listener.context === inContext)) {
          listeners.splice(index, 1);
        }
      });
    } else {
      listeners.length = 0;
    }
  },
  fire: function fire(inName, inArgs) {
    var listeners = this.__listeners__[inName];
    if (listeners) {
      nx.each(listeners, function (_, listener) {
        if (listener && listener.handler) {
          if (listener.handler.call(listener.context || listener.owner, listener.owner, inArgs) === false) {
            return nx.BREAKER;
          }
        }
      });
    }
  }
};