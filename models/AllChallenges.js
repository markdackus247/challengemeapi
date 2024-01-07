const getDb = require('../util/database/db').getDb;
const Challenge = require('./Challenge');

const Uuid = require('uuid');

// This function gets the latest used serialCode and adds one to it.
// Its starts counting on 1.
// Its uses a call back function so other actions can be nested in it.
// But is also returns the new serialCode.
// async function getNewSerialCode(callback) {
//     let newSerialCode;

//     const db = getDb();
//     return db
//         .collection('myChallenge')
//         .find()
//         .sort({ serialCode: -1 })
//         .limit(1)
//         .toArray()
//         .then(
//             challenges => {
//                 if (challenges.length > 0)
//                     return newSerialCode = (Number(challenges[0].serialCode) + 1);
//                 else {
//                     return newSerialCode = 1;
//                 }
//             }
//         )
//         .then(
//             newSerialCode => {
//                 console.log('New serialCode generated:', newSerialCode);
//                 callback(newSerialCode);
//                 return newSerialCode
//             }
//         )
//         .catch(
//             err => {
//                 console.log(err);
//                 throw err;
//             }
//         )
// }
// exports.getNewSerialCode = getNewSerialCode;

// This method can be used to fetch all the challenges of 
// the user.
exports.fetchAll = () => {

    const db = getDb();
    return db
        .collection('myChallenge')
        .find()
        .toArray()
        .then(challenges => {
            return challenges;
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

// This method finds a challenge with a given id.
// It returns a challenge object.
exports.findById = (challengeId, callback) => {

    console.log('challengeId', challengeId);

    const db = getDb();
    return db
        .collection('myChallenge')
        .find({ id: challengeId })
        .next()
        .then(
            challenge => {
                console.log('challenge findOne', challenge);
                // challengeById = new Challenge(challenge);
                callback(challenge)
                return challenge;
            }
        )
        .catch(
            err => {
                console.log(err);
                throw err;
            }
        )
}



function addChallengeId(challenge) {
    if (!challenge.id) {
        challenge.id = Uuid.v4();
    }

    return challenge;
}
exports.addChallengeId = addChallengeId;


function addSerialCode(challenge, serialCode) {
    if (!challenge.serialCode) {
        challenge.serialCode = serialCode;
    }

    return challenge;
}
exports.addSerialCode = addSerialCode;


async function getNewSerialCode() {

    const db = getDb();
    return db
        .collection('myChallenge')
        .find()
        .sort({ serialCode: -1 })
        .limit(1)
        .toArray()
        .then(
            challenges => {
                if (challenges.length > 0)
                    return Number(challenges[0].serialCode) + 1;
                else {
                    return 1;
                }
            }
        )
        .catch(
            err => {
                console.log(err);
                throw err;
            }
        )
}
exports.getNewSerialCode = getNewSerialCode;


async function insertOne(challenge, serialCode = null) {
    challenge = addChallengeId(challenge);

    const db = getDb();

    if (serialCode) {
        challenge = addSerialCode(challenge, serialCode);

        return db
            .collection('myChallenge')
            .insertOne(challenge)
            .then(
                result => {
                    return result;
                }
            )
            .catch(
                err => {
                    console.log(err);
                    throw err;
                }
            );
    } else {
        return getNewSerialCode()
            .then(
                newSerialCode => {
                    console.log('New serialCode generated in insertOne:', newSerialCode);

                    challenge = addSerialCode(challenge, newSerialCode);

                    return db
                        .collection('myChallenge')
                        .insertOne(challenge)
                        .then(
                            result => {
                                return result;
                            }
                        )
                        .catch(
                            err => {
                                console.log(err);
                                throw err;
                            }
                        );
                }
            )
            .catch(
                err =>{
                    console.log(err);
                }
            )

    }
}
exports.insertOne = insertOne;


async function insertMany(challenges) {

    const insertResults = [];
    let indexNewSerialCode;

    return getNewSerialCode()
        .then(
            newSerialCode => {
                console.log('New serialCode generated 2:', newSerialCode);
                indexNewSerialCode = Number(newSerialCode) - 1;
                // console.log('challenge:', challenge)

                for (let challenge of challenges) {
                    console.log('in inserMany()', challenge);
                    indexNewSerialCode += 1;
                    insertOne(challenge, indexNewSerialCode)
                        .then(
                            insertResult => {
                                console.log('insertResult', insertResult);
                                insertResults.push(insertResult);
                            }
                        )
                        .catch(
                            err => {
                                console.log(err);
                                throw err;
                            }
                        )
                }

                console.log('insertResults:', insertResults);
                return insertResults;
            }
        )
        .catch(
            err =>{
                console.log(err);
            }
        )

}
exports.insertMany = insertMany;