import React from 'react';
import BookItemAuthors from '../containers/BookItemAuthors';
import { List, Map, fromJS } from 'immutable';


export default function BooksListAuthors(props) {
  const books = props.booksByAuthor;
  return (
    <div className="cardPage-book-list-wrapper">
      {books.map((book, index) => {
        return <BookItemAuthors key={`${book.get('id')}${book.get('index')}`} book={book} />;
      })}
    </div>
  );
}
