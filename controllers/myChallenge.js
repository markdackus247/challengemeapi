const MyChallenge = require('../models/myChallenge');
const Uuid = require('uuid');

exports.getAddChallenge = (req, res, next) => {
    const id = Uuid.v4();
    const description = "Ik kan een laptop gebruiksklaar maken.";
    const serialCode = "5";

    const myChallenge = new MyChallenge(id, description, serialCode);
    myChallenge.save();

    res.json([
        {
          "id": id
        }
      ])
}