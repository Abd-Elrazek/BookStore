import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextBox from '../components/TextBox';
import SelectBox from '../components/SelectBox';
import Button from '../components/Button';
import {
  booksFetch,
  setQuery,
  setQueryType,
  clearBooks,
  clearStartIndex,
} from '../actions';
import queryParams from '../constants/queryParams';

class BookListHeader extends React.PureComponent {
  render() {
    const {
      query,
      setQuery,
      booksFetch,
      clearBooks,
      queryType,
      clearStartIndex,
      setQueryType,
    } = this.props;
    return (
      <div>
        <TextBox value={query} onChange={query => setQuery(query)} />
        <Button
          onClick={() => {
            clearBooks();
            clearStartIndex();
            booksFetch(query, queryType);
          }}
        >
          Найти
        </Button>
        <SelectBox
          value={queryType}
          onChange={queryType => setQueryType(queryType)}
          options={queryParams}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    query: state.books.query,
    queryType: state.books.queryType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    booksFetch: (query, queryType, startIndex = 0) =>
      dispatch(booksFetch(query, queryType, startIndex)),
    setQuery: query => dispatch(setQuery(query)),
    setQueryType: queryType => dispatch(setQueryType(queryType)),
    clearBooks: () => dispatch(clearBooks()),
    clearStartIndex: () => dispatch(clearStartIndex()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookListHeader);

BookListHeader.propTypes = {
  booksFetch: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  setQueryType: PropTypes.func.isRequired,
  clearBooks: PropTypes.func.isRequired,
  clearStartIndex: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  queryType: PropTypes.string.isRequired,
};
