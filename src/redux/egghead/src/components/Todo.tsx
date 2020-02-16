import React from 'react';

interface TodoProps {
  completed: boolean;
  onClick: () => void;
  text: string;
}

const Todo: React.FC<TodoProps> = ({ onClick, completed, text }: TodoProps) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

export default Todo;
