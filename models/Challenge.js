const { getDb } = require('../util/database/db');

const Uuid = require('uuid');
const {
    getNewSerialCode,
    insertOne,
    deleteOne,
    findById
} = require('./AllChallenges');

class Challenge {
    constructor(myChallenge) {
        this.myChallenge = myChallenge;
        this.db = getDb();

    }

    // The function save can be used to write the this.myChallenge object
    // to the collection 'myChallenge'.
    // Other methods can be used to manipulate the object before writing to
    // the database.
    // This function returns a promise with te result of the insert information.
    async save() {
        return insertOne(this.myChallenge)
            .then(
                result => {
                    return result;
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
    }

    // This get() method returns the object informatie of the challenge (this.myChallenge).
    async get(id = null) {
        if (this.myChallenge && !id) {
            return this.myChallenge;
        }
        else {
            return findById(id)
                .then(
                    challenge => {
                        this.challenge = challenge;
                        console.log('this.challenge', challenge);
                        return this.challenge;
                    }

                )
                .catch(
                    err => {
                        console.log(err);
                        throw err;
                    }
                )
        }
    }

    async delete(id) {
        return deleteOne(id)
            .then(
                delResult => {
                    this.challenge = null;
                    return delResult;
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )

    }

}


module.exports = Challenge;