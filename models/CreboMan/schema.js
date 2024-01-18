const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const {UUID, String} = Schema.Types;

const Uuid = require('uuid');


const WerkprocesSchema = new Schema({
    id: {
        type: UUID,
        unique: true,
        required: true,
        default: Uuid.v4()
    },
    code: {
        type: String,
        required: true,
    },    
    name: {
        type: String,
        required: true,
    },
    informalName: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    outcome: {
        type: String,
        required: false,
    },
    behaviour: {
        type: String,
        required: false,
    },      
},
{
    timestamps: true
}
);


const kerntaakSchema = new Schema({
    id: {
        type: UUID,
        unique: true,
        required: true,
        default: Uuid.v4()
    },
    code: {
        type: String,
        required: true,
    },    
    part: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    informalName: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    werkprocessen: [WerkprocesSchema]
},
{
    timestamps: true
})

const CreboSchema = new Schema({
    id: {
        type: UUID,
        unique: true,
        required: true,
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
    },
    fileCode: {
        type: String,
        required: false
    },
    kerntaken: [kerntaakSchema]
},
{
    collection: 'Crebo',
    timestamps: true
});
const CreboModel = mongoose.model('CreboModel', CreboSchema);

// console.log(`models>CreboMan>schema.js>at CreboModel ${CreboModel}`);
module.exports = CreboModel;
