import { combineReducers, Reducer } from 'redux';
import { NormalizedAction, Filter } from '../types';

export interface State {
  errorMessage: string;
  ids: string[];
  isFetching: boolean;
}

const createList = (filter: Filter) => {
  const errorMessage: Reducer<string|null, NormalizedAction> = (state = null, action) => {
    if (action.filter !== filter) return state;
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message as string;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  const handleToggle: Reducer<string[], NormalizedAction> = (state = [], action) => {
    if (!action || !action.response || typeof action.response.result !== 'string') return state;
    const { result: toggleId, entities } = action.response;
    const { completed } = entities.todos[toggleId];
    const shouldRemove = (completed && filter === 'active') || (!completed && filter === 'completed');
    return shouldRemove ? state.filter((id) => id !== toggleId) : state;
  };

  const ids: Reducer<string[]> = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return action.filter === filter ? action.response.result : state;
      case 'ADD_TODOS_SUCCESS':
        return filter === 'completed' ? state : [...state, action.response.result];
      case 'TOGGLE_TODOS_SUCCESS':
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetching: Reducer<boolean, NormalizedAction> = (state = false, action) => {
    if (action.filter !== filter) return state;
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_FAILURE':
      case 'FETCH_TODOS_SUCCESS':
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    errorMessage,
    ids,
    isFetching,
  });
};

export default createList;

export const getErrorMessage = (state: State) => state.errorMessage;
export const getIds = (state: State) => state.ids;
export const getIsFetching = (state: State) => state.isFetching;
