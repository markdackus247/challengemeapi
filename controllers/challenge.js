const Challenge = require('../models/Challenge');

const {
        findById
    } = require('../models/AllChallenges');

const Uuid = require('uuid');


exports.getChallenge = (req, res, next) => {
    const id = req.params.id;
    console.log('id:', id);

    findById(id)
        .then(
            challenge => {
                res.json(challenge);
            }
        )
        .catch(
            err => {
                console.log(err);
                throw err;
            }
        )
}


exports.postAddChallenge = (req, res, next) => {
    const description = req.body.description;
    let sourceId;

    let challenge = {
        description: description,
    }

    if (req.body.sourceId) {
        sourceId = req.body.sourceId;
        challenge.sourceId = sourceId;
    };

    const newChallenge = new Challenge(challenge);
    newChallenge
        .save()
        .then(
            result => {
                res.json(result)
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )


    console.log('description:', description);
}

exports.deleteChallenge = (req, res, next) => {
    const id = req.params.id;
    console.log('id at controllers:', id);
    const challenge = new Challenge();
    challenge
        .get(id)
        .then(
            getResult => {
                challenge
                    .delete()
                    .then(
                        delResult => {
                            res.json({delResult})
                        }
                    )
                    .catch(
                        err => {
                            console.log(err);
                            throw err;
                        }
                    )


            }
        )
        .catch(
            err => {
                console.log(err);
                throw err;
            }
        )
}