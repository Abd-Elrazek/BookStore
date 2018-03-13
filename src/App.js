import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BooksListPage from './containers/BooksListPage';
import BookCardPage from './containers/BookCardPage';
import configureStore from './store/configureStore';

const store = configureStore();

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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode,
);
