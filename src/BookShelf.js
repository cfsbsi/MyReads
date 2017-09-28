import React from 'react'

const BookShelf = function (props) {

    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books && props.books.length > 0 && props.books.map((book, index) => (
                    <li key={index}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf || 'none'}
                                            onChange={(event) => props.changeShelf(event.target.value, book)}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading
                                        </option>
                                        <option value="wantToRead">Want to Read
                                        </option>
                                        <option value="read">Read
                                        </option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors && book.authors.map((author, index) => (
                                <div key={index} className="book-authors">{author}</div>
                            ))}
                        </div>
                    </li>)
                )}
            </ol>
        </div>
    )
}

export default BookShelf