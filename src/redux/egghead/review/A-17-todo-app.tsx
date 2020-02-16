import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, Reducer } from 'redux';
import { Todo as ITodo, AddTodoAction, TodoAction, ToggleTodoAction } from './types';

const todoReducer: Reducer<ITodo|undefined, TodoAction> = (state, action) => {
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

const todosReducer: Reducer<ITodo[], TodoAction> = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action as AddTodoAction) as ITodo,
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) => todoReducer(todo, action as ToggleTodoAction) as ITodo);

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

const todoApp = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityReducer,
});

const store = createStore(todoApp);

let nextTodoId = 0;

const getVisibleTodos = (todos: ITodo[], filter: string) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter((todo) => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

// -- PRESENTATIONAL COMPONENTS -- //
interface AddTodoProps {
  onAddClick: (inputValue: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddClick }: AddTodoProps) => {
  let input: HTMLInputElement;
  return (
    <div>
      <input ref={(node) => input = node!} />
      <button onClick={() => {
        onAddClick(input.value);
        input!.value = ''; // clear input field
      }}>
        Add Todo
      </button>
    </div>
  );
};

interface FilterLinkProps {
  children: string;
  currentFilter: string;
  filter: string;
  onClick: (filter: string) => void;
}

const FilterLink: React.FC<FilterLinkProps> = ({ children, currentFilter, filter, onClick }: FilterLinkProps) => {
  if (currentFilter === filter) return (<span>{children}</span>);
  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </a>
  );
};

interface FooterProps {
  onFilterClick: (filter: string) => void;
  visibilityFilter: string;
}

const Footer: React.FC<FooterProps> = ({ onFilterClick, visibilityFilter }: FooterProps) => (
  <p>
    Show:
    {' '}<FilterLink currentFilter={visibilityFilter} filter="SHOW_ALL" onClick={onFilterClick}>All</FilterLink>
    {' '}<FilterLink currentFilter={visibilityFilter} filter="SHOW_ACTIVE" onClick={onFilterClick}>Active</FilterLink>
    {' '}<FilterLink currentFilter={visibilityFilter} filter="SHOW_COMPLETED" onClick={onFilterClick}>Completed</FilterLink>
  </p>
);

interface TodoProps {
  completed: boolean;
  onClick: () => void;
  text: string;
}

const Todo: React.FC<TodoProps> = ({ completed, onClick, text }: TodoProps) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

interface TodoListProps {
  onTodoClick: (todoId: number) => void;
  todos: ITodo[];
}

const TodoList: React.FC<TodoListProps> = ({ onTodoClick, todos }: TodoListProps) => (
  <ul>
    {todos.map((todo) => <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo} />)}
  </ul>
);

// -- CONTAINER COMPONENTS -- //
interface TodAppProps {
  todos: ITodo[];
  visibilityFilter: string;
}

const TodoApp: React.FC<TodAppProps> = ({ todos, visibilityFilter }: TodAppProps) => (
  <div>
    <AddTodo
      onAddClick={(text) => store.dispatch({ type: 'ADD_TODO', id: nextTodoId++, text })} // eslint-disable-line
    />
    <TodoList
      onTodoClick={(id) => store.dispatch({ type: 'TOGGLE_TODO', id })}
      todos={getVisibleTodos(todos, visibilityFilter)}
    />
    <Footer
      onFilterClick={(filter) => store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })}
      visibilityFilter={visibilityFilter}
    />
  </div>
);

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root'),
  );
};

store.subscribe(render);
render(); // Initial render
