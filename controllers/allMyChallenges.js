const AllMyChallenges = require('../models/AllMyChallenges');

exports.getAllMyChallenges = (req, res, next) => {
    const myChallenges = new AllMyChallenges();
    myChallenges
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