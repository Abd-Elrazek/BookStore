import React from 'react';
import PropTypes from 'prop-types';
import { searchBookById } from '../utils/fetchApi';
import { connect } from 'react-redux';
import { booksFetch, setQuery, setQueryType, clearBooks } from '../actions';
import queryParams from '../constants/queryParams';


class BookCardPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      book: undefined,
    };

    searchBookById(props.match.params.id)
      .then(response => response.json())
      .then(({ id, volumeInfo }) => {
        this.setState({ book: { id, ...volumeInfo } });
      });
  }

  render() {
    const { book } = this.state;
    const {
      query,
      setQuery,
      fetchBooks,
      clearBooks,
      queryType,
      startIndex,
      setQueryType,
    } = this.props;

    if (!book) {
      return null;
    }
    return (
      <div>
        <img src={book.imageLinks.small} alt={book.title} />
        <div>
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
        </div>
        <div>
          <strong>ID: </strong>
          {book.id}
        </div>
        <div>
          <strong>Authors: </strong>
          {(book.authors || []).join(', ')}
        </div>
        <div>
          <strong>Publisher: </strong>
          {book.publisher}
        </div>
        <div>
          <strong>Published date: </strong>
          {book.publishedDate}
        </div>
        <div>
          <strong>Pages: </strong>
          {book.pageCount}
        </div>
        <div>
          <strong>Description: </strong>
          {book.description}
        </div>
        <div>
          <strong>Categories: </strong>
          {(book.categories || []).join(', ')}
        </div>
        <div>
          <strong>Average Rating: </strong>
          {book.averageRating}
        </div>
        <div>
          <h2 onClick={() => {
            clearBooks();
            fetchBooks('гоголь', 'DescriptionAuthor', '0');

          }}>ViktorAuthorBookList</h2>
          <h2>ViktorThemeBookList</h2>
        </div>
      </div>
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
    // setQuery: query => dispatch(setQuery(query)),
    // setQueryType: queryType => dispatch(setQueryType(queryType)),
    clearBooks: () => dispatch(clearBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCardPage);


BookCardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
