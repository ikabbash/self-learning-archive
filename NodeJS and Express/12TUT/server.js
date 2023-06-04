const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');

const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require ('cookie-parser');

app.use(express.urlencoded({ extended: false}));

// another built-in for json
app.use(express.json());
// server static files
app.use(express.static(path.join(__dirname, '/public')));
// middleware for cookies
app.use(cookieParser());

// to give css to the subdir since it doesn't have it
// basic routes
// new routes were added (programming logic in controller, router in routes)
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
// now you'll get a cookie and when you refresh new cookie is generated
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT); // JWT
app.use('/employees', require('./routes/api/employees'));

// custom middleware logger
app.use(logger);

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