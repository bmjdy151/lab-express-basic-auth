const express = require('express');
const router = express.Router();
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const saltRounds = 10; // cost factor for producing the hash

/* RENDER SIGNUP PAGE. */
router.get('/', function(req, res, next) { //http://localhost:3000/signup
  res.render("signup");
});

/* REGISTER USER. */
router.post("/register", (req, res) => {
  const { name,password } = req.body;

  bcrypt
    .hash(password, saltRounds)
    .then(hashedPassword => {
      return User.create({
        name,
        password: hashedPassword
      });
    })
    .then(userCreated => {
      res.redirect("/users");
    })
    .catch(err => {
      console.log("err", err);
    });

  //first we will encrypt the plain text password
  //then we create user (storing in db), with hashed pw
});


module.exports = router;
