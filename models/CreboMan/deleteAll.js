const CreboModel = require('./schema');

const { ErrObject } = require('../../lib/error/errObject');
const { returnObject } = require('../../lib/models/returnObject');

// deleteAll deletes all documents from the crebo collection.
// VERY RISKY METHOD: shut only be used by administrators.
async function deleteAll() {
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
exports.deleteAll = deleteAll;
