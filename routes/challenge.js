const express = require('express');
const router = express.Router();

const { 
        postAddChallenge,
        getChallenge,
        deleteChallenge,
        updateChallenge
    } = require('../controllers/challenge');

// POST route for /myChallenge
// example payload: { "description": "Ik een nieuwe mobiele telefoon gebruikersklaar maken en de oude gegevens mee overzetten." }
router.post('/', postAddChallenge);

// Get all information of one challenge given by the challenge id.
// Example JSON body
// {
//     "id": "cbf01c76-5eed-4be6-90d7-9802910b9513"
// }
router.get('/:id', getChallenge);

// Delete route for deleting a challenge from the collection.
router.delete('/:id', deleteChallenge);

// Update the information of the challenge if the Challenge is saved.
router.put('/:id', updateChallenge);

module.exports = router;
