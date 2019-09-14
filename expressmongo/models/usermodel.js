const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{type: String, required: true, unique: true},
  password:String
});

const userModel = mongoose.model('userlist', userSchema);//userSchemaというスキーマを使ってuserlistsというcollectiveを作る。
module.exports = userModel;