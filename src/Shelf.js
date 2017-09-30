import React from 'react';

const Shelf = function (props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            {props.children}
        </div>
    )
}

export default Shelf