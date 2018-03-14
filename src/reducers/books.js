import {
  LOAD_BOOKS_SUCCESS,
  SET_QUERY,
  SET_QUERYTYPE,
  CLEAR_BOOKS,
  IS_MOREBOOKS_AVAILABLE,
  LOAD_BOOKS_FAIL,
} from '../actions/actionTypes';

const initialState = {
  books: [],
  booksByAuthor: [],
  booksBySubject: [],
  query: '',
  queryType: 'intitle',
  isMoreBooksAvailable: false,
  error: '',
};

export default function books(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKS_SUCCESS:
      return { ...state, books: [...state.books, ...action.books] };

    case CLEAR_BOOKS:
      return { ...state, books: [] };

    case SET_QUERY:
      return { ...state, query: action.query };

    case SET_QUERYTYPE:
      return { ...state, queryType: action.queryType };
      
    case IS_MOREBOOKS_AVAILABLE:
      return { ...state, isMoreBooksAvailable: action.payload };

    case LOAD_BOOKS_FAIL:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
