const CreboMan = require('../models/CreboMan/index');

exports.insertOne = (req, res, next) => {
    const creboObject = req.body;

    CreboMan
        .insertOne(creboObject)
        .then(
            insertResult => {
                console.log('controllers>creboMan.js>insertOne>InsertOne<then', insertResult);
                res.json(insertResult);
            }
        )
        .catch(
            error => {
                return next(error);    
            }
        )
}