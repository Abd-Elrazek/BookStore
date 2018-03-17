import React from 'react';
import BookItem_mini from '../containers/BookItem_mini';


export default function BooksByBox(props){
	const books = props.booksByAuthor;
	const onClickItemHandler = props.onClickHandler;
	return (
      <div className="CardPage-book-list-wrapper">
        {books.map((book, index) => {
          return <BookItem_mini key={`${book.id}${index}`} book={book} onClickHandler = {onClickItemHandler}/>;
        })}
      </div>);}