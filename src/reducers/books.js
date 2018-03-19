import { List, fromJS } from 'immutable';
import {
  LOAD_BOOKS_SUCCESS,
  LOAD_BOOK_CARD_SUCCESS,
  SET_QUERY,
  SET_QUERYTYPE,
  CLEAR_BOOKS,
  IS_MOREBOOKS_AVAILABLE,
  LOAD_BOOKS_FAIL,
  LOAD_BOOKS_SUCCESS_AUTHOR,
  GET_BOOK_CARD_REQUEST,
} from '../actions/actionTypes';

const initialState = fromJS({
  books: [],
  book: [],
  isLoading: false,
  booksByAuthor: [],
  booksBySubject: [],
  query: '',
  queryType: 'intitle',
  isMoreBooksAvailable: false,
  error: '',
});

export default function books(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKS_SUCCESS:
      return state.update('books', books => books.concat(fromJS(action.books)));

    case GET_BOOK_CARD_REQUEST:
      return state.set('isLoading', true);

    case LOAD_BOOK_CARD_SUCCESS:
      return state.set('book', fromJS(action.book)).set('isLoading', false);

    case LOAD_BOOKS_SUCCESS_AUTHOR:
      return state.set('booksByAuthor', fromJS(action.booksByAuthor));

    case CLEAR_BOOKS:
      return state.set('books', List());

    case SET_QUERY:
      return state.set('query', action.query);

    case SET_QUERYTYPE:
      return state.set('queryType', action.queryType);

    case IS_MOREBOOKS_AVAILABLE:
      return state.set('isMoreBooksAvailable', action.payload);

    case LOAD_BOOKS_FAIL:
      return state.set('error', action.error);

    default:
      return state;
  }
}
