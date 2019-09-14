const express = require('express');
const router = express.Router();

/* RENDER MAIN PAGE. */
router.get('/', function(req, res, next) { 
  res.render("private");
});


module.exports = router;
