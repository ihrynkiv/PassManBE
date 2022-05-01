const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const errorsHandler = require("./middlewares/errorHandler.middleware");
const { RouteNotFoundError } = require("./utils/RouteNotFound.error");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);


app.use('/*', (req, res, next) => {
  next(new RouteNotFoundError(req.originalUrl));
});
app.use(errorsHandler);

module.exports = app;
