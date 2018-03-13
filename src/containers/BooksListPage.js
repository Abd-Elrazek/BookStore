import React from 'react';
// import { List, Map, fromJS } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookListHeader from './BookListHeader';
import BooksList from './BooksList';
import Button from '../components/Button';
import { booksFetch, setStartIndex } from '../actions';

class BooksListPage extends React.PureComponent {
  render() {
    const {
      setStartIndex,
      startIndex,
      query,
      queryType,
      fetchBooks,
    } = this.props;
    return (
      <div>
        <BookListHeader />
        <BooksList />
        <Button
          onClick={() => {
            setStartIndex(startIndex);
            fetchBooks(query, queryType, startIndex);
          }}
        >
          More books...
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: (query, queryType, startIndex) =>
      dispatch(booksFetch(query, queryType, startIndex)),
    setStartIndex: index => dispatch(setStartIndex(index)),
  };
};

const mapStateToProps = state => {
  return {
    startIndex: state.books.startIndex,
    query: state.books.query,
    queryType: state.books.queryType,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksListPage);

BooksListPage.propTypes = {
  setStartIndex: PropTypes.func.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  queryType: PropTypes.string.isRequired,
  startIndex: PropTypes.number.isRequired,
};
