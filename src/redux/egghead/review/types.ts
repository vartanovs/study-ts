import { Action } from 'redux';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface ToggleTodoAction extends Action { id: number }
export interface AddTodoAction extends ToggleTodoAction { text: string }
export interface VisibilityFilterAction extends Action { filter: string }

export type TodoAction = AddTodoAction | ToggleTodoAction;
export type AppAction = TodoAction | VisibilityFilterAction;
