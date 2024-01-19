const { returnObject } = require('./returnObject');
const { ErrObject } = require('../error/errObject');

// insertOneErr will generate a default error object from the type ErrObject.
// Example for calling this function.
// insertOneErr([{
//         code: "NoDbConnection",
//         detail: "Unable to save the information because of connection problems.",
//         source: "AllCrebos/insertOne"
//     }])
function insertOneErr(errArray) {
    const errorMessage = ErrObject;

    errorMessage.type = 503;
    errorMessage.errors = errArray;

    return errorMessage;
}
exports.insertOneErr = insertOneErr;


// insertOnenewReturnObject will generate a default object for database management.
// it converts the MongoDB return object to a default object.
function insertOneReturnObject(newCreboObjectArray) {
    const newReturnObject = returnObject;

    newReturnObject.operation = "insert";
    newReturnObject.passed = true;
    newReturnObject.count = newCreboObjectArray.length;
    newReturnObject.result = newCreboObjectArray;
    newReturnObject.before = [];

    return newReturnObject;
}
exports.insertOneReturnObject = insertOneReturnObject;