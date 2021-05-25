const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    dateCreates: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', userSchema);