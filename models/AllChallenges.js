const getDb = require('../util/database/db').getDb;

const Uuid = require('uuid');

class AllChallenges {

    // This function gets the latest used serialCode and adds one to it.
    // Its starts counting on 1.
    // Its uses a call back function so other actions can be nested in it.
    // But is also returns the new serialCode.
    static getNewSerialCode(callback) {
        let newSerialCode;

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
                        return newSerialCode = (Number(challenges[0].serialCode) + 1);
                    else {
                        return newSerialCode = 1;
                    }
                }
            )
            .then(
                newSerialCode => {
                    console.log('New serialCode generated:', newSerialCode);
                    callback(newSerialCode);
                    return newSerialCode
                }
            )
            .catch(
                err => {
                    console.log(err);
                    throw err;
                }
            )
    }

    // This method can be used to fetch all the challenges of 
    // the user.
    static fetchAll() {

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
    static findById(challengeId, callback) {

        console.log('challengeId', challengeId);
        
        const db = getDb();
        return db
            .collection('myChallenge')
            .find({id: challengeId})
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

    // This function inserts many challenges at once.
    // It uses the MyChallenge class to insert the challenges in the database.
    static insertMany(newChallenges, callback){

        let insertResult = [];
        const db = getDb();

        for(let newChallenge of newChallenges) {
            if (!newChallenge.id) {
                newChallenge.id = Uuid.v4();
            }
            
            
            AllChallenges
                .getNewSerialCode(
                    (newSerialCode) => {
                        newChallenge.serialCode = newSerialCode;
        
                        db
                            .collection('myChallenge')
                            .insertOne(newChallenge)
                            .then(
                                result => {
                                    insertResult.push(result);
                                    // console.log('result', result);
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

        }

        callback(insertResult);

    }

}

module.exports = AllChallenges