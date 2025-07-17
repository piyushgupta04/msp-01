const mongoose = require('mongoose');

const CredSchmea = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = new mongoose.model('User', CredSchmea)
module.exports = User;