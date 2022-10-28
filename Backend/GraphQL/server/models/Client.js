const mongoose = reuqire('mongoose');
// mongoose schema is NOT related to a GraphQL
// imagine it like this: database, then on top of it
// the mongoose layer (object data map) where you create schema
// that includes fields of your DB collection
// then on top of that is GraphQL API where GraphQL schema comes in

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

module.exports = mongoose.model('Client', ClientSchema);
