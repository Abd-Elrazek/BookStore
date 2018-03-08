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
            <span key={`${author}`}>{author}, </span>
          ) : (
            <span key={`${author}`}>{author}</span>
          ),
      );
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
    let authorshtml = this.showAuthors(authors);
    return (
      <div className="book-list-item-wrapper">
        <h1 className="book-title">{title}</h1>
        <div className="book-item-content">
          <img src={imageLinks.smallThumbnail} alt="" className="book-img" />
          <div className="book-descr-wrapper">
            <div className="authors-box">{authorshtml}</div>
            <div className="book-info">
              <span>{publisher}, </span>
              <span>{this.convertPublishedDate(publishedDate)} - </span>
              <span>Всего страниц: {pageCount}</span>
            </div>
            <div className="book-description">{description}</div>
          </div>
        </div>
      </div>
    );
  }
}
