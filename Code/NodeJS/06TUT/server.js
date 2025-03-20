// Intro to Express

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

/* 
    REGEX
    ^/ means must begin with a slash
    /$ means must end with a slash
    | or
    ( .. )? means it's optional
*/ 

// all codes are route handlers basically
app.get('^/$|index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

// means it's been permanently moved so even if you typed /old-page
// you'll get redirected to new-page.html
app.get('/old-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname});
    res.redirect(301, '/new-page.html');
});

// * means select all
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


// other ways
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Howdy');
})

/* or you could have a series of functions like
const one = (req, res, next) => {
    something
}
then call them all together with just this and they're all executed
app.get('/chain(.html)?', [one, two, three, etc..]);
*/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

