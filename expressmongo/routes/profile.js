var express = require('express');
var router = express.Router();

/* RENDER PROFILE PAGE. */
router.get('/', function(req, res, next) {
  res.render('profile', { user: req.session.currentUser });
});

module.exports = router;
