import { List, Map, fromJS } from 'immutable';

import { searchBooks } from '../utils/fetchApi';
import {
  LOAD_BOOKS_SUCCESS,
  GET_BOOK_CARD_REQUEST,
  LOAD_BOOK_CARD_SUCCESS,
  LOAD_BOOKS_SUCCESS_AUTHOR,
  LOAD_BOOKS_FAIL,
  IS_MOREBOOKS_AVAILABLE,
  SET_QUERY,
  SET_QUERYTYPE,
  CLEAR_BOOKS,
  CLEAR_BOOKS_AUTHOR,
} from './actionTypes';

export function loadBooksSuccess(books) {
  return {
    type: LOAD_BOOKS_SUCCESS,
    books,
  };
}

export const getBookCardRequest = () => {
  return {
    type: GET_BOOK_CARD_REQUEST,
  };
};

export const loadBookCardSuccess = book => {
  return {
    type: LOAD_BOOK_CARD_SUCCESS,
    book,
  };
};

export function loadBooksSuccessAuthor(booksByAuthor) {
  return {
    type: LOAD_BOOKS_SUCCESS_AUTHOR,
    booksByAuthor,
  };
}

export function loadBooksFail(errorMessage) {
  return {
    type: LOAD_BOOKS_FAIL,
    error: errorMessage,
  };
}

export function isMoreBooksAvailable(bool) {
  return {
    type: IS_MOREBOOKS_AVAILABLE,
    payload: bool,
  };
}

export function booksFetch(query, queryType, startIndex) {
  return dispatch => {
    searchBooks(query[0], queryType, startIndex)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Downloading error...Try again');
      })
      .then(data => {
        if (!data.items) {
          dispatch(isMoreBooksAvailable(false));
        } else {
          const books = data.items.map(({ id, volumeInfo }) => ({
            id,
            ...volumeInfo,
          }));
          dispatch(isMoreBooksAvailable(true));
          dispatch(loadBooksSuccess(books, startIndex + books.length));
        }
      })
      .catch(error => dispatch(loadBooksFail(error.message)));
  };
}

export function booksFetchAuthor(query, queryType = 'inauthor', startIndex = '0') {
  return dispatch => {
    searchBooks(query, queryType, startIndex)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Downloading error...Try again');
      })
      .then(data => {
        const booksByAuthor = data.items.map(({ id, volumeInfo }) => ({
          id,
          ...volumeInfo,
        }));
        dispatch(
          loadBooksSuccessAuthor(
            booksByAuthor
          ),
        );
      })
      .catch(error => dispatch(loadBooksFail(error.message)));
  };
}

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

export function clearBooks(books) {
  return {
    type: CLEAR_BOOKS,
    books,
  };
}

export function clearBooksAuthor(booksByAuthor) {
  return {
    type: CLEAR_BOOKS_AUTHOR,
    booksByAuthor,
  };
}
