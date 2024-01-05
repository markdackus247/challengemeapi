const { getDb } = require('../util/database/db');

class MyChallenge {
    constructor(myChallenge) {
        this.myChallenge = myChallenge;
        this.db = getDb();

    }

    // The function save can be used to write the this.myChallenge object
    // to the collection 'myChallenge'.
    // Other methods can be used to manipulate the object before writing to
    // the database.
    // This function returns a promise with te result of the insert information.
    save() {
        return this.db
            .collection('myChallenge')
            .insertOne(this.myChallenge)
            .then(
                result => {
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
}

module.exports = MyChallenge;