const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({ extended: false}));

// another built-in for json
app.use(express.json());
// server static files
app.use(express.static(path.join(__dirname, '/public')));

// should route any request coming from sub-directory
// to the router instead of the routes defined below (app.get)
app.use('/subdir', require('./routes/subdir'));
// to give css to the subdir since it doesn't have it
app.use('/subdir', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

// custom middleware logger
app.use(logger);
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

app.use(cors(corsOptions));

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

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

