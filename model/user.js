const mongoose = require('mongoose');
const sChema = mongoose.Schema;

const userSchema = new sChema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:8
    }
})
module.exports = mongoose.model('users', userSchema);