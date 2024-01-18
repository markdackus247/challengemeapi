const express = require('express');
const router = express.Router();

const creboMan = require('../controllers/creboMan');

// POST /creboman
// Router for inserting one new education.
router.post('/', creboMan.insertOne);

// GET /creboman/:id
// Router for fetching one document of the educations.
router.get('/:id', creboMan.getOne);

// GET /creboman
// Router for fetching all documents of the eductions.
router.get('/', creboMan.getAll);

// PUT /creboman
// Router for updateting one document of the education.
router.put('/:id', creboMan.updateOne);

module.exports = router;
