import React from 'react';
import Popup from '../components/Popup';
import monthNames from '../constants/months';

export default class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      popupNoBook: false,
    };
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
        popup: !this.state.popup,
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
        let newUrl = url + '#f=true';
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

  render() {
    console.log(this.props.book);
    const {
      readingModes,
      previewLink,
      title,
      subtitle,
      imageLinks,
      description,
      authors,
      publisher,
      publishedDate,
      pageCount,
    } = this.props.book;

    return (
      <div className="book-list-item-wrapper">
        <div className="book-title-wrapper" onClick={this.togglePopup}>
          <h1
            className="book-title"
            onClick={() => this.openBook(previewLink, readingModes)}
          >
            {title}
          </h1>
          <span className='subtitle'>{subtitle}</span>
          {this.state.popupNoBook ? (
            <Popup hidePopup={this.togglePopup}>
              <span>Sorry. Could not embed the book</span>
            </Popup>
          ) : null}
        </div>
        <div className="book-item-content">
          <div className="book-img-wrapper" onClick={this.togglePopup}>
            {this.showCoverPicture(imageLinks)}
            {this.state.popup ? (
              <Popup>
                <img src={imageLinks.thumbnail} alt="" />
              </Popup>
            ) : null}
          </div>
          <div className="book-descr-wrapper">
            <div className="authors-box">
              {this.showAuthors(authors) || null}
            </div>
            <div className="book-info">
              {this.showPublisher(publisher) || null}
              <span>{this.convertPublishedDate(publishedDate)}</span>
              {this.showPageCount(pageCount) || null}
            </div>
            <div className="book-description">
              {this.showDescription(description)}
            </div>
          </div>
        </div>
        <div className="same-books">

        </div>
      </div>
    );
  }
}
