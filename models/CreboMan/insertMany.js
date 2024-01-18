const CreboModel = require('./schema');
const ErrObject = require('./error');
const returnObject = require('./returnObject');

// insertMany inserts many documents into the crebo collection.
// newCreboArray is een array of Crebo objects. Each crebo object has no id.
// for each crebo document a id field (uuidv4) will be generated.
async function insertMany() {
    return CreboModel
        .find({})
        .then(
            getResult => {
                console.log(`models>CreboMan>getAll>getAll>getResult ${getResult}`);
                return deleteOneReturnObject(getResult);
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
