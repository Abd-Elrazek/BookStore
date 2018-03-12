import { searchBooks } from '../utils/fetchApi';
import {
  LOAD_BOOKS,
  LOAD_BOOKS_DESCRIPTION_AUTHOR,
  LOAD_BOOKS_DESCRIPTION_SUBJECT,
  SET_QUERY,
  SET_QUERYTYPE,
  SET_STARTINDEX,
  CLEAR_BOOKS,
} from './actionTypes';

export function loadBooks(books) {
  return {
    type: LOAD_BOOKS,
    books,
  };
}

export function loadBooksDescriptionAuthor(books) {
  return {
    type: LOAD_BOOKS_DESCRIPTION_AUTHOR,
    books,
  };
}

export function loadBooksDescriptionSubject(books) {
  return {
    type: LOAD_BOOKS_DESCRIPTION_SUBJECT,
    books,
  };
}



export function booksFetch(query, queryType, startIndex) {

  return dispatch => {
    switch(queryType){

      case 'DescriptionAuthor':
        searchBooks(query, 'inauthor', 0)
          .then(response => response.json())
          .then(data => {
            const books = data.items.map(({ id, volumeInfo }) => {
              return { id, ...volumeInfo };
            });
            dispatch(loadBooksDescriptionAuthor(books));
          });
          break

      case 'DescriptionSubject':
        searchBooks(query, 'subject', 0)
          .then(response => response.json())
          .then(data => {
            const books = data.items.map(({ id, volumeInfo }) => {
              return { id, ...volumeInfo };
            });
            dispatch(loadBooksDescriptionSubject(books));
          });
          break

      default:
        searchBooks(query, queryType, startIndex)
          .then(response => response.json())
          .then(data => {
            const books = data.items.map(({ id, volumeInfo }) => {
              return { id, ...volumeInfo };
            });
            dispatch(loadBooks(books));
          });
          break
      }
    }
};

export function setQuery(query) {
  return {
    type: SET_QUERY,
    query,
  };
}

export function setQueryType(queryType) {
  return {
    type: SET_QUERYTYPE,
    queryType,
  };
}

export function setStartIndex(startIndex) {
  return {
    type: SET_STARTINDEX,
    startIndex,
  };
}

export function clearBooks(books) {
  return {
    type: CLEAR_BOOKS,
    books,
  };
}
