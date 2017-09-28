import React from 'react'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        this.fetchMyBooks()
    }

    fetchMyBooks = () => {
        BooksAPI.getAll().then((books) => this.setState({books}))
    }

    changeShelf = (shelf, book) => {
        BooksAPI.update(book, shelf)
        this.fetchMyBooks()
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <BookShelf changeShelf={this.changeShelf} books={this.state.books.filter((book) =>
                                    book.shelf === 'currentlyReading')}/>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <BookShelf changeShelf={this.changeShelf} books={this.state.books.filter((book) =>
                                    book.shelf === 'wantToRead')}/>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <BookShelf changeShelf={this.changeShelf} books={this.state.books.filter((book) =>
                                    book.shelf === 'read')}/>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route exact path="/search" render={() => (
                    <SearchBooks fetchBooks={this.fetchMyBooks}/>
                )}/>
            </div>
        );
    }
}

export default BooksApp
