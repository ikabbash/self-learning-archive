require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/dbConn');
const app = express();
const articleRouter = require('./routes/articles')

// connect to cloud DB
connectDB();

// EJS
app.set('view engine', 'ejs');

// Router
app.use('/articles', articleRouter)
// to be able to give access to New Article
app.use(express.urlencoded({ extended: false }))

// to display article thumbnails on root page, include
// { articles } object
app.get('/', (req, res) => {
    const articles = [{
        title: 'Test article',
        createdAt: new Date(),
        description: 'Test description'
    }]
    res.render('articles/index', {articles: articles })
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})