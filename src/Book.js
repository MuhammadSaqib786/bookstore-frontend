

import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

function Book({ book, onDelete }) {
    return (
        <Card style={{ margin: '20px' }}>
            <CardContent>
                <Typography variant="h5">{book.title}</Typography>
                <Typography variant="body2">{book.description}</Typography>
                <Button color="secondary" onClick={() => onDelete(book.id)}>Delete</Button>
            </CardContent>
        </Card>
    );
}

export default Book;
