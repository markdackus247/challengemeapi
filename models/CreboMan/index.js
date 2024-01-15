InsertOne  = require('./insertOne');

module.exports = InsertOne;

// updateOne updates one crebo document from the crebo collection.
// updatedCrebo parameter is a object with all the updated crebo information. The id
// is also present in the updatedcrebo object.
async function updateOne(updatedCrebo) {

}
exports.updateOne = updateOne;


// getOne fetches one document from the crebo collection.
// creboId will be used to fetch the document with the request id.
// The MongDB _id field will not be used. Each crebo document has its own id field.
async function getOne(creboId) {

}
exports.getOne = getOne;


// deleteOne deletes one document from the crebo collection.
// creboId will be used to delete the document with the given id.
// The MongoDB _id field will not be used. Each crebo document has its own id field.
async function deleteOne(creboId) {

}
exports.deleteOne = deleteOne;


// insertMany inserts many documents into the crebo collection.
// newCreboArray is een array of Crebo objects. Each crebo object has no id.
// for each crebo document a id field (uuidv4) will be generated.
async function insertMany(newCreboArray) {

}
exports.insertMany = insertMany;


// getAll fetches all documents from the crebo collection.
async function getAll() {

}
exports.getAll = getAll;


// deleteAll deletes all documents from the crebo collection.
// VERY RISKY METHOD: shut only be used by administrators.
async function deleteAll() {

}
exports.deleteAll = deleteAll;