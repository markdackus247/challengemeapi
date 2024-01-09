const { getDb } = require('../util/database/db');

const Uuid = require('uuid');
const {
    getNewSerialCode,
    insertOne,
    deleteOne,
    findById,
    updateOne
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
                    throw err;
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
                        this.myChallenge = challenge;
                        console.log('this.challenge', challenge);
                        return this.myChallenge;
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

    async delete() {
        return deleteOne(this.myChallenge.id)
            .then(
                delResult => {
                    this.challenge = null;
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

    async update() {
        return updateOne(this.myChallenge.id, this.myChallenge)
            .then(
                updateResult => {
                    return updateResult;
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


module.exports = Challenge;