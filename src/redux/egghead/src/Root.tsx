import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Store } from 'redux';

import App from './App';

interface RootProps { store: Store }

const Root: React.FC<RootProps> = ({ store }: RootProps) => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
);

export default Root;
