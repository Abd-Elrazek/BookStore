import React from 'react';

export default class BookItem extends React.Component {
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
      return authors.map(
        (author, index) =>
          index !== authors.length - 1 ? (
            <a href="#" key={`${author}${index}`}>
              {author},{' '}
            </a>
          ) : (
            <a href="#" key={`${author}${index}`}>
              {author}
            </a>
          ),
      );
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

  render() {
    const {
      id,
      title,
      imageLinks,
      description,
      authors,
      publisher,
      publishedDate,
      pageCount,
    } = this.props;

    return (
      <div className="book-list-item-wrapper">
        <h1 className="book-title">{title}</h1>
        <div className="book-item-content">
          <img src={imageLinks.smallThumbnail} alt="" className="book-img" />
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
