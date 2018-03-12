import {
  LOAD_BOOKS_DESCRIPTION_AUTHOR,
  LOAD_BOOKS_DESCRIPTION_SUBJECT,
  CLEAR_BOOKS_DESCRIPTION_AUTHOR,
  CLEAR_BOOKS_DESCRIPTION_SUBJECT,
} from '../actions/actionTypes';

const initialState = {
  booksDescriptionAuthor: [],
  booksDescriptionSubject: [],
  query: '',
  queryType: 'intitle',
  startIndex: 0,
};

export default function description_books(state = initialState, action) {
  switch (action.type) {

      case LOAD_BOOKS_DESCRIPTION_AUTHOR:
    return { ...state, booksDescriptionAuthor: [...state.books, ...action.books] };

      case LOAD_BOOKS_DESCRIPTION_SUBJECT:
    return { ...state, booksDescriptionSubject: [...state.books, ...action.books] };

    case CLEAR_BOOKS_DESCRIPTION_AUTHOR:
      return { ...state, booksDescriptionAuthor: [] };

    case CLEAR_BOOKS_DESCRIPTION_SUBJECT:
      return { ...state, booksDescriptionSubject: [] };

    default:
      return state;
  }
}
