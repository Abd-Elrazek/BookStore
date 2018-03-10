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
    <div>
      <img src={imageLink} alt={title} />
      <div>
        <Link to={`/book/${id}`}>
          <h2>{title}</h2>
        </Link>
        <h3>{subtitle}</h3>
        <div>
          <span>
            <strong>ID: </strong>
          </span>
          <span>{id}</span>
        </div>
        <section>
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

export default BookItem;
