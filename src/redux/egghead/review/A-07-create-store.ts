import { Action, Reducer } from 'redux';

const createStore = (reducer: Reducer) => {
  const listeners: (() => void)[] = [];

  let state: unknown;

  const dispatch = (action: Action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const subscribe = (newListener: () => void) => {
    listeners.push(newListener);
    return () => listeners.filter((listener) => listener !== newListener); // return unsubscribe method
  };

  dispatch({} as Action);  // Dispatch dummy action for reducer to return initial state

  return { dispatch, getState, subscribe };
};

export default createStore;
