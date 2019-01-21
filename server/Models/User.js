var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let User = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    phone: {
        type: Number,
        trim: true,
        default :""
    },
    token: {
        type: Number,
        trim: true,
        default :0
    },
    password: {
        type: String,
        trim: true, 
        select: false,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    tokenCreatedDateTime: {
        type: Date
    }
});

User.index({
    email: 1,
    phone :1
}, {
    unique: true
});

module.exports = mongoose.model('User', User);
