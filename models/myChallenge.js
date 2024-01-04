const { getDb } = require('../util/database/db');

class MyChallenge {
    constructor(myChallenge) {
        this.myChallenge = myChallenge;
        this.db = getDb();

    }

    save() {
        this.db
            .collection('myChallenge')
            .insertOne(this.myChallenge)
            .then(
                result => {
                    console.log('result', result);
                }
            )
            .catch(
                err => {
                    console.log(err);
                    throw err;
                }
            );

    }
}

module.exports = MyChallenge;