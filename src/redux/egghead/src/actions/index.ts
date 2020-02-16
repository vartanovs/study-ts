import { normalize } from 'normalizr';
import { Dispatch } from 'redux';

import * as api from '../api';
import * as schema from './schema';

import { getIsFetching } from '../reducers';

export const addTodo = (text: string) => (dispatch: Dispatch) => api
  .addTodo(text)
  .then((response) => dispatch({ type: 'ADD_TODOS_SUCCESS', response: normalize(response, schema.todo) }));

export const toggleTodo = (id: string) => (dispatch: Dispatch) => api
  .toggleTodo(id)
  .then((response) => dispatch({ type: 'TOGGLE_TODOS_SUCCESS', response: normalize(response, schema.todo) }));

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) return Promise.resolve(); // Don't dispatch if already fetching

  dispatch({ type: 'FETCH_TODOS_REQUEST', filter });
  return api.fetchTodos(filter)
    .then(
      (response) => dispatch({ type: 'FETCH_TODOS_SUCCESS', filter, response: normalize(response, schema.arrayOfTodos) }),
      (error) => dispatch({ type: 'FETCH_TODOS_FAILURE', filter, message: error.message || 'Something went wrong.' })
    );
};
