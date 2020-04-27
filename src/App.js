import React from "react";
import { Route } from "react-router-dom";

import "./styles/App.css";

import SearchBook from "./pages/SearchBook";
import ListBookFilter from "./pages/ListBookFilter";
import * as BooksAPI from "./services/BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  handleChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getBooksOnShelf();
    });
  };

  getBooksOnShelf() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListBookFilter booksOnShelf={this.state.books} />} />
        <Route path="/search" render={() => <SearchBook onChangeShelf={this.handleChangeShelf} booksOnShelf={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;