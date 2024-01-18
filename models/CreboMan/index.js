// index.js is a collection of all functions to manage the CreboMan.
// All functions are seperated in different files for readability improvement.
exports.insertOne = require('./insertOne').insertOne;
exports.insertMany = require('./insertMany').insertMany;
exports.getOne = require('./getOne').getOne;
exports.getAll = require('./getAll').getAll;
exports.updateOne = require('./updateOne').updateOne;
exports.deleteOne = require('./deleteOne').deleteOne;
exports.deleteAll = require('./deleteAll').deleteAll;


//TODO: functions insertMany, updateOne, deleteOne, deleteAll