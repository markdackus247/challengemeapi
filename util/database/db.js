const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Replace the values for connection to the database by the environment variables.
// This user has dbAdmin writes on the challengemeapi dababase.
// NOTE: The use of 'localhost' by the dbHost variable did not work because
// the systems refers to the ipv6 ip address ::1. MongoDB is not listening on IPv6.
const dbName = "challengemeapi";
const dbUsername = "challengemeapi";
const dbPassword = "iXyO3Vo5oCfmKHjCYNHbxLJaO7xUlMVk";
const dbHost = "127.0.0.1";     
const dbPort = "27017";

// This function connects to the mongoDB connection service.
// This function accepts a function as callback function.
// The connect() method of the MongoClient is a async function and returns a promis.
// This promis is send back by the callback function.
const mongoConnect = (callback) => {

    connectionString = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/?authSource=${dbName}`
    console.log(connectionString);

    MongoClient
        .connect(
            connectionString
        )
        .then(
            client => {
                // console.log(`DB ${dbName} is connected with user ${dbUsername}`);
                callback(client);
            }
        )
        .catch(
            err => console.log(err)
        )

}

module.exports = mongoConnect;


