import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
        {error || <BooksList />}
        {isMoreBooksAvailable && (
          <Button onClick={() => booksFetch(query, queryType, books.size + 10)}>
            More books...
          </Button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  booksFetch: (query, queryType, startIndex) =>
    dispatch(booksFetch(query, queryType, startIndex)),
});

const mapStateToProps = ({ books }) => ({
  books: books.get('books'),
  query: books.get('query'),
  queryType: books.get('queryType'),
  error: books.get('error'),
  isMoreBooksAvailable: books.get('isMoreBooksAvailable'),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksListPage);

BooksListPage.propTypes = {
  booksFetch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  queryType: PropTypes.string.isRequired,
  isMoreBooksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  books: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      authors: ImmutablePropTypes.listOf(PropTypes.string),
      imageLinks: ImmutablePropTypes.mapContains({
        thumbnail: PropTypes.string,
      }),
    }),
  ),
};
