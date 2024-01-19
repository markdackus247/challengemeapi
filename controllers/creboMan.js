const CreboMan = require('../models/CreboMan/index');


exports.insertOne = (req, res, next) => {
    const creboObject = req.body;

    // console.log('controllers>creboMan.js>insertOne>Top', creboObject);

    CreboMan
        .insertOne(creboObject)
        .then(
            insertResult => {
                console.log('controllers>creboMan.js>insertOne<then', insertResult);
                res.json(insertResult);
            }
        )
        .catch(
            err => {
                // console.log(`controllers>creboMan.js>insertOne>insertOne>catch: ${err}`);
                return next(err);    
            }
        )
}

exports.getAll = (req, res, next) => {
    CreboMan
        .getAll()
        .then(
            getResult => {
                console.log(`controllers>creboMan.js>getAll>then>getResult: ${getResult}`);
                res.json(getResult);
            }
        )
        .catch(
            err => {
                console.log(`controllers>creboMan.js>getAll>catch>err: ${err}`);
                return next(err); 
            }
        )
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;
    
    CreboMan
        .getOne(id)
        .then(
            getResult => {
                console.log(`controllers>creboMan.js>getAll>then>getResult: ${getResult}`);
                res.json(getResult);
            }
        )
        .catch(
            err => {
                console.log(`controllers>creboMan.js>getAll>catch>err: ${err}`);
                return next(err); 
            }
        )
}

exports.updateOne = (req, res, next) => {
    const creboId = req.params.id;
    const creboUpdates = req.body;
    // console.log(`controllers>creboMan.js>updateOne>updateOne>creboId ${creboId}`);

    CreboMan
        .updateOne(creboId, creboUpdates)
        .then(
            updateResult => {
                // console.log(`controllers>creboMan.js>updateOne>updateOne>then>updateResult: ${updateResult}`);

                // console.log(`controllers>creboMan.js>updateOne>updateOne>then>newCreboObject: ${newCreboObject}`);
                res.json(updateResult);
            }
        )
        .catch(
            err => {
                console.log(`controllers>creboMan.js>updateOne>catch>err: ${err}`);
                return next(err);
            }
        )
}