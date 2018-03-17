import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from '../selectors/bookCard';
import { searchBookById } from '../utils/fetchApi';
import {
  loadBookCardSuccess,
  booksFetchAuthor,
  clearBooksAuthor,
} from '../actions';
import Popup from '../components/Popup';
import monthNames from '../constants/months';
import BooksByBox from '../components/BooksByBox';
import Button from '../components/Button';

class BookCardPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      popupBookCover: false,
      popupNoBook: false,
    };
  }
  componentDidMount() {
    const { loadBookCardSuccess, booksFetchAuthor} = this.props;
    console.log(this.props.match.params.id);
    searchBookById(this.props.match.params.id)
      .then(response => response.json())
      .then(({ id, volumeInfo }) => {
        const book = { id, ...volumeInfo };
        loadBookCardSuccess(book);

        booksFetchAuthor(book.authors);
      });
  }

  convertPublishedDate = date => {
    if (date) {
      let convertedDate = new Date(date);
      let mm = convertedDate.getMonth() + 1;
      let dd = convertedDate.getDate();
      let convertedDays = (dd > 9 ? '' : '0') + dd;
      let yy = convertedDate.getFullYear();

      return `${convertedDays} ${monthNames[mm]} ${yy}`;
    } else {
      return null;
    }
  };

  showAuthors = authors => {
    if (authors && authors.length > 0) {
      return authors.map(
        (author, index) =>
          index !== authors.length - 1 ? (
            <a href="#" key={`${index}`}>
              {author}
              <span>, </span>
            </a>
          ) : (
            <a href="#" key={`${index}`}>
              {author}
            </a>
          ),
      );
    }
  };

  showPageCount = pageCount => {
    if (pageCount) {
      return <span> - Всего страниц: {pageCount}</span>;
    }
  };

  showPublisher = publisher => {
    if (publisher) {
      return <span> {publisher}, </span>;
    }
  };
  showDescription = description => {
    if (description) {
      return description;
    } else {
      return 'Sorry. There is no description yet';
    }
  };

  togglePopup = e => {
    e.preventDefault();
    if (
      /*если клик произошел на обложке книги или на кнопке "закрыть" обложки книги */
      (e.target.classList.contains('close-btn') &&
        e.currentTarget.classList.contains('book-img-wrapper')) ||
      e.target.classList.contains('book-img')
    ) {
      this.setState({
        popupBookCover: !this.state.popupBookCover,
      });
    } else if (
      /*если клик произошел на кнопке "закрыть" всплывающего окна "Sorry. Could not embed the book" */
      e.target.classList.contains('close-btn') &&
      e.currentTarget.classList.contains('book-title-wrapper')
    ) {
      this.setState({
        popupNoBook: !this.state.popupNoBook,
      });
    }
  };

  showCoverPicture = image => {
    if (image) {
      return (
        <div>
          <a href="#" onClick={e => this.togglePopup(e)}>
            <img src={image.smallThumbnail} alt="" className="book-img" />
          </a>
        </div>
      );
    } else {
      return <div className="no-img">No image</div>;
    }
  };

  openBook = (url, readingModes) => {
    if (url) {
      if (readingModes.image === true) {
        let newUrl = url + '&printsec=frontcover#f=true';
        window.open(newUrl, 'hello', 'width=800,height=1000');
      } else {
        this.setState({
          popupNoBook: !this.state.popupNoBook,
        });
      }
    } else {
      return null;
    }
  };

  onClickBooksByAuthorHandler = () => {
    const { loadBookCardSuccess} = this.props;
    console.log(this.props.match.params.id);
    searchBookById(this.props.match.params.id)
      .then(response => response.json())
      .then(({ id, volumeInfo }) => {
        const book = { id, ...volumeInfo };
        loadBookCardSuccess(book);
      });
  };

  render() {
    /*Если пришли из поиска, при первом рендеринге берем книгу из массива state.books. */
    let book =this.props.book;
    let booksByAuthor = this.props.booksByAuthor;
    !this.props.book ? (book = this.props.bookById) : (book = this.props.book);

    if (!book || Object.keys(book).length === 0) {
      return null;
    } else {
      return (
        <div className="book-list-item-wrapper">
          <div className="book-title-wrapper" onClick={this.togglePopup}>
            <h1
              className="book-title"
              onClick={() => this.openBook(book.previewLink, book.readingModes)}
            >
              {book.title}
            </h1>
            <span className="subtitle">{book.subtitle}</span>
            {this.state.popupNoBook ? (
              <Popup hidePopup={this.togglePopup}>
                <span>Sorry. Could not embed the book</span>
              </Popup>
            ) : null}
          </div>
          <div className="book-item-content">
            <div className="book-img-wrapper" onClick={this.togglePopup}>
              {this.showCoverPicture(book.imageLinks)}

              {this.state.popupBookCover ? (
                <Popup>
                  <img src={book.imageLinks.thumbnail + '&zoom=2'} alt="" />
                </Popup>
              ) : null}
            </div>
            <div className="book-descr-wrapper">
              <div className="authors-box">
                {this.showAuthors(book.authors) || null}
              </div>
              <div className="book-info">
                {this.showPublisher(book.publisher) || null}
                <span>{this.convertPublishedDate(book.publishedDate)}</span>
                {this.showPageCount(book.pageCount) || null}
              </div>
              <div className="book-description">
                {this.showDescription(book.description)}
              </div>
            </div>
          </div>
          <div className="other-books-wrapper">
            <h2 className="other-books-title">Другие книги автора</h2>
            <BooksByBox booksByAuthor={booksByAuthor} />
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (store, props) => {
  console.log('State to props');
  return {
    book: selectors.getBook(store),
    bookById: selectors.getBookById(store, props.match.params.id),
    booksByAuthor: selectors.getBooksByAuthor(store),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBookCardSuccess: book => dispatch(loadBookCardSuccess(book)),
    booksFetchAuthor: (query, queryType, startIndex = 0) =>
      dispatch(booksFetchAuthor(query, queryType, startIndex)),
    clearBooksAuthor: () => dispatch(clearBooksAuthor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCardPage);

BookCardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      books: PropTypes.object,
    }),
  }).isRequired,
  booksFetchAuthor: PropTypes.func.isRequired,
  clearBooksAuthor: PropTypes.func.isRequired,
  loadBookCardSuccess: PropTypes.func.isRequired,
};
