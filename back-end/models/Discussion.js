const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const DiscussionSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('discussions', DiscussionSchema);
