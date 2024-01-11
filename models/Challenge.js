const { getDb } = require('../util/database/db');

const Uuid = require('uuid');
const {
    insertOne,
    deleteOne,
    findById,
    updateOne
} = require('./AllChallenges');

class Challenge {
    constructor(myChallenge) {
        this.myChallenge = myChallenge;
        this.db = getDb();
        this.updateCollection = false;

    }

    // The function save can be used to write the this.myChallenge object
    // to the collection 'myChallenge'.
    // Other methods can be used to manipulate the object before writing to
    // the database.
    // This function returns a promise with te result of the insert information.
    async save() {
        if (this.updateCollection) {
            return updateOne(this.myChallenge.id, this.myChallenge)
                .then(
                    updateResult => {
                        this.updateCollection = false;
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
        else {
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

    // update method only updates the myChallenge object.
    // Only two field can be updated. The description and the serialCode field.
    // Other field will not be changed or edit.
    // the this.updateCollection variable is used by the save() function.
    update(newChallenge) {
        this.updateCollection = true;
        console.log('newChallenge.serialCode', newChallenge.serialCode);

        if (newChallenge.description){
            this.myChallenge.description = newChallenge.description;
        }

        if(newChallenge.serialCode){
            this.myChallenge.serialCode = newChallenge.serialCode;
        }
        
    }

}


module.exports = Challenge;