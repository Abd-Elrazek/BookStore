import React from 'react';
import BookItem from './BookItem';

export default class Booklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=x%20men&key=AIzaSyBhs1kVzhyMgedcziSyiezhhhE8Xp5FTQ8&filter=partial&maxResults=40&projection=lite`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => this.storeBooks(data))
      .catch(error => console.log(error));
  }

  storeBooks = data => {
    const books = data.items.map(
      ({
        id,
        volumeInfo: { title },
        volumeInfo: { subtitle },
        volumeInfo: { authors },
        volumeInfo: { publisher },
        volumeInfo: { publishedDate },
        volumeInfo: { description },
        volumeInfo: { pageCount },
        volumeInfo: { imageLinks: { thumbnail: imageLink } },
      }) => {
        return {
          id,
          title,
          subtitle,
          authors,
          publisher,
          publishedDate,
          description,
          pageCount,
          imageLink,
        };
      },
    );
    this.setState({ books });
  };

  render() {
    return (
      <ul>
        {this.state.books.map(book => (
          <li key={`${book.id}`}>
            <BookItem {...book} />
          </li>
        ))}
      </ul>
    );
  }
}
