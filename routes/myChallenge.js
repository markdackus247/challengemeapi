const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json([
    {
      "id": "4d3d925d-3826-42d0-8342-f397697cc3bc"
    }
  ])
});

module.exports = router;
