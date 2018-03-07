import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Booklist extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div className="book-list-item-wrapper">
        <h1>{title}</h1>
      </div>
    );
  }
}
