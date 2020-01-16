"use strict";
/**
 * @template S
 * @param {import("../").Store<S,{}>} store
 * @param {(state: S) => void} listener
 * @param {(keyof S)[]} sensitiveStatesKey
 * @returns {{remove(): void}}
 */
export function addListener(store, listener, sensitiveStatesKey) {
  if (!Array.isArray(sensitiveStatesKey))
    sensitiveStatesKey = Object.keys(store.__types);

  for (const stateKey of sensitiveStatesKey) {
    store.__listeners[stateKey]
      ? store.__listeners[stateKey].push(listener)
      : (store.__listeners[stateKey] = [listener]);
  }

  return {
    remove: () => {
      for (const stateKey of sensitiveStatesKey) {
        store.__listeners[stateKey] = store.__listeners[stateKey].filter(
          prevListener => prevListener !== listener,
        );
      }
    },
  };
}
