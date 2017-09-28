import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends React.Component {

    static propTypes = {
        fetchBooks: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    findBooks(query) {
        this.setState({query});
        BooksAPI.search(query).then((books) => this.setState({books}))
    }

    changeShelf = (shelf, book) => {
        BooksAPI.update(book, shelf)
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" onClick={this.props.fetchBooks()}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               value={this.state.query}
                               onChange={(event) => this.findBooks(event.target.value)}
                               placeholder="Search by title or author"/>
                    </div>
                </div>

                {this.state.books && this.state.books.error && this.state.books.error === 'empty query' ?
                    <div className="msg-books">Books not found</div> : ''}

                <BookShelf books={this.state.books} changeShelf={this.changeShelf}/>
            </div>
        )
    }
}

export default SearchBooks