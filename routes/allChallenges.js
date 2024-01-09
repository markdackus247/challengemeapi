const express = require('express');
const router = express.Router();

const { 
    getAllChallenges,
    postManyChallenges,
    deleteAllChallenges 
} = require('../controllers/allChallenges');

// This GET route can be used to retrieve an json array with all the challenges of the user.
// example payload: { "description": "Ik een nieuwe mobiele telefoon gebruikersklaar maken en de oude gegevens mee overzetten." }
router.get('/', getAllChallenges);

// This POST route can be used to insert more challenges into the database.
// It is a array of challenge objects.
router.post('/', postManyChallenges);

// This DELETE route is used to delete all the challenges of the student.
// It shut never been used in the production environment.
router.delete('/', deleteAllChallenges);

module.exports = router;
