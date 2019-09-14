const mongoose = require('mongoose');
const userModel = require('../models/usermodel'); // Import of the model usermodel from './models/usermodel'

// To insert in "bin/seeds.js"
const users = [
  {
    name : "Minatsu",
    password: "password1"
  },
  {
    name : "Momoko",
    password: "password2"
  },
  {
    name : "Taichi",
    password: "password3"
  }
];

//make connection
mongoose.connect('mongodb://localhost/userlist', { useNewUrlParser: true })
.then(() => {
  console.log('Connected to Mongo!');
  return userModel.deleteMany();
})
//insert data
.then(()=>{ 
  return userModel.insertMany(users);
})
//close connection
.then(()=>{
  mongoose.connection.close();
  console.log("connection closed");
})
.catch(err => {
  console.error('Error connecting to mongo', err);
});
