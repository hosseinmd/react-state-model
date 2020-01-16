import { useState, useEffect } from "react";
import { addListener } from "../core";

/**
 * @template S , A
 * @param {import("../core").Store<S, A>} store
 * @returns {(sensitiveStateKeys: (keyof S)[], listener: (S) => void) => [S, A]}
 */
export function createHooks(store) {
  function useHook(sensitiveStateKeys, listener) {
    if (typeof listener !== "function") listener = useState()[1];

    useEffect(() => {
      return addListener(store, listener, sensitiveStateKeys).remove;
    }, []);

    return store;
  }
  return useHook;
}

/**
 * @template S , A
 * @param {S} initialState
 * @param {A} actions
 * @param {(keyof S)[]} sensitiveStateKeys
 * @param {()=>void} listener
 * @returns {[S,A]}
 */
export function useLocalModel(
  model,
  initialState,
  sensitiveStateKeys,
  listener,
) {
  const useStore = useState(() => {
<<<<<<< HEAD
    const localStore = createStore(initialState, actions);
    return createHooks(localStore);
  }, [])[0];
=======
    const localStore = model.create(initialState);
    return createHooks(localStore);
  })[0];
>>>>>>> model
  return useStore(sensitiveStateKeys, listener);
}
