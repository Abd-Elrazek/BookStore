import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  loadBooksSuccess,
  loadBookCardSuccess
} from '../actions';
import { connect } from 'react-redux';
import * as selectors from '../selectors/bookCard';

class BookItemAuthors extends React.Component{

  onClickHandler = ()=> { 
    const {loadBookCardSuccess} = this.props;
    loadBookCardSuccess(this.props.book);
  };

  render(){

    const {
      id,
      title,
      subtitle = '',
      authors = [],
      imageLinks: { thumbnail: imageLink } = '',
    } = this.props.book;

    const {book} = this.props.book;



    return (
      <div className="booklist_item__wrapper" onClick = {this.onClickHandler}>
        <img className="book-img" src={imageLink} alt={title} />
        <div className="booklist_item__descr">
          <Link to={`/book/${id}`} className="title-link" >
            <h2>{title}</h2>
          </Link>
          <h3 className="subtitle">{subtitle}</h3>
          <section className="booklist_item_addition_info">
            <span>
              <strong>ID: </strong>
            </span>
            <span>{id}</span>
            <div>
              <span>
                <strong>Authors: </strong>
              </span>
              <span>{authors.join(', ')}</span>
            </div>
          </section>
        </div>
        <br />
        <br />
      </div>
    );
  }
};


const mapStateToProps = (store, props) => {
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

export default connect(mapStateToProps,mapDispatchToProps)(BookItemAuthors);

BookItemAuthors.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }),
};
