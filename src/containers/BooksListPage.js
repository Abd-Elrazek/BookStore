import React from 'react';
import { connect } from 'react-redux';
import { booksFetch } from '../actions';
// import { List, Map, fromJS } from 'immutable';
import BookListHeader from './BookListHeader';
import BooksList from './BooksList';
import Button from '../components/Button';

class BooksListPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
    };
  }

  onSearchHandler = search => {
    this.setState({ search }, this.loadBooks);
  };

  loadBooks() {
    const { search } = this.state;
    this.props.fetchBooks(search);
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
    const { books } = this.props;
    return (
      <div>
        <BookListHeader onSearch={this.onSearchHandler} />
        <BooksList books={books} />
        <Button onClick={this.onLoadMoreHandler}>More books...</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: search => dispatch(booksFetch(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksListPage);
