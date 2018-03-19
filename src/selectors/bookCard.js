const getBookCard = state => state.books;

export const getBook = state => getBookCard(state).get('book');
export const getBookById = (state, id) =>
  getBookCard(state).get('books').filter(item => item.get('id') === id)[0];

export const getBooksByAuthor = (state) => state.books.get('booksByAuthor');
export const getIsLoading = (state) => getBookCard(state).get('isLoading');
