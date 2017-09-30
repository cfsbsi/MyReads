import React from 'react'
import BookShelf from './BookShelf'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        this.fetchMyBooks()
    }

    fetchMyBooks = () => {
        BooksAPI.getAll().then((books) => this.setState({books}))
    }

    changeShelf = (shelf, book) => {
        BooksAPI.update(book, shelf).then(() => {
            this.setState(this.state.books.map(bookState => {
                if (bookState.id === book.id) {
                    bookState.shelf = shelf
                }
                return bookState
            }))
        })
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
                                <Shelf title="Currently Reading">
                                    <BookShelf changeShelf={this.changeShelf}
                                               books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}/>
                                </Shelf>
                                <Shelf title="Want to Read">
                                    <BookShelf changeShelf={this.changeShelf}
                                               books={this.state.books.filter((book) => book.shelf === 'wantToRead')}/>
                                </Shelf>
                                <Shelf title="Read">
                                    <BookShelf changeShelf={this.changeShelf}
                                               books={this.state.books.filter((book) => book.shelf === 'read')}/>
                                </Shelf>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route exact path="/search" render={() => (
                    <SearchBooks classifiedBooks={this.state.books} fetchBooks={this.fetchMyBooks}/>
                )}/>
            </div>
        );
    }
}

export default BooksApp
