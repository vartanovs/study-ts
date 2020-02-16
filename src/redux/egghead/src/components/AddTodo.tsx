import React from 'react';
import { Dispatch } from 'redux';
import { connect, DispatchProp } from 'react-redux';

import { addTodo } from '../actions';

const AddTodo: React.FC<{ dispatch?: Dispatch }> = ({ dispatch }: DispatchProp) => {
  let input: HTMLInputElement;

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!input.value.trim()) return;

          addTodo(input.value)(dispatch);
          input.value = ''; // Clear input field
        }}
      >
        <input ref={(node) => { input = node; }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default connect()(AddTodo); // Inject 'dispatch' as a prop
