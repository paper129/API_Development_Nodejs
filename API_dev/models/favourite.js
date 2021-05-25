const mongoose = require('mongoose');
const favSchema = mongoose.Schema({
    userid:
    {
        _id: String,
        require: true
    },
    postid:{
        id: String,
        require: true
    }

});


module.exports = mongoose.model('favourite', favSchema);