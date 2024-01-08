const getDb = require('../util/database/db').getDb;
const Challenge = require('./Challenge');

const Uuid = require('uuid');

// fetchAll() fetches all the challenges from the collection.
// It returns all the challenges in JSON format.
// Function is asynchronous because it does a call to the database.
async function fetchAll() {

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


// findById selects the challenge with the given id from the collection.
// It returns a challenge object.
// Function is asynchronouse because it does a call to the database.
async function findById(challengeId) {

    console.log('challengeId', challengeId);

    const db = getDb();
    return db
        .collection('myChallenge')
        .find({ id: challengeId })
        .next()
        .then(
            challenge => {
                console.log('challenge findOne', challenge);
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
exports.findById = findById;

// addChallengeId adds an id to a challenge object if it not exists
// and returns the challenge object with a extra id field.
function addChallengeId(challenge) {
    if (!challenge.id) {
        challenge.id = Uuid.v4();
    }

    return challenge;
}
exports.addChallengeId = addChallengeId;

// addSerialCode adds a serialCode to the challenge.
// It returns the challenge object with a extra serialCode field.
function addSerialCode(challenge, serialCode) {
    if (!challenge.serialCode) {
        challenge.serialCode = serialCode;
    }

    return challenge;
}
exports.addSerialCode = addSerialCode;

// getNewSerialCode does a request on the myChallenge collection
// and sorts it by the serialCode. It fetches the first document
// with the highest serialCode. It returns this number.
// If there is no serialCode this function returns is 1.
// This function is asynchornous.
// NB This function has a delay because of the asynchronous.
// NB Don't use this function therefore in a loop.
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
                err => {
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
            err => {
                console.log(err);
            }
        )

}
exports.insertMany = insertMany;


// deleteOne deletes one challenge of the collection
async function deleteOne(id) {
    return db
        .collection('myChallenge')    
        .deleteOne(
            { id: id }
        )
        .then(
            delResult => {
                return delResult;
            }
        )
        .catch(
            err => {
                console.log(err);
                throw err;
            }
        )
}
exports.deleteOne = deleteOne;