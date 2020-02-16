// import { throttle } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// import { loadState, saveState } from './localStorage'
import todoApp from './reducers';

// const THROTTLE_MS = 1000;

// const thunk = (store) => (next) => (action) => typeof action === 'function'
//   ? action(store.dispatch, store.getState)
//   : next(action);

const configureStore = () => {
  // const persistedState = loadState();

  const middleware = [];
  middleware.push(thunk);
  middleware.push(createLogger());

  // Save state to local storage, no more than once a second
  // store.subscribe(throttle(() => saveState({
  //   todos: store.getState().todos
  // }), THROTTLE_MS));

  return createStore(
    todoApp,
    // persistedState,
    applyMiddleware(...middleware),
  );
};

export default configureStore;
