const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')

// app.use is where middleware is often applied
// there's built-in middleware, custom, or from 3rd parties
// current example is built-in to handle urlencoded data
app.use(express.urlencoded({ extended: false}));

// another built-in for json
app.use(express.json());

// server static files
app.use(express.static(path.join(__dirname, '/public')));

// custom middleware logger
app.use(logger);
// only those listed domains can access the backend server
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        // !origin so we don't receive the error
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            // it is allowed
            callback(null, true)
        } else {
            callback( new Error('Not allowed by CORS'));
        }
    }, optionsSuccessStatus: 200
}
// with the block of code above, google.com shouldn't be able to fetch

// cross-origin resource sharing so we can make a request from say google.com
app.use(cors(corsOptions));




app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
});

// here used app.all instead of app.get, app.all can accept regex
app.get('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ error: "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
})


// custom error
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

