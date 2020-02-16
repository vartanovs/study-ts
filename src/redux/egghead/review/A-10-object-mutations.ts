import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { Todo } from './types';

const toggleTodo = (todo: Todo) => ({ ...todo, completed: !todo.completed });

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false,
  };

  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true,
  };

  deepFreeze(todoBefore);

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testToggleTodo();
