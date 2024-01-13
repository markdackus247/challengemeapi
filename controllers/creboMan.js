const CreboMan = require('../models/CreboMan');

exports.insertOne = (req, res, next) => {
    const creboObject = req.body;

    CreboMan
        .insertOne(creboObject)
        .then(
            insertResult => {
                res.json(insertResult);
            }
        )
        .catch(
            error => {
                return next(error);    
            }
        )
}