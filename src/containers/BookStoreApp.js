import React from 'react';
import searchBooks from '../utils/fetchApi';
//import BooksList from '../components/BooksList';
import BookItem from '../components/BookItem';
//import queryParams from '../constants/queryParams';

export default class BookStoreApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    searchBooks('tolkien', 'inauthor')
      .then(response => response.json())
      .then(data => this.storeBooks(data))
      .catch(error => console.log(error));
  }
  storeBooks = data => {
    const books = data.items.map(({ id, volumeInfo }) => {
      return {
        id,
        ...volumeInfo,
      };
    });
    console.log(books);
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
// в state попадает массив объектов co следующими свойствами:

//  {
//allowAnonLogging:false
// authors:
// Array[2]
// 0:
// "Douglas Brode"
// 1:
// "Leah Deyneka"
// canonicalVolumeLink:
// "https://books.google.com/books/about/Myth_Media_and_Culture_in_Star_Wars.html?hl=&id=7ioHoYkPrD0C"
// categories:
// Array[1]
// 0:
// "Performing Arts"
// contentVersion:
// "preview-1.0.0"
// description:
// "Collects essays examining the influence of the science fiction films on such popular culture themes as fairy tales and comics."
// id:
// "7ioHoYkPrD0C"
// imageLinks:
// {…}
// smallThumbnail:
// "http://books.google.com/books/content?id=7ioHoYkPrD0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
// thumbnail:
// "http://books.google.com/books/content?id=7ioHoYkPrD0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
// industryIdentifiers:
// Array[2]
// 0:
// {…}
// identifier:
// "9780810885127"
// type:
// "ISBN_13"
// 1:
// {…}
// identifier:
// "0810885123"
// type:
// "ISBN_10"
// infoLink:
// "http://books.google.ru/books?id=7ioHoYkPrD0C&dq=intitle:star+wars&hl=&source=gbs_api"
// language:
// "en"
// maturityRating:
// "NOT_MATURE"
// pageCount:
// 192
// previewLink:
// "http://books.google.ru/books?id=7ioHoYkPrD0C&pg=PA46&dq=intitle:star+wars&hl=&cd=28&source=gbs_api"
// printType:
// "BOOK"
// publishedDate:
// "2012-06-14"
// publisher:
// "Scarecrow Press"
// readingModes:
// {…}
// image:
// true
// text:
// false
// subtitle:
// "An Anthology"
// title:
// "Myth, Media, and Culture in Star Wars"
//}
