const {
    fetchAll,
    insertMany
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
        

    insertMany(newChallegens, 
        result => {
            res.json(result);
        }
    )
}