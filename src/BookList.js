

import React from 'react';
import Book from './Book';

function BookList({ books, onDelete, onEdit }) {
    return (
        <div>
            {books.map(book => <Book key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />)}
        </div>
    );
}

export default BookList;
