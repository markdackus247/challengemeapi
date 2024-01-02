const mongodb = require('mongodb');
const { connect } = require('../../routes');
const MongoClient = mongodb.MongoClient;

const dbName = "challengemeapi";
const dbUsername = "challengemeapi";
const dbPassword = "iXyO3Vo5oCfmKHjCYNHbxLJaO7xUlMVk";
const dbHost = "localhost";
const dbPort = "27017";

const mongoConnect = (callback) => {

    // default: mongodb://localhost:27017
    // db.createUser( { user: "challengemeapi", pwd: "iXyO3Vo5oCfmKHjCYNHbxLJaO7xUlMVk", roles: ["dbAdmin"] });
    // connectionString = `mongodb://${dbUsername}:${dbPassword}@${dbHost}/${dbName}`;
    connectionString = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/?authSource=${dbName}`
    console.log(connectionString);

    MongoClient
    .connect(
        connectionString
    )
    .then(
        client => {
            console.log(`DB ${dbName} is connected with user ${dbUsername}`);
            callback(client);
        }
    )
    .catch(
        err => console.log(err)
    )

}

module.exports = mongoConnect;


