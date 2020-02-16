import { Action } from 'redux';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface NormalizedAction extends Action {
  filter?: string;
  message?: string;
  response?:  {
    entities:  {
      todos:  {
        [ todoId: string ]: Todo;
      };
    };
    result: string|string[];
  };
}

export interface TodoAction extends Action, Todo { }
