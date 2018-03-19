import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookItem from './BookItem';
import { List, Map, fromJS } from 'immutable';
import * as selectors from '../selectors/bookCard';


class BooksList extends React.PureComponent {
  render() {
    const { books } = this.props;
    if (!books) {
      return <div>not loaded</div>;
    }
    return (
      <div className="book-list-wrapper">
        {books.map((book, index) => {
          return <BookItem key={`${book.get('id')}${index}`} book={book} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ books }) => ({ books: books.get('books') });

export default connect(mapStateToProps)(BooksList);

