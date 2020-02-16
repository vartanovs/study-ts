import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { Reducer } from 'redux';
import { Todo } from './types';

interface AppState {
  todos: Todo[];
  visibilityFilter: string;
}

const todoReducer: Reducer<Todo> = (state: Todo, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) return state;
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

const todosReducer: Reducer<Todo[]> = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) => todoReducer(todo, action));

    default:
      return state;
  }
};

const visibilityReducer: Reducer<string> = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp: Reducer<Partial<AppState>> = (state = {}, action) => ({
  todos: todosReducer(state.todos, action),
  visibilityFilter: visibilityReducer(state.visibilityFilter, action),
});

const testAddTodo = () => {
  const stateBefore = [];
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    },
  ];

  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux',
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: false,
    },
  ];

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: true,
    },
  ];

  const action = {
    type: 'TOGGLE_TODO',
    id: 1,
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
};

const testVisibilityFilter = () => {
  const stateBefore = {
    todos: [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false,
      },
      {
        id: 1,
        text: 'Go Shopping',
        completed: false,
      },
    ],
    visibilityFilter: 'SHOW_ALL',
  };

  const stateAfter = {
    todos: [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false,
      },
      {
        id: 1,
        text: 'Go Shopping',
        completed: false,
      },
    ],
    visibilityFilter: 'SHOW_COMPLETED',
  };

  const action = {
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED',
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todoApp(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
testVisibilityFilter();
