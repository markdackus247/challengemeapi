const MyChallenge = require('../models/MyChallenge');
const MyChallenges = require('../models/AllMyChallenges');

const Uuid = require('uuid');


exports.getAddChallenge = (req, res, next) => {
    const id = Uuid.v4();
    const description = "Ik kan een laptop gebruiksklaar maken.";
    const serialCode = "5";

    const myChallenge = new MyChallenge(id, description, serialCode);
    myChallenge.save();

    res.json([
        {
            "id": id
        }
    ])
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