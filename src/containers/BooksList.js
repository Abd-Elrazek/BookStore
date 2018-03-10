import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';

export default class Bookslist extends React.PureComponent {
  render() {
    const { books } = this.props;
    return (
      <div>
        {books.map(book => {
          return <BookItem key={`${book.id}`} book={book} />;
        })}
      </div>
    );
  }
}

Bookslist.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};
