const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String
})

//model name is 'user', the schema is 'userSchema' and collection from db(mLab) is 'users'
module.exports = mongoose.model('user',userSchema,'users')