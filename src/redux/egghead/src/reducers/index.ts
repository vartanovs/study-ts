import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromCreateList from './createList';
import { Filter } from '../types';

export interface State {
  byId: fromById.State;
  listByFilter: {
    [F in Filter]: fromCreateList.State;
  };
}

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;

export const getErrorMessage = (state: State, filter: Filter) => fromCreateList.getErrorMessage(state.listByFilter[filter]);

export const getIsFetching = (state: State, filter: Filter) => fromCreateList.getIsFetching(state.listByFilter[filter]);

export const getVisibleTodos = (state: State, filter: Filter) => {
  const ids = fromCreateList.getIds(state.listByFilter[filter]);
  return ids.map((id: string) => fromById.getTodo(state.byId, id));
};
