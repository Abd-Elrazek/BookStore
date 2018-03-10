import React from 'react';
// import { List, Map, fromJS } from 'immutable';
import BookListHeader from './BookListHeader';
import BooksList from './BooksList';
import Button from '../components/Button';
import { searchBooks } from '../utils/fetchApi';

export default class BookListPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: {},
    };
  }

  onSearchHandler = search => {
    this.setState({ search }, this.loadBooks);
  };

  loadBooks() {
    const { search } = this.state;

    searchBooks(search)
      .then(response => response.json())
      .then(data => {
        const books = data.items.map(({ id, volumeInfo }) => {
          return {
            id,
            ...volumeInfo,
          };
        });
        this.setState({ books: [...this.state.books, ...books] });
      })
      .catch(error => console.log(error));
  }

  onLoadMoreHandler = () => {
    const newStartIndex = this.state.search.startIndex + 10;
    this.setState(
      {
        search: {
          ...this.state.search,
          startIndex: newStartIndex,
        },
      },
      this.loadBooks,
    );
  };

  render() {
    const { books } = this.state;
    return (
      <div>
        <BookListHeader onSearch={this.onSearchHandler} />
        <BooksList books={books} />
        <Button onClick={this.onLoadMoreHandler}>More books...</Button>
      </div>
    );
  }
}
