const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');

const usersRouter = require('./api/routes/users.route');
const authRouter = require('./api/routes/auth.route');
const reviewsRouter = require('./api/routes/reviews.route');
const errorsHandler = require("./api/middlewares/errorHandler.middleware");
const { RouteNotFoundError } = require("./utils/RouteNotFound.error");
const {build_origin, dev_origin} = require("./config/vars");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors( {
  origin: build_origin || dev_origin,
  credentials: true,
  optionSuccessStatus: 200
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// gzip compression
app.use(compress());

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/reviews', reviewsRouter);


app.use('/*', (req, res, next) => {
  next(new RouteNotFoundError(req.originalUrl));
});
app.use(errorsHandler);

module.exports = app;
