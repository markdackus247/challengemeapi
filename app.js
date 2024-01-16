const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// const { mongoConnect } = require('./util/database/db');

const indexRouter = require('./routes/index');
const Challenge = require('./routes/challenge');
const AllChallenges = require('./routes/allChallenges');
const CreboMan = require('./routes/CreboMan');

// const amqp = require('amqplib/callback_api');

// amqp.connect('amqp://localhost', function (error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function (error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var queue = 'hello';
//         var msg = 'Hello world';

//         channel.assertQueue(queue, {
//             durable: false
//         });

//         channel.sendToQueue(queue, Buffer.from(msg));
//         console.log(" [x] Sent %s", msg);
//     });
// });

// exports.amqp = amqp;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/myChallenge', Challenge);
app.use('/myChallenges', AllChallenges);
app.use('/creboman', CreboMan);

app.use((error, req, res, next) => {
    // console.log('app.js>app.use>error', JSON.parse(error.message));
    // res.json(JSON.parse(error.message));
    res.json({message: 'Error'})
})


mongoose
    .connect('mongodb://challengemeapi:iXyO3Vo5oCfmKHjCYNHbxLJaO7xUlMVk@127.0.0.1:27017/?authSource=challengemeapi')
    .then(
        result => {
            console.log('app.js>mongoose>connect: Mongoose is connected');
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    )


// mongoConnect(() => {
//     console.log('Connected to the MongoDB Database.');
// })

module.exports = app;
