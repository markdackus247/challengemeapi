// CreboDbReturnObject is the schema of the returning object after the operations.
// The returning object has always the same structure.
// Each operation (insert, update, delete and find) has its own function to translate the
// result from MongoDb to a default result.
const returnObject = {
    operation: null,    // Type string, example "insert", "delete", "update", "get"
    passed: null,       // Type boolean, example true if the operation sucseeded.
    count: null,        // Type integer, example 3 -> 3 operations sucseeded.
    result: [{}],       // Type CreboObject, an array of CreboObjects with the updated information.
    before: [{}]        // Type CreboObject, an array of CreboObjects with the information before updating.
}

exports.returnObject = returnObject;