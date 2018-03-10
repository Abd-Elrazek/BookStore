import { searchBooks } from '../utils/fetchApi';

export function loadBooks(books) {
  return {
    type: 'LOAD_BOOKS',
    books,
  };
}

export function booksFetch(search) {
  return dispatch => {
    searchBooks(search)
      .then(response => response.json())
      .then(data => {
        const books = data.items.map(({ id, volumeInfo }) => {
          return { id, ...volumeInfo };
        });
        dispatch(loadBooks(books));
      });
  };
}
