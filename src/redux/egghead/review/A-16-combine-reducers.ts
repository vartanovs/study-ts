import { ReducersMapObject, AnyAction } from 'redux';

// Scratch implementation of redux.combineReducers()

// Accept a dictionary of { state keys : reducer } shape. ex: { todo: todoReducer }, etc
// Return a single reducer of shape `(state = {}, action) => {};`
// This reducer iterates through all state keys ...
// ... getting the reducer (`reducers[key]`) and prevState (`state[key]`) at each key  ...
// ... and generating the nextState for each key by calling the appropriate reducer for each key

const combineReducers = (reducers: ReducersMapObject) => (state: unknown = {}, action: AnyAction) => Object.keys(reducers)
  .reduce((nextState, key) => {
    nextState[key] = reducers[key](state[key], action);
    return nextState;
  }, {});

// Ex: ['login', 'reduce'].reduce((nextState, key) => {...}, {});
// nextState starts off as empty object
// first nextState[login] = loginReducer(state[login], action);
// then nextState[register] = registerReducer(state[register], action);
// ... in this way, all states are combined into one state object ...
// ... and action is only applied where it is relevant (could be w/multiple reducers)
//

export default combineReducers;
