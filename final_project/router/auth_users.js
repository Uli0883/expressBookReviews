const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

let users = [];

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, password });
    res.json({ message: 'User successfully registered. Now you can login' });
});

router.post('/customer/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

router.put('/customer/auth/review/:isbn', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const review = req.query.review;
        res.json({ message: `Review for ISBN ${req.params.isbn} added/updated successfully`, review });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

router.delete('/customer/auth/review/:isbn', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        res.json({ message: `Review for ISBN ${req.params.isbn} deleted successfully` });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

module.exports = router;   