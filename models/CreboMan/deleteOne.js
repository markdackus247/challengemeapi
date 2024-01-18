const CreboModel = require('./schema');
const ErrObject = require('./error');
const returnObject = require('./returnObject');

// getAllReturnObject generates a object with all the document in it.
// The documents are an array of objects this will be stored in the
// returnObject.result.
function deleteOneReturnObject(deleteObjectArray) {
    const newReturnObject = returnObject;

    newReturnObject.operation = "delete";
    newReturnObject.passed = true;
    newReturnObject.count = deleteObjectArray.length;
    newReturnObject.result = deleteObjectArray;
    newReturnObject.before = [];

    return newReturnObject;
}

// deleteOne deletes one document from the crebo collection.
// creboId will be used to delete the document with the given id.
// The MongoDB _id field will not be used. Each crebo document has its own id field.
async function deleteOne() {
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
exports.deleteOne = deleteOne;
