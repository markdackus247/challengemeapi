const { getDb } = require('../util/database/db');

class MyChallenges {
    constructor() {

        this.db = getDb();
    }

    getNewSerialCode(callback) {
        this.db
            .collection
            .find({}, (err, result) => {
                if (err) throw err;
                console.log(result);
                return result
            })
            .then(
                challenges => {
                    callback(challenges);
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

module.exports = MyChallenges