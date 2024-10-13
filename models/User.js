
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    socialMedia: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admins'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User
