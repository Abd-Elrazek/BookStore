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
      authorsObj: {},
    };
  }

  onSearchHandler = search => {
    this.setState({ search }, this.loadBooks);
  };

  loadBooks() {
    let authorsObj = { ...this.state.authorsObj };
    const { search } = this.state;

    searchBooks(search)
      .then(response => response.json())
      .then(data => {
        /*Собираю в авторов их книги */
        for (let i = 0; i < data.items.length; i++) {
          let authorsArr = data.items[i].volumeInfo.authors;
          if (authorsArr) {
            for (let k = 0; k < authorsArr.length; k++) {
              if (!authorsObj[authorsArr[k]]) {
                authorsObj[authorsArr[k]] = [];
              }
              authorsObj[authorsArr[k]].push(data.items[i].volumeInfo.title);
            }
          }
        }

        const books = data.items.map(({ id, volumeInfo }) => {
          return {
            id,
            ...volumeInfo,
          };
        });
        this.setState({ books: [...this.state.books, ...books],authorsObj:authorsObj });
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
        <BooksList books={books} authorsObj={this.state.authorsObj}/>
        <Button onClick={this.onLoadMoreHandler}>More books...</Button>
      </div>
    );
  }
}
