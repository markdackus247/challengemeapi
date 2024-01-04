const express = require('express');
const router = express.Router();

const { 
    postAddMyChallenge 
} = require('../controllers/myChallenge');

// POST route for /myChallenge
// example payload: { "description": "Ik een nieuwe mobiele telefoon gebruikersklaar maken en de oude gegevens mee overzetten." }
router.post('/', postAddMyChallenge);

module.exports = router;
