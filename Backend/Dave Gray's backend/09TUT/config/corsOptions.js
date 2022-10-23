const whitelist = ['https://www.yoursite.com', 
'http://127.0.0.1:5500', 'http://localhost:3500'];
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

module.exports = corsOptions;