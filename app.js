const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { mongoConnect } = require('./util/database/db');

const indexRouter = require('./routes/index');
const Challenge = require('./routes/challenge');
const AllChallenges = require('./routes/allChallenges');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/myChallenge', Challenge);
app.use('/myChallenges', AllChallenges);


mongoConnect(() => {
    console.log('Connected to the MongoDB Database.');
})

module.exports = app;
