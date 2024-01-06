const AllChallenges = require('../models/AllChallenges');

exports.getAllChallenges = (req, res, next) => {
    
    AllChallenges
        .fetchAll()
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
        
    AllChallenges
        .insertMany(newChallegens, 
        result => {
            res.json(result);
        }
    )
}