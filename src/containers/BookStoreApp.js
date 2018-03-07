import React from 'react';
import searchBooks from '../utils/fetchApi';

export default class Booklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    searchBooks(query, queryParams)
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
            <BooksList {...book} />
          
}
};
