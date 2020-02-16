import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Action, Reducer } from 'redux';

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

interface CounterProps {
  onDecrement: () => void;
  onIncrement: () => void;
  value: number;
}

const Counter: React.FC<CounterProps> = ({ onDecrement, onIncrement, value }: CounterProps) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

// eslint-disable-next-line
const render = () => ReactDOM.render(
  <Counter
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    value={store.getState()}
  />,
  document.getElementById('root')
);

store.subscribe(render);

render(); // Initial render

document.addEventListener('click', () => store.dispatch({ type: 'INCREMENT' }));
