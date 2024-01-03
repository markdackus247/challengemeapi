const { getDb } = require('../util/database/db');


class MyChallenge {
    constructor(id, description, serialCode) {
        this.id = id;
        this.description = description;
        this.serialCode = serialCode;
    }

    save() {
        const db = getDb();
        db
            .collection('myChallenge')
            .insertOne(this)
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