const express = require("express");
const router = express.Router();

//Our custom middleware function.
router.use("/", (req, res, next) => {
  debugger;
  if (req.session.currentUser) {
    next();
  } else {
    debugger;
    res.redirect("/users");
  }
});

module.exports = router;