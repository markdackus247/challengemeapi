const express = require('express');
const router = express.Router();

const { 
    getAllMyChallenges 
} = require('../controllers/allMyChallenges');

// POST route for /myChallenge
// example payload: { "description": "Ik een nieuwe mobiele telefoon gebruikersklaar maken en de oude gegevens mee overzetten." }
router.get('/', getAllMyChallenges);

module.exports = router;
