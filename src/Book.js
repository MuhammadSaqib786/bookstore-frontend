import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function Book({ book, onDelete }) {
    return (
        <Card style={{ margin: '20px' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>{book.bookName}</Typography>
                <Typography variant="body2" color="textSecondary">Author: {book.author}</Typography>
                <Typography variant="body2" color="textSecondary">Category: {book.category}</Typography>
                <Typography variant="body2" gutterBottom>Price: ${book.price}</Typography>
                <Button color="secondary" onClick={() => onDelete(book.id)}>Delete</Button>
            </CardContent>
        </Card>
    );
}

export default Book;
