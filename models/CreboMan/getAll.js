const CreboModel = require('./schema');

const { ErrObject } = require('../../lib/error/errObject');
const { returnObject } = require('../../lib/models/returnObject');

// getAllReturnObject generates a object with all the document in it.
// The documents are an array of objects this will be stored in the
// returnObject.result.
function getAllReturnObject(getAllAbjectArray) {
    const newReturnObject = returnObject;

    newReturnObject.operation = "insert";
    newReturnObject.passed = true;
    newReturnObject.count = getAllAbjectArray.length;
    newReturnObject.result = getAllAbjectArray;
    newReturnObject.before = [];

    return newReturnObject;
}

// getAll fetches all documents from the Crebo collection.
// it converts the result to the default return object.
async function getAll() {
    return CreboModel
        .find({})
        .then(
            getResult => {
                console.log(`models>CreboMan>getAll>getAll>getResult ${getResult}`);
                return getAllReturnObject(getResult);
            }
        )
        .catch(
            err => {
                console.log(`models>CreboMan>getAll>getAll>catch>err ${err}`);
                // TODO error handling.
            }
        )
}
exports.getAll = getAll;
