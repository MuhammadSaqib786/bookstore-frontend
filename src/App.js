import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, TextField, CssBaseline, ThemeProvider, createTheme, Alert, Grid, Paper, Typography } from '@mui/material';
import BookList from './BookList';

function App() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentBookId, setCurrentBookId] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5259/api/Books');
            setBooks(response.data);
        } catch (err) {
            setError("Failed to fetch books. Please try again later.");
        }
    };

    const addOrUpdateBook = async () => {
        setError("");
        try {
            const bookData = { 
                bookName: title, 
                price: parseFloat(price),  // Convert the price string to a float
                author, 
                category 
            };
            if (editMode) {
                await axios.put(`http://localhost:5259/api/Books/${currentBookId}`, bookData);
                setEditMode(false);
                setCurrentBookId(null);
            } else {
                await axios.post('http://localhost:5259/api/Books', bookData);
            }
            setTitle('');           // Resetting the title
            setPrice('');           // Resetting the price
            setAuthor('');
            setCategory('');
            fetchBooks();
        } catch (err) {
            setError("Failed to add/update the book. Please try again.");
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:5259/api/Books/${id}`);
            fetchBooks();
        } catch (err) {
            setError("Failed to delete the book. Please try again.");
        }
    };

    const startEditBook = (book) => {
        setTitle(book.bookName);
        setPrice(book.price.toString());
        setAuthor(book.author);
        setCategory(book.category);
        setEditMode(true);
        setCurrentBookId(book.id);
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Typography variant="h4" align="center" style={{ marginTop: '20px', marginBottom: '20px' }}>Bookstore</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Grid container spacing={3}>
                    {/* Form Grid */}
                    <Grid item xs={12} md={6}>
                        <Paper style={{ padding: '20px' }}>
                            <Typography variant="h6" align="center">Add or Edit Book</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Author"
                                        value={author}
                                        onChange={e => setAuthor(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Category"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={addOrUpdateBook}
                                        fullWidth
                                    >
                                        {editMode ? 'Update Book' : 'Add Book'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    {/* Books List Grid */}
                    <Grid item xs={12} md={6}>
                        <Paper style={{ padding: '20px', height: '100%' }}>
                            <Typography variant="h6" align="center">Books List</Typography>
                            <BookList books={books} onDelete={deleteBook} onEdit={startEditBook} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
