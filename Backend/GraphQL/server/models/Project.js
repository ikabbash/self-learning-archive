const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        // pre-defined constants
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        // object ID, mongoose takes care of it automatically
        type: mongoose.Schema.Types.ObjectId,
        // to relate to another model
        ref: 'Client',
    },
});

module.exports = mongoose.model('Project', ProjectSchema);
