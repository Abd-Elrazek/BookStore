import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookItem from './BookItem';

class BooksList extends React.PureComponent {
  render() {
    console.log(this.props);
    const { books } = this.props;
    if (!books) {
      return <div>not loaded</div>;
    }
    return (
      <div>
        {books.map(book => {
          return <BookItem key={`${book.id}`} book={book} />;
        })}
      </div>
    );
  }
}

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => {
  return {
    books: state.books.books,
  };
};

export default connect(mapStateToProps)(BooksList);
