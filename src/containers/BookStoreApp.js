import React from 'react';
import BookList from './BookList';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import allReducers from '../reducers/index.js';

const store = createStore (allReducers);

export default class BookStoreApp extends React.Component {
	render(){
		return(

			<Provider store={store}>
				<div>
					<h1>SEARCH HEADER</h1>
					<BookList />
				</div>
			</Provider>
		);
	}
}