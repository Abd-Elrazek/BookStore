import React from 'react';
import BookItemAuthors from '../containers/BookItemAuthors';

export default function BooksByAuthor(props) {
  const books = props.booksByAuthor;
  return (
    <div className="cardPage-book-list-wrapper">
      {books.map((book, index) => {
        return <BookItemAuthors key={`${book.id}${index}`} book={book} />;
      })}
    </div>
  );
}
