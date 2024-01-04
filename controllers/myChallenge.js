const MyChallenge = require('../models/MyChallenge');
const MyChallenges = require('../models/MyChallenges');


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

    const challenge = {
        id: Uuid.v4(),
        description: description,
        serialCode: "5"
    }

    // const myChallenges = new MyChallenges();
    // const newSerialCode = myChallenges.getNewSerialCode(
    //         (challengens) => {
    //             console.log(challengens);
    //         }
    //     )

    const myChallenge = new MyChallenge(challenge);
    myChallenge.save();

    res.json(challenge);

    console.log('description:', description);
}