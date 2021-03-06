import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextBox from '../components/TextBox';
import SelectBox from '../components/SelectBox';
import { booksFetch, setQuery, setQueryType, clearBooks } from '../actions';
import queryParams from '../constants/queryParams';

class BookListHeader extends React.PureComponent {
  render() {
    const {
      query,
      setQuery,
      booksFetch,
      clearBooks,
      queryType,
      setQueryType,
    } = this.props;
    return (
      <form
        className="search-form"
        onSubmit={e => {
          e.preventDefault();
          clearBooks();
          booksFetch(query, queryType, 0);
        }}
      >
        <TextBox value={query} onChange={query => setQuery(query)} />
        <button className="search_find_btn">Найти</button>
        <SelectBox
          value={queryType}
          onChange={queryType => setQueryType(queryType)}
          options={queryParams}
        />
      </form>
    );
  }
}

const mapStateToProps = ({ books }) => ({
  query: books.get('query'),
  queryType: books.get('queryType'),
});

const mapDispatchToProps = dispatch => {
  return {
    booksFetch: (query, queryType, startIndex = 0) =>
      dispatch(booksFetch(query, queryType, startIndex)),
    setQuery: query => dispatch(setQuery(query)),
    setQueryType: queryType => dispatch(setQueryType(queryType)),
    clearBooks: () => dispatch(clearBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookListHeader);

BookListHeader.propTypes = {
  booksFetch: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  setQueryType: PropTypes.func.isRequired,
  clearBooks: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  queryType: PropTypes.string.isRequired,
};
