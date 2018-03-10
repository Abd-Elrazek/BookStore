const initialState = {
  books: [],
};

export default function books(state = initialState.books, action) {
  switch (action.type) {
    case 'LOAD_BOOKS':
      return action.books;
    default:
      return state;
  }
}
