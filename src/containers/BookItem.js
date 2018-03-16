import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookItem = props => {
  const {
    id,
    title,
    subtitle = '',
    authors = [],
    imageLinks: { thumbnail: imageLink } = '',
  } = props.book;
  return (
    <div className="booklist_item__wrapper">
      <img className="book-img" src={imageLink} alt={title} />
      <div className="booklist_item__descr">
        <Link to={`/book/${id}`} className="title-link">
          <h2>{title}</h2>
        </Link>
        <h3 className="subtitle">{subtitle}</h3>
        <section className="booklist_item_addition_info">
          <span>
            <strong>ID: </strong>
          </span>
          <span>{id}</span>
          <div>
            <span>
              <strong>Authors: </strong>
            </span>
            <span>{authors.join(', ')}</span>
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
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }),
};
