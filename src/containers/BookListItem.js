import React from 'react';

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
