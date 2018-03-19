import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadBooksSuccess, loadBookCardSuccess } from '../actions';
import * as selectors from '../selectors/bookCard';

class BookItemAuthors extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandler = () => {
    const { loadBookCardSuccess } = this.props;
    loadBookCardSuccess(this.props.book);
  };

  render() {
    const { book } = this.props;
    const imageLink = book.get('imageLinks')
      ? book.get('imageLinks').get('thumbnail')
      : '';

    return (
      <div className="booklist_item__wrapper" onClick={this.onClickHandler}>
        <img className="book-img" src={imageLink} alt={book.get('title')} />
        <div className="booklist_item__descr">
          <Link to={`/book/${book.get('id')}`} className="title-link">
            <h2>{book.get('title')}</h2>
          </Link>
          <h3 className="subtitle">{book.get('subtitle')}</h3>
          <section className="booklist_item_addition_info">
            <span>
              <strong>ID: </strong>
            </span>
            <span>{book.get('id')}</span>
            <div>
              <span>
                <strong>Authors: </strong>
              </span>
              <span>
                {(book.get('authors')
                  ? book.get('authors').toArray()
                  : []
                ).join(', ')}
              </span>
            </div>
          </section>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    booksByAuthor: selectors.getBooksByAuthor(store),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadBooksSuccess: book => dispatch(loadBooksSuccess(book)),
    loadBookCardSuccess: book => dispatch(loadBookCardSuccess(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItemAuthors);
