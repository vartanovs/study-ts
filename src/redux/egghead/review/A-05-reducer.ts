import expect from 'expect';
import { Action, Reducer } from 'redux';

const countReducer: Reducer = (state = 0, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

expect(countReducer(0, { type: 'INCREMENT' })).toEqual(1);
expect(countReducer(1, { type: 'INCREMENT' })).toEqual(2);
expect(countReducer(2, { type: 'DECREMENT' })).toEqual(1);
expect(countReducer(1, { type: 'DECREMENT' })).toEqual(0);
expect(countReducer(undefined, { type: 'UNKNOWN' })).toEqual(0);
expect(countReducer(1, { type: 'UNKNOWN' })).toEqual(1);
