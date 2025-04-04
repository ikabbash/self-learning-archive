const express = require('express');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// connect to DB
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))
app.listen(port, console.log(`Server running on port ${port}`))