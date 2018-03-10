import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BooksListPage from './containers/BooksListPage';
import BookCardPage from './containers/BookCardPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/">Поиск книг</Link>
          <Route exact path="/" component={BooksListPage} />
          <Route path="/book/:id" component={BookCardPage} />
        </div>
      </BrowserRouter>
    );
  }
}

const mountNode = document.getElementById('app');

ReactDOM.render(<App />, mountNode);
