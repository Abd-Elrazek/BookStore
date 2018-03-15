import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookListHeader from './BookListHeader';
import BooksList from './BooksList';
import Button from '../components/Button';
import { booksFetch } from '../actions';

class BooksListPage extends React.PureComponent {
  render() {
    const query = this.props.query;
    const queryType = this.props.queryType;
    const booksFetch = this.props.booksFetch;
    const isMoreBooksAvailable = this.props.isMoreBooksAvailable;
    const error = this.props.error;
    const books = this.props.books;

    return (
      <div>
        <BookListHeader />
        {error ? error : <BooksList />}
        {isMoreBooksAvailable && (
          <Button
            onClick={() => {
              booksFetch(query, queryType, books.size + 10);
            }}
          >
            More books...
          </Button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    booksFetch: (query, queryType, startIndex) =>
      dispatch(booksFetch(query, queryType, startIndex)),
  };
};

const mapStateToProps = state => {
  return {
    books: state.books.get('books'),
    query: state.books.get('query'),
    queryType: state.books.get('queryType'),
    error: state.books.get('error'),
    isMoreBooksAvailable: state.books.get('isMoreBooksAvailable'),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksListPage);

BooksListPage.propTypes = {
  booksFetch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  queryType: PropTypes.string.isRequired,
  isMoreBooksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object),
};
