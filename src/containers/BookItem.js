import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookItem = props => {
  const { book } = props;
  const imageLink = book.get('imageLinks')
    ? book.get('imageLinks').get('thumbnail')
    : '';

  return (
    <div>
      <img src={imageLink} alt={book.get('title')} />
      <div>
        <Link to={`/book/${book.get('id')}`}>
          <h2>{book.get('title')}</h2>
        </Link>
        <h3>{book.get('subtitle')}</h3>
        <div>
          <span>
            <strong>ID: </strong>
          </span>
          <span>{book.get('id')}</span>
        </div>
        <section>
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

// BookItem.propTypes = {
//   book: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     subtitle: PropTypes.string,
//     authors: PropTypes.arrayOf(PropTypes.string),
//     imageLinks: PropTypes.shape({
//       thumbnail: PropTypes.string,
//     }),
//   }),
// };
