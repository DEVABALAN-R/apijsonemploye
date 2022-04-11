const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
   
    _userId: {
        type: mongoose.Types.ObjectId,
      return : true
    },
    
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    mobile: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    }

})

const List = mongoose.model('List',ListSchema);

module.exports = {List}