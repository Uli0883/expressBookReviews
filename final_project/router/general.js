const express = require('express');
const router = express.Router();
const booksdb = require('./booksdb');

router.get('/', async (req, res) => {
    try {
        res.json(booksdb);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const book = booksdb[isbn];
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author.toLowerCase();
        const books = Object.values(booksdb).filter(book => 
            book.author.toLowerCase().includes(author)
        );
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ message: 'No books found for this author' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title.toLowerCase();
        const books = Object.values(booksdb).filter(book => 
            book.title.toLowerCase().includes(title)
        );
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ message: 'No books found with this title' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/review/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const book = booksdb[isbn];
        if (book && book.reviews) {
            res.json(book.reviews);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;   