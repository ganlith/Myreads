import React from "react";
import { Link } from "react-router-dom";
import ListBookFront from "./ListBookFront";
import * as BooksAPI from "../services/BooksAPI";
import "../styles/App.css";

class ListBooks extends React.Component {

  state = {};

  handleChangeShelf = (bookId, e) => {
    let whatbook = this.props.booksOnShelf;
    const book = whatbook.filter(b => b.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: whatbook
      });
    });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Favority Books</h1>
        </div>
        <div className="list-books-content">

          <ListBookFront
            key="currentlyReading"
            books={this.props.booksOnShelf.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Currently Reading"
          />
          
          <ListBookFront
            key="wantToRead"
            books={this.props.booksOnShelf.filter(book => book.shelf === "wantToRead")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Want to Read"
          />

          <ListBookFront
            key="read"
            books={this.props.booksOnShelf.filter(book => book.shelf === "read")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add more Book</Link>
        </div>
      </div>
    );
  }
}
export default ListBooks;