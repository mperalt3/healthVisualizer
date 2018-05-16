import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { databaseConfiguration } from './config/db';
import mongoose from 'mongoose';
import router from './app/routes';

let app = express();

//Database Setup: Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/' + databaseConfiguration.name;
mongoose.connect(mongoDB, function (err) {
    if (err) throw err;
  });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(callback) {
     console.log("Connection succeeded!");
 });

// Middleware Setup.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Setup
app.use('/api/v1', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
        message: err.message,
        error: err
    });
});

// Listen port 8080
app.listen(8080, function() {
    console.log('\n...Ready on port 8080');
});


module.exports = app;
