const express = require('express');
const router = express.Router();

const creboMan = require('../controllers/creboMan');

// This route calls a controller function to insert a document
// in the crebo collection.
router.post('/', creboMan.insertOne);

module.exports = router;
