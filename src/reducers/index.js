import {combineReducers} from 'redux';
import BooksReducer from "./books";

const allReducers = combineReducers ({
	books: BooksReducer
});

export default allReducers;