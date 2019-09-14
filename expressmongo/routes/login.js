const express = require('express');
const router = express.Router();
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
let currentUser;
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);

/* RENDER LOGIN PAGE. */
router.get('/', function(req, res, next) { //http://localhost:3000/login
  res.render("login");
});

/* CHECK IF USER ALREADY EXIST AND LOGIN. */
router.post("/auth", (req, res, next) => {
  // const name = req.body.name;
  // const password = req.body.password;
  const { name, password } = req.body;

  if (name === "" || password === "") {
    res.send("Please enter both, username and password to sign up.");
    return;
  }

  User.findOne({ name })
    .then(user => {
      if (!user) {
        res.render("autherr", {
          errorMessage: "The username doesn't exist."
        });
        //res.redirect("/users");
        return false;
      } else {
        currentUser = user;
        //first arg is client & second arg is from db
        return bcrypt.compare(req.body.password, user.password); //true or false
        //passed down to next .then
      }
    })
    .then(passwordCorrect => {
      if (passwordCorrect) {
        //storing session in our database and set cookie in client.
        req.session.currentUser = currentUser;
        // debugger;
        res.redirect("/profile");
        return;
      } else {
        res.render("autherr", {
          errorMessage: "Credentials don't match."
        });
        // res.send("Credentials don't match.");
        return;
      }
    })
    .catch(err => {
      debugger;
      console.log("err", err);
    });
});
module.exports = router;
