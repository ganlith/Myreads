import React from "react";
import { Link } from "react-router-dom";
import Rx from "rxjs/Rx";

import * as BooksAPI from "../services/BooksAPI";
import "../styles/App.css";

class SearchBook extends React.Component {
  state = {
    query: "",
    books: []
  };

  searchInput;

  constructor() {
    super();
    this.searchInput = new Rx.Subject();
    this.searchInput.debounceTime(100).subscribe(param => {
      this.fireSearchBook(param);
    });
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    });
    if (query) {
      this.searchInput.next(query);
    } else {
      this.setState({
        books: []
      });
    }
  };

  updateBooks(books) {
    const validBooks = books.map(book => {
      book.shelf = "none";
      this.props.booksOnShelf.forEach(bookOnShelf => {
        if (book.id === bookOnShelf.id) {
          book.shelf = bookOnShelf.shelf;
        }
      });
      return book;
    });
    this.setState({
      books: validBooks
    });
  }

  fireSearchBook(query) {
    BooksAPI.search(query, 20).then(
      response => {
        if (response.error) {
          this.setState({
            books: []
          });
        } else {
          this.updateBooks(response);
        }
      },
      error => {
        console.log("something strange ocurred. Call 911");
      }
    );
  }

  updateBookOnSearch(book, shelf) {
    let temp = this.state.books;
    const bookToUpdate = temp.filter(t => t.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: temp
    });
    this.props.onChangeShelf(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={event => this.updateQuery(event.target.value)}/>
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            
            {this.state.books.map(book =>

              <li key={book.id} className="book">

                <div className="book-top">
                  <div className="book-cover" style={{width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}/>
                  <div className="book-shelf-changer">

                    <select value={book.shelf} onChange={e => { this.updateBookOnSearch(book, e.target.value);}}>

                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>

                    </select>

                  </div>
                </div>

                <div className="book-title">
                  {book.title}
                </div>

                {book.authors &&

                <div className="book-authors">
                    {book.authors[0]}
                </div>}

              </li>
            )}

          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBook;