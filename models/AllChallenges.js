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


// // This function inserts many challenges at once.
// // It uses the MyChallenge class to insert the challenges in the database.
// exports.insertMany = (newChallenges, callback) => {

//     let insertResult = [];
//     const db = getDb();
//     let newChallengeObject;


//     db
//         .collection('myChallenge')
//         .find()
//         .sort({ serialCode: -1 })
//         .limit(1)
//         .toArray()
//         .then(
//             challenges => {
//                 if (challenges.length > 0)
//                     return (Number(challenges[0].serialCode) + 1);
//                 else {
//                     return 1;
//                 }
//             }
//         )
//         .then(
//             newSerialCode => {

//                 for (let i = 0; i < newChallenges.length; i++) {
//                     if (!newChallenges[i].id) {
//                         newChallenges[i].id = Uuid.v4();
//                     }
//                     newChallenges[i].serialCode = newSerialCode;
//                     // console.log(`newChallenges[${i}]`, newChallenges[i])
//                     newSerialCode += 1;
//                 }

//                 console.log('newChallenges 1:', newChallenges);

//                 return newChallenges;

//             }
//         )
//         .then (
//             newChallenges => {
//                 db
//                     .collection('myChallenge')
//                     .insertMany(newChallenges)
//                     .then(
//                         result => {
//                             callback(result);
//                             // console.log('result', result);
//                             return result;
//                         }
//                     )
//                     .catch(
//                         err => {
//                             console.log(err);
//                             throw err;
//                         }
//                     );
//             }
//         ) 
//         .catch(
//             err => {
//                 console.log(err);
//                 throw err;
//             }
//         )

// }

function addChallengeId(challenge) {
    if (!challenge.id) {
        challenge.id = Uuid.v4();
    }

    return challenge;
}
exports.addChallengeId = addChallengeId;

function addSerialCode(challenge, serialCode) {
    if(!challenge.serialCode) {
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

async function insertOneIntoDB(challenge) {

    const db = getDb();
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
exports.insertOneIntoDB = insertOneIntoDB;

async function insertOne(challenge) {
    let result;

    return getNewSerialCode()
        .then(
            newSerialCode => {
                console.log('New serialCode generated 2:', newSerialCode);
                
                challenge = addChallengeId(challenge);
                challenge = addSerialCode(challenge, newSerialCode);

                // console.log('challenge:', challenge)

                return insertOneIntoDB(challenge)
                    .then(
                        insertResult => {
                            result = insertResult;
                            return insertResult;
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
            err =>{
                console.log(err);
            }
        )

}
exports.insertOne = insertOne;

async function insertMany(challenges) {
    
    let insertResults = []

    for(let challenge of challenges) {
        console.log('in inserMany()',challenge);
        insertOne(challenge)
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

    return insertResults;

}
exports.insertMany = insertMany;