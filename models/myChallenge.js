const mongoConnect = require('./util/database/db');

let db;

mongoConnect((client) => {
    console.log('App.js connected to the DB');
    db = client;
})

let myDB = db.db("challengemeapi");
let myColl = myDB.collection("colors");

try {
   const docs = [
      { "_id": 1, "color": "red"},
      { "_id": 2, "color": "purple"},
      { "_id": 1, "color": "yellow"},
      { "_id": 3, "color": "blue"}
   ];

   let ids;

   myColl
    .insertMany(docs)
    .then(
        result => {
            ids = result.insertedIds;
            console.log(`${result.insertedCount} documents were inserted.`);
            for (let id of Object.values(ids)) {
                console.log(`Inserted a document with id ${id}`);
             }
        }
    )
    .catch(
        err => console.log(err)
    )

//    const insertManyresult = await myColl.insertMany(docs);
//    let ids = insertManyresult.insertedIds;
//    console.log(`${insertManyresult.insertedCount} documents were inserted.`);
//    for (let id of Object.values(ids)) {
//       console.log(`Inserted a document with id ${id}`);
//    }
} catch(e) {
   console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
   let ids = e.result.result.insertedIds;
   for (let id of Object.values(ids)) {
      console.log(`Processed a document with id ${id._id}`);
   }
   console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
}
