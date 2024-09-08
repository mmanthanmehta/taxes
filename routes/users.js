const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/first')

const user = mongoose.Schema({
  username: String,
  password: String,
  secret: String
})

user.plugin(plm)
 
module.exports = mongoose.model('user', user)
