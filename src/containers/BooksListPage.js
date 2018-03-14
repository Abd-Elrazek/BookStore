import React from 'react';
// import { List, Map, fromJS } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookListHeader from './BookListHeader';
import BooksList from './BooksList';
import Button from '../components/Button';
import { booksFetch } from '../actions';

class BooksListPage extends React.PureComponent {
  render() {
    const {
      query,
      queryType,
      booksFetch,
      isMoreBooksAvailable,
      error,
      books,
    } = this.props;
    return (
      <div>
        <BookListHeader />
        {error ? error : <BooksList />}
        {isMoreBooksAvailable && (
          <Button
            onClick={() => {
              booksFetch(query, queryType, books.length + 10);
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
    books: state.books.books,
    query: state.books.query,
    queryType: state.books.queryType,
    error: state.books.error,
    isMoreBooksAvailable: state.books.isMoreBooksAvailable,
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
