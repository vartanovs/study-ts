import React from 'react';
import { render } from 'react-dom';

import configureStore from './configureStore';
import Root from './Root';

render(
  <Root store={configureStore()} />,
  document.getElementById('root')
); // Initial render
