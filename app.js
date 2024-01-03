const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { mongoConnect } = require('./util/database/db');

const indexRouter = require('./routes/index');
const myChallenge = require('./routes/myChallenge');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/myChallenge', myChallenge);


mongoConnect(() => {
    console.log('App.js connected to the DB');
})

module.exports = app;
