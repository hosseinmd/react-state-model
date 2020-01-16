"use strict";

import { IS_STORE } from "../../symbols";

export function setState(newState = {}) {
  Object.assign(this, { ...newState });
  let queueUpdate = [];
  for (const key in newState) {
    if (newState.hasOwnProperty(key) && this.__listeners[key])
      for (const listener of this.__listeners[key]) {
        if (!queueUpdate.includes(listener)) queueUpdate.push(listener);
      }
  }
  for (const listener of queueUpdate) {
    typeof listener == "function" && listener(getSnapshot(this));
  }
}

export function getSnapshot(store) {
  const snapshot = {};
  Object.keys(store.__types).forEach(key => {
    snapshot[key] = createSnapshot(store.__types[key], store[key]);
  });
  return snapshot;
}

function createSnapshot(type, value) {
  if (Array.isArray(type) && Array.isArray(value)) {
    return value.map(value => createSnapshot(type[0], value));
  }
  if (typeof value == "object" && value.__status == IS_STORE) {
    return getSnapshot(value);
  }

  return value;
}
