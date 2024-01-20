const { returnObject } = require('./returnObject');
const { ErrObject } = require('../error/errObject');
const { toBroker } = require('../../util/broker/rabbitmq')

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


// insertOneToBroker sends the object to the message broker.
// it converts the given newCreboObject to a string.
async function insertOneToBroker(newCreboObject) {
    toBroker(newCreboObject)
        .then(
            () => {
                // console.log(`lib>models>insertOne>insertOneToBroker>then`)
            }
        )
        .catch(
            err => {
                console.log(err);
                throw err;
            }
        )
}
exports.insertOneToBroker = insertOneToBroker;