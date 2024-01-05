const MyChallenge = require('../models/MyChallenge');
const AllMyChallenges = require('../models/AllMyChallenges');

const Uuid = require('uuid');


exports.getChallenge = (req, res, next) => {
    const id = req.params.id;
    console.log('id:', id);

    const myChallenges = new AllMyChallenges();

    myChallenges
        .findById(id, 
            challenge => {
                console.log('challenge:', challenge)
                return challenge
            }    
        )
        .then(
            challengeById => {
                res.json(challengeById.get());
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
}


exports.postAddMyChallenge = (req, res, next) => {
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

    const myChallenges = new MyChallenges();
    myChallenges.getNewSerialCode(
        (newSerialCode) => {
            console.log('newSerialCode:', newSerialCode);
            challenge.serialCode = newSerialCode;

            const myChallenge = new MyChallenge(challenge);
            myChallenge
                .save()
                .then(
                    result => {
                        // console.log('result', result);
                        res.json(result);
                    }
                )
                .catch(
                    err => console.log(err)
                )
        }
    )

    console.log('description:', description);
}