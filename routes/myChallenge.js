const express = require('express');
const router = express.Router();

const { getAddChallenge } = require('../controllers/myChallenge');

/* GET home page. */
router.get('/', getAddChallenge);

module.exports = router;
