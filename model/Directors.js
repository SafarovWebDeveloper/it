const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const director = new Schema({
    name:{
        type:String,
        required:true
    },
    surname:String,
    bio:String,
    dateTime:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('director' ,  director);