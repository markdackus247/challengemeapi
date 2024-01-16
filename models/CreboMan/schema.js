const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const {UUID, String} = Schema.Types;

const CreboSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    id: {
        type: UUID,
        unique: true,
        required: true,
        immutable: true
    },
    code: {
        type: String,
        required: true,
    },    
    level: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    sbblink: {
        type: String,
        required: false,
    },
    kdpdflink: {
        type: String,
        required: false,
    }
});
const CreboModel = mongoose.model('Crebo', CreboSchema);
module.exports = CreboModel;

// CreboObject is the schema of the crebo document.
// This object will be used to manage database operations.
const CreboObject = {
    id: null,           // Type UUIDv4
    code: null,         // Type String, example "25606"
    level: null,        // Type String, example "4" stands for "MBO niveau 4"
    name: null,         // Type String, example "expert IT systems and devices"
    description: null,  // Type String, official description of the crebo.
    sbblink: null,      // Type String, example "https://kwalificatie-mijn.s-bb.nl/kwalificatie/expert-it-systems-and-devices/cmVzdWx0YWF0VHlwZT01O2Rvc3NpZXJJZD01MTMwO2t3YWxpZmljYXRpZUlkPTEzMjE0NzY="
    kdpdflink: null     // Type String, example "https://kwalificatie-mijn.s-bb.nl/Details/DownloadDocument/1402198"
}

module.exports = CreboObject;