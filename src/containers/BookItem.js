import React from 'react';
import Popup from '../components/Popup';


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
      let monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];
      let dd = convertedDate.getDate();

      return [
        (dd > 9 ? '' : '0') + dd + ' ',
        monthNames[mm] + ' ',
        convertedDate.getFullYear(),
      ].join('');
    } else {
      return null;
    }
  };

  showAuthors = authors => {
    if (authors === undefined) {
      return null;
    } else {
      return authors.join(', ');
    }
  };

  showPageCount = pageCount => {
    if (pageCount !== undefined) {
      return <span> - Всего страниц: {pageCount}</span>;
    } else {
      return null;
    }
  };

  showPublisher = publisher => {
    if (publisher !== undefined) {
      return <span> {publisher}, </span>;
    } else {
      return null;
    }
  };
  showDescription = description => {
    if (description !== undefined) {
      return description;
    } else {
      return 'Sorry. There is no description yet';
    }
  };

  togglePopup = e => {
    e.preventDefault();
    let targetWrapper = e.target.parentNode.parentNode;
    if (
      e.target.tagName === 'IMG' ||
      targetWrapper.classList.contains('book-img-wrapper')
    ) {
      this.setState({
        popup: !this.state.popup,
      });
    } else if (
      e.target.tagName === 'H1' ||
      targetWrapper.classList.contains('book-title-wrapper')
    ) {
      this.setState({
        popupNoBook: !this.state.popupNoBook,
      });
    }
  };

  showCoverPicture = image => {
    if (image !== undefined) {
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
    if (url !== undefined) {
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
    const {
      readingModes,
      previewLink,
      title,
      imageLinks,
      description,
      authors,
      publisher,
      publishedDate,
      pageCount,
    } = this.props.book;

    return (
      <div className="book-list-item-wrapper">
        <div className="book-title-wrapper">
          <h1
            className="book-title"
            onClick={() => this.openBook(previewLink, readingModes)}
          >
            {title}
          </h1>
          {this.state.popupNoBook ? (
            <Popup hidePopup={this.togglePopup}>
              <span>Sorry. Could not embed the book</span>
            </Popup>
          ) : null}
        </div>
        <div className="book-item-content">
          <div className="book-img-wrapper">
            {this.showCoverPicture(imageLinks)}
            {this.state.popup ? (
              <Popup hidePopup={this.togglePopup}>
                <img src={imageLinks.thumbnail} alt="" />
              </Popup>
            ) : null}
          </div>
          <div className="book-descr-wrapper">
            <div className="authors-box">{this.showAuthors(authors)}</div>
            <div className="book-info">
              {this.showPublisher(publisher)}
              <span>{this.convertPublishedDate(publishedDate)}</span>
              {this.showPageCount(pageCount)}
            </div>
            <div className="book-description">
              {this.showDescription(description)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
