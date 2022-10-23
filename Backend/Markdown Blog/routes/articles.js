const express = require('express');
const Article = require('./../models/article')
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new')
})

// if it's not new, it'll go here
router.get('/:id', (req, res) =>{

})

// whenever a new article is made, this is the route
// to save the article to the database
router.post('/', async (req, res) => {
    const article = new Article({
        // we need to tell express how to access
        // options like textboxes
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        // passed article: article so it can pre-fill
        res.render('articles/new', { article: article })
    }    
})
module.exports = router