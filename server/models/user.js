const mongoose = require('mongoose')

const Schema = mongoose.Schema

var validateEmail = function(email) {

    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return re.test(email)

};

const userSchema = new Schema({
    email:    { 
        type: String,     
        Required:  'Email address cannot be left blank.',    
        validate: [validateEmail, 'Please fill a valid email address'],
             match: [pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}", 'Please fill a valid email address'],
        index: {unique: true, dropDups: true}       
        },

    password: { type: String , required: [true,  'Password cannot be left blank']}
})

//model name is 'user', the schema is 'userSchema' and collection from db(mLab) is 'users'
module.exports = mongoose.model('user',userSchema,'users')