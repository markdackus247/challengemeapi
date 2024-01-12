const express = require('express');
const router = express.Router();

const { 
    insertOne 
} = require('../controllers/creboMan');

// This route calls a controller function to insert a document
// in the crebo collection.
router.post('/', insertOne);

module.exports = router;
