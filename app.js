const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoConnect = require('./util/database/db');

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

let db;

mongoConnect((client) => {
    console.log('App.js connected to the DB');
    db = client;
    console.log('db:', db);

    const docs = [
        { "_id": 1, "color": "red"},
        { "_id": 2, "color": "purple"},
        { "_id": 1, "color": "yellow"},
        { "_id": 3, "color": "blue"}
     ];
    
    db.db('challengemeapi').collection('colors')
        .insertMany(docs)
        .then()
        .catch()

})

module.exports = app;
