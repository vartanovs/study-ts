import { Action, Reducer, createStore } from 'redux';

const countReducer: Reducer = (state = 0, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(countReducer);

const render = () => document.body.innerText = store.getState();

store.subscribe(render);

render(); // Initial render

document.addEventListener('click', () => store.dispatch({ type: 'INCREMENT' }));
