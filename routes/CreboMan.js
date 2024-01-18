const express = require('express');
const router = express.Router();

const creboMan = require('../controllers/creboMan');

// POST /creboman
// Router for inserting one new education.
router.post('/', creboMan.insertOne);

// GET /creboman
// Router for fetching all documents of the eductions.
router.get('/', creboMan.getAll);

module.exports = router;
