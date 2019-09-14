var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");
const mainRouter = require("./routes/main");
const privateRouter = require("./routes/private");
const authRouter = require("./routes/auth");
const autherrRouter = require("./routes/autherr");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Session middleware. This will take care of storing the session in mongo
app.use(
  session({
    secret: "basic-auth-secret", //encrypts cookie (so it hashes)
    cookie: { maxAge: 60000 }, // options for cookie storage
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/autherr", autherrRouter);
app.use("/main", authRouter, mainRouter);
app.use("/private", authRouter, privateRouter);
app.use(bodyParser.urlencoded({extended:true}));

//connect to database
mongoose.connect('mongodb://localhost/userlist', { useNewUrlParser: true })
.then(() => {
  console.log('Connected to Mongo!');
})
.catch(err => {
  console.error('Error connecting to mongo', err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
