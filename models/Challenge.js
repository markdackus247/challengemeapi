const { getDb } = require('../util/database/db');

const Uuid = require('uuid');
const {
        getNewSerialCode
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
    save(callback) {
        if (!this.myChallenge.id) {
            this.myChallenge.id = Uuid.v4();
        }

        getNewSerialCode(
            (newSerialCode) => {
                this.myChallenge.serialCode = newSerialCode;

                this.db
                    .collection('myChallenge')
                    .insertOne(this.myChallenge)
                    .then(
                        result => {
                            callback(result);
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

    // This get() method returns the object informatie of the challenge (this.myChallenge).
    get() {
        return this.myChallenge;
    }



}


module.exports = Challenge;