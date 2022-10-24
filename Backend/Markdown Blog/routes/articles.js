const express = require('express');
const Article = require('./../models/article')
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})
// added { article: new Article() } so when pressing go back one
// page and returning it won't show an error. We have access to the article

// if it's not new, it'll go here
router.get('/:id', async (req, res) =>{
    // const article = await Article.findById(req.params.id)
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/');
    res.render('articles/show', { article: article })
})

// whenever a new article is made, this is the route
// to save the article to the database
router.post('/', async (req, res) => {
    // used let instead of const for error
    let article = new Article({
        // we need to tell express how to access
        // options like textboxes
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
        article = await article.save()
        // res.redirect(`/articles/${article.id}`)
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        // passed article: article so it can pre-fill
        // failed article
        res.render('articles/new', { article: article })
    }    
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
// then use method-override to allow us to override method
// in form passes so we can delete instead of being stuck with
// GET or POST
module.exports = router