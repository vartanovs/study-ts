import { Reducer } from 'redux';
import { NormalizedAction, Todo } from '../types';

export interface State {
  [id: string]: Todo;
}

const byId: Reducer<State, NormalizedAction> = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
  // switch (action.type) {
  //   case 'FETCH_TODOS_SUCCESS':
  //     const nextState = { ...state };
  //     action.response.forEach(todo => nextState[todo.id] = todo);
  //     return nextState;
  //   case 'ADD_TODOS_SUCCESS':
  //     return {
  //       ...state,
  //       [action.response.id]: action.response,
  //     }
  //   default:
  //     return state;
  // }
};

export default byId;

export const getTodo = (state: State, id: string) => state[id];
