import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextBox from '../components/TextBox';
import SelectBox from '../components/SelectBox';
import { booksFetch, setQuery, setQueryType, clearBooks } from '../actions';
import queryParams from '../constants/queryParams';

class BookListHeader extends React.PureComponent {
  onSubmitHandler = e => {
    e.preventDefault();
    const { query, queryType, startIndex, clearBooks, fetchBooks } = this.props;
    clearBooks();
    fetchBooks(query, queryType, startIndex);
  };

  render() {
    const { query, setQuery, queryType, setQueryType } = this.props;
    return (
      <form onSubmit={this.onSubmitHandler}>
        <TextBox value={query} onChange={query => setQuery(query)} />
        <button>Найти</button>
        <SelectBox
          value={queryType}
          onChange={queryType => setQueryType(queryType)}
          options={queryParams}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    query: state.books.query,
    queryType: state.books.queryType,
    startIndex: state.books.startIndex,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: (query, queryType, startIndex) =>
      dispatch(booksFetch(query, queryType, startIndex)),
    setQuery: query => dispatch(setQuery(query)),
    setQueryType: queryType => dispatch(setQueryType(queryType)),
    clearBooks: () => dispatch(clearBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookListHeader);

BookListHeader.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  setQueryType: PropTypes.func.isRequired,
  clearBooks: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  queryType: PropTypes.string.isRequired,
  startIndex: PropTypes.number.isRequired,
};
