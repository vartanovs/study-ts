import { v4 } from 'uuid';
import { Todo } from '../types';

const API_DELAY = 500;
const ERROR_RATE = 0.2;

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.
const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
  }, {
    id: v4(),
    text: 'let’s go',
    completed: false,
  }],
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = (filter: string) => delay(API_DELAY)
  .then(() => {
    if (Math.random() <= ERROR_RATE) throw new Error('Fetch call failed.');

    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter((todo) => !todo.completed);
      case 'completed':
        return fakeDatabase.todos.filter((todo) => todo.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });

export const addTodo = (text: string) => delay(API_DELAY)
  .then(() => {
    const newTodo = {
      id: v4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push(newTodo);
    return newTodo;
  });

export const toggleTodo = (id: string) => delay(API_DELAY)
  .then(() => {
    const selectedTodo = fakeDatabase.todos.find((todo) => todo.id === id) as Todo;
    selectedTodo.completed = !selectedTodo.completed;
    return selectedTodo;
  });
