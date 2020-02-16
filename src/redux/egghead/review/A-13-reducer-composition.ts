import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { Reducer } from 'redux';
import { Todo, AddTodoAction, AppAction, TodoAction, ToggleTodoAction, VisibilityFilterAction } from './types';

interface AppState {
  todos: Todo[];
  visibilityFilter: string;
}

const todoReducer: Reducer<Todo|undefined, TodoAction> = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: (action as AddTodoAction).text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (!state || state.id !== action.id) return state;
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

const todosReducer: Reducer<Todo[], TodoAction> = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action) as Todo,
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) => todoReducer(todo, action) as Todo);
    default:
      return state;
  }
};

const visibilityReducer: Reducer<string, VisibilityFilterAction> = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp: Reducer<Partial<AppState>, AppAction> = (state = {}, action) => ({
  todos: todosReducer(state.todos, action as TodoAction),
  visibilityFilter: visibilityReducer(state.visibilityFilter, action as VisibilityFilterAction),
});

const testAddTodo = () => {
  const stateBefore: Todo[] = [];
  const stateAfter: Todo[] = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    },
  ];

  const action: AddTodoAction = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux',
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore: Todo[] = [
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

  const stateAfter: Todo[] = [
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

  const action: ToggleTodoAction = {
    type: 'TOGGLE_TODO',
    id: 1,
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
};

const testVisibilityFilter = () => {
  const stateBefore: AppState = {
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

  const stateAfter: AppState = {
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

  const action: VisibilityFilterAction = {
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
