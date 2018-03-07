// import React from 'react';
//
// export default class BookStoreApp extends React.Component {
//   render() {
//     return <div>BookStoreApp</div>;
//   }
// }

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Booklist from '../components/BooksList';
import Home from '../components/Home';

const BookStoreApp = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/books" component={Booklist} />
    </div>
  </Router>
);

export default BookStoreApp;
