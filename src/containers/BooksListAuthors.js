import React from 'react';
import BookItemAuthors from '../containers/BookItemAuthors';


export default function BooksListAuthors(props) {
  const books = props.booksByAuthor;
  return (
    <div className="cardPage-book-list-wrapper">
      {books.map((book, index) => {
        return (
          <BookItemAuthors key={`${book.get('id')}${index}`} book={book} />
        );

      })}
    </div>
  );
}
