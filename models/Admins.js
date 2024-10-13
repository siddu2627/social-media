const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Admins = mongoose.model('Admins', adminsSchema);

module.exports = Admins;