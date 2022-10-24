require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/dbConn');
const app = express();
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');

// connect to cloud DB
connectDB();

// EJS
app.set('view engine', 'ejs');

// to be able to give access to New Article
app.use(express.urlencoded({ extended: false }))
// will allow us to call the delete router
app.use(methodOverride('_method'))

// to display article thumbnails on root page, include
// { articles } object
app.get('/',  async (req, res) => {
    // get every single article in the database
    const articles = await Article.find().sort( { createdAt: 'desc' });
    res.render('articles/index', {articles: articles })
})

// Router
app.use('/articles', articleRouter)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})