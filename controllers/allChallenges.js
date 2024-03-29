const {
    fetchAll,
    insertMany,
    insertOne,
    deleteAll
} = require('../models/AllChallenges');

exports.getAllChallenges = (req, res, next) => {
    
    fetchAll()
        .then(
            challenges => {
                // console.log('challenges:', challenges);
                res.json(challenges);
            }
        )
        .catch(
            err => console.log(err)
        )
}

exports.postManyChallenges = (req, res, next) => {
    // console.log('req.body:', req.body);
    const newChallegens = req.body;

    insertMany(newChallegens)
        .then(
            ch => {
                console.log('ch:', ch);
                res.json(ch);
            }
        )
        .catch(
            err => {
                console.log(err)
            }
        );

}

exports.deleteAllChallenges = (req, res, next) => {
    
    deleteAll()
        .then(
            deleteResult => {
                res.json(deleteResult);
            }
        )
        .catch(
            err => {
                console.log(err);
                throw err;
            }
        )
}