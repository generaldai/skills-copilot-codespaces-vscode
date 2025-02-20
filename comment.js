// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment.js');
const port = process.env.PORT || 3000;

// Connect to the database
mongoose.connect('mongodb://localhost:27017/comment');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Get all the comments
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(400).send('Something went wrong');
        } else {
            res.status(200).send(comments);
        }
    });
});

// Post a comment
app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        message: req.body.message
    });
    comment.save((err, comment) => {
        if (err) {
            res.status(400).send('Something went wrong');
        } else {
            res.status(200).send(comment);
        }
    });
})