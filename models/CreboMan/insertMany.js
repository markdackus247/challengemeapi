const CreboModel = require('./schema');

const { insertOneErr, insertOneReturnObject } = require('../../lib/models/insertOne');


// insertMany inserts many documents into the crebo collection.
// newCreboArray is een array of Crebo objects. Each crebo object has no id.
// for each crebo document a id field (uuidv4) will be generated.
async function insertMany() {
    return CreboModel
        .find({})
        .then(
            getResult => {
                console.log(`models>CreboMan>getAll>getAll>getResult ${getResult}`);
                return insertOneReturnObject(getResult);
            }
        )
        .catch(
            err => {
                console.log(`models>CreboMan>getAll>getAll>catch>err ${err}`);
                // TODO error handling.
            }
        )
}
exports.insertMany = insertMany;
