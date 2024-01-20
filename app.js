const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const Challenge = require('./routes/challenge');
const AllChallenges = require('./routes/allChallenges');
const CreboMan = require('./routes/CreboMan');

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

// All catched errors will end up here.
// error.message contains the errormessage object but this is STRINGIFIED.
// In this function is wil be converted to a javascript object.
// The returned error object has always the same type.
// Example
// {
//     "type": 503,
//     "errors": [
//         {
//             "code": "SaveDb",
//             "message": "Cannot save the information.",
//             "detail": "Unable to save the information because of connection problems.",
//             "source": "AllCrebos/insertOne/crebo"
//         }
//     ]
// }
app.use((error, req, res, next) => {
    try{
        errMessageObject = JSON.parse(error.message)
    }
    catch(err) {
        console.log(`app.js>error>catch: `, err);
        errMessageObject =
            {
                "type": 500,
                "errors": [
                    {
                        "code": "systemError",
                        "message": "The system gave an error.",
                        "detail": error.message,
                        "source": "unknown"
                    }
                ]
            } 
    }
    console.log('app.js>app.use>error', errMessageObject);
    res.json(errMessageObject); 
})


mongoose
    .connect('mongodb://challengemeapi:iXyO3Vo5oCfmKHjCYNHbxLJaO7xUlMVk@127.0.0.1:27017/CreboAPI?authSource=challengemeapi')
    .then(
        result => {
            console.log('app.js>mongoose>connect: Mongoose is connected 2');
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    )


module.exports = app;
