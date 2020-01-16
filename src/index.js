import { createStore, addListener, getSnapshot } from "./core";
import { IS_MODEL } from "./symbols";
export * from "./hooks";


/**
 * @template S
 * @template A
 * @typedef {object} Model
 * @property {() => import("./core").Store<S,A>} create
 * @property {(listener: (state: S) => void, sensitiveStatesKey: (keyof S)[]) => Model<S, A>} addListener
 * @property {(_initializer: import("./core").Initializer<S,A>)=> Model<S,A>} initializer
 */

/**
 * @template S
 * @template A
 * @param {S} state
 * @param {(setState:(S)=>void,self: import("./core").Store<S,{}>) => A } [getActions]
 * @returns {Model<S, A>}
 */
export const model = (state, getActions) => {
  let initializer = undefined;
  const listeners = [];

  const organizer = {
    __status: IS_MODEL,
    initializer(_initializer) {
      initializer = _initializer;
      return organizer;
    },
    create(initialState) {
      const store = createStore(state, initialState, getActions, initializer);
      (listeners || []).forEach(listenerArg => {
        addListener(
          store,
          listenerArg.listener,
          listenerArg.sensitiveStatesKey,
        );
      });

      return store;
    },
    addListener(listener, sensitiveStatesKey) {
      const listenerArg = { listener, sensitiveStatesKey };
      listeners.push(listenerArg);

      return organizer;
    },
  };
  return organizer;
};

export { addListener, getSnapshot };
