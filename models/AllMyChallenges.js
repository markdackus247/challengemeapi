const getDb = require('../util/database/db').getDb;

const MyChallenge = require('./MyChallenge');

class AllMyChallenges {
    constructor() {
        this.db = getDb();
        this.challenges = [];
    }

    // This function gets the latest used serialCode and adds one to it.
    // Its starts counting on 1.
    // Its uses a call back function so other actions can be nested in it.
    // But is also returns the new serialCode.
    getNewSerialCode(callback) {
        let newSerialCode;

        return this.db
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
                    console.log(newSerialCode);
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
    fetchAll() {
        return this.db
            .collection('myChallenge')
            .find()
            .toArray()
            .then(challenges => {
                for (let challenge of challenges) {
                    let myChallenge = new MyChallenge(challenge);
                    this.challenges.push(myChallenge);
                }
                // console.log('this.challenges:', this.challenges);
                return challenges;
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    }
}

module.exports = AllMyChallenges