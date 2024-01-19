const { ErrObject } = require('../../lib/error/errObject');
const { returnObject } = require('../../lib/models/returnObject');

const Uuid = require('uuid');

// updateOneReturnObject will generate a default object for database management.
// it converts the MongoDB return object to a default object.
function updateOneReturnObject(oldCreboObject, newCreboObject) {
    const newReturnObject = returnObject;

    newReturnObject.operation = "insert";
    newReturnObject.passed = true;
    newReturnObject.count = 1;
    newReturnObject.result = [newCreboObject];
    newReturnObject.before = [oldCreboObject];

    return newReturnObject;
}
exports.updateOneReturnObject = updateOneReturnObject;


// updateOneErr will generate a default error object from the type ErrObject.
// Example for calling this function.
// updateOneErr([{
//         code: "NoDbConnection",
//         message: "Error while updating the database. My cause by connection problems.",
//         detail: "Unable to save the information because of connection problems.",
//         source: "CreboMan/updateOne/updateOne/then"
//     }])
function updateOneErr(errArray) {
    const errorMessage = ErrObject;

    errorMessage.type = 503;
    errorMessage.errors = errArray;

    return errorMessage;
}
exports.updateOneErr = updateOneErr;
