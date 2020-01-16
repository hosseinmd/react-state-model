"use strict";

export { getSnapshot } from "./lib/setState";
export { addListener } from "./lib/Listener";

import { setState } from "./lib/setState";
import { IS_STORE } from "../symbols";

/**
 * @template S
 * @template A
 * @typedef {S & A} Store
 */

/**
 * @template S , A
 * @typedef {(store: Store<S, A>) => S} Initializer
 */

/**
 * @template S , A
 * @param {S} state
 * @param {object} initialState
 * @param {A} [actions]
 * @param {Initializer<S, A>} [initializer]
 * @returns {Store<S, A>}
 */
export const createStore = (state, initialState = {}, actions, initializer) => {
  const store = {
    ...state,
    ...initialState,
    __status: IS_STORE,
    __listeners: {},
    __types: state,
  };
  actions && Object.assign(store, actions(setState.bind(store), store));
  initializer && Object.assign(store, initializer(store));
  return store;
};
