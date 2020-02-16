import React from 'react';

import Todo from './Todo';
import { Todo as ITodo } from '../types';

interface TodoListProps {
  todos: ITodo[];
  onTodoClick: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onTodoClick }: TodoListProps) => (
  <ul>
    {todos.map((todo) => <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo} />)}
  </ul>
);

export default TodoList;
