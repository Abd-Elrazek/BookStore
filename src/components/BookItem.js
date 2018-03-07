import React from 'react';

export default class BookItem extends React.Component {
  convertPublishedDate = date => {
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
  };

  render() {
    const {
      id,
      title,
      imageLink,
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
          <img src={imageLink} alt="" className="book-img" />
          <div className="book-descr-wrapper">
            <div className="authors-box">
              {authors.map(
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
              )}
            </div>
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
