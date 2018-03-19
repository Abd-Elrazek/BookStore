import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const BookItem = props => {
  const { book } = props;
  const imageLink = book.get('imageLinks')
    ? book.get('imageLinks').get('thumbnail')
    : '';

  return (
    <div className="booklist_item__wrapper">
      <img className="book-img" src={imageLink} alt={book.get('title')} />
      <div className="booklist_item__descr">
        <Link to={`/book/${book.get('id')}`} className="title-link">
          <h2>{book.get('title')}</h2>
        </Link>
        <h3 className="subtitle">{book.get('subtitle')}</h3>
        <section className="booklist_item_addition_info">
          <span>
            <strong>ID: </strong>
          </span>
          <span>{book.get('id')}</span>
          <div>
            <span>
              <strong>Authors: </strong>
            </span>
            <span>
              {(book.get('authors') ? book.get('authors').toArray() : []).join(
                ', ',
              )}
            </span>

          </div>
        </section>
      </div>
      <br />
      <br />
    </div>
  );
};

export default BookItem;

BookItem.propTypes = {
  book: ImmutablePropTypes.mapContains({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: ImmutablePropTypes.listOf(PropTypes.string),
    imageLinks: ImmutablePropTypes.mapContains({
      thumbnail: PropTypes.string,
    }),
  }).isRequired,
};

