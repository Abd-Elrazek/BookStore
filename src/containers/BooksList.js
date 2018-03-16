import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import BookItem from './BookItem';

class BooksList extends React.PureComponent {
  render() {
    const { books } = this.props;
    return !books ? (
      <div>Not loaded</div>
    ) : (
      <div>
        {books.map((book, index) => {
          return <BookItem key={`${book.get('id')}${index}`} book={book} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ books }) => ({ books: books.get('books') });

export default connect(mapStateToProps)(BooksList);

BooksList.propTypes = {
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
