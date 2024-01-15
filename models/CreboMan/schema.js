const { UUID } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
    }
})

// CreboObject is the schema of the crebo document.
// This object will be used to manage database operations.
const CreboObject = {
    id: null,           // Type UUIDv4
    code: null,         // Type string, example "25606"
    level: null,        // Type string, example "4" stands for "MBO niveau 4"
    name: null,         // Type string, example "expert IT systems and devices"
    description: null,  // Type string, official description of the crebo.
    sbblink: null,      // Type string, example "https://kwalificatie-mijn.s-bb.nl/kwalificatie/expert-it-systems-and-devices/cmVzdWx0YWF0VHlwZT01O2Rvc3NpZXJJZD01MTMwO2t3YWxpZmljYXRpZUlkPTEzMjE0NzY="
    kdpdflink: null     // Type string, example "https://kwalificatie-mijn.s-bb.nl/Details/DownloadDocument/1402198"
}

module.exports = CreboObject;