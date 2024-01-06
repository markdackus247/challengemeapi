const Challenge = require('../models/Challenge');
const AllChallenges = require('../models/AllChallenges');

const Uuid = require('uuid');


exports.getChallenge = (req, res, next) => {
    const id = req.params.id;
    console.log('id:', id);

    AllChallenges
        .findById(id, 
            challenge => {
                console.log('challenge:', challenge)
                return challenge
            }    
        )
        .then(
            challenge => {
                res.json(challenge);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
}


exports.postAddChallenge = (req, res, next) => {
    const description = req.body.description;
    let sourceId;

    let challenge = {
        id: Uuid.v4(),
        description: description,
    }

    if (req.body.sourceId) {
        sourceId = req.body.sourceId;
        challenge.sourceId = sourceId;
    };

    const newChallenge = new Challenge(challenge);
    newChallenge.save(
        result => {
            res.json(result);
        }
    );

    console.log('description:', description);
}