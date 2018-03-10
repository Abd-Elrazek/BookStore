import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';


export default class Bookslist extends React.PureComponent {
  render() {
    const { books } = this.props;
    return (
      <div>
        {books.map(book => {
          return <BookItem key={`${book.id}`} book={book} />;
        })}
      </div>
    );
  }
}

Bookslist.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};
import BookItem from './BookItem';
import searchBooks from '../utils/fetchApi';

export default class Booklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    searchBooks('marvel', 'intitle')
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
