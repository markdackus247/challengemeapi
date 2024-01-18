const CreboModel = require('./schema');
const ErrObject = require('./error');
const returnObject = require('./returnObject');

// getOneReturnObject generates a object with all the document in it.
// The documents are an array of objects this will be stored in the
// returnObject.result.
function getOneReturnObject(getOneAbjectArray) {
    const newReturnObject = returnObject;

    newReturnObject.operation = "select";
    newReturnObject.passed = true;
    newReturnObject.count = getOneAbjectArray.length;
    newReturnObject.result = getOneAbjectArray;
    newReturnObject.before = [];

    return newReturnObject;
}

// getOne fetches one document from the crebo collection.
// creboId will be used to fetch the document with the request id.
// The MongDB _id field will not be used. Each crebo document has its own id field.
async function getOne(creboId) {
    return CreboModel
        .findOne({id: creboId})
        .then(
            getResult => {
                // console.log(`models>CreboMan>getOne>getOne>getResult ${getResult}`);
                return getOneReturnObject([getResult]);
            }
        )
        .catch(
            err => {
                console.log(`models>CreboMan>getOne>getOne>catch>err ${err}`);
                // TODO error handling.
            }
        )
}
exports.getOne = getOne;