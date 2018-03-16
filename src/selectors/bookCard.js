const getBookCard = state => state.books;
export const getBook = state => getBookCard(state).book;
export const getBookById = (state, id) =>
  getBookCard(state).books.filter(item => item.id === id)[0];
