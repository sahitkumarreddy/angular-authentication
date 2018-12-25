const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:  { 
        type: String,     
        Required:  'Email address cannot be left blank.'     
        },

    password: { type: String , required: [true,  'Password cannot be left blank']}
})

//model name is 'user', the schema is 'userSchema' and collection from db(mLab) is 'users'
module.exports = mongoose.model('user',userSchema,'users')