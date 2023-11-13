var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var createBookingsRouter = require('./routes/create-booking');
var viewBookingsRouter = require('./routes/view-booking');
var aboutRouter = require('./routes/about');
var helpRouter = require('./routes/help');


var app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://arnas:Mongo@ssproject1.p6ab0sx.mongodb.net/Bookings?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', indexRouter);
app.use('/create-booking', createBookingsRouter);
app.use('/view-booking', viewBookingsRouter);
app.use('/about', aboutRouter);
app.use('/help', helpRouter);

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening to localhost:${PORT}`)
})

module.exports = app;
