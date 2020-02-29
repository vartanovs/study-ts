import * as React from 'react';
import { lazy, Suspense, useState } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';

import NavBar from './NavBar';
import ThemeContext from './ThemeContext';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const App = () => {
	const themeHook = useState('darkBlue');
	return (
		<ThemeContext.Provider value={themeHook}>
			<div>
				<NavBar />
				<Suspense fallback={<h1>Loading Route...</h1>}>
					<Router>
						<SearchParams path='/' />
						<Details path='/details/:id' />
					</Router>
				</Suspense>
			</div>
		</ThemeContext.Provider>
	)
};

render(<App />, document.getElementById('root'));
