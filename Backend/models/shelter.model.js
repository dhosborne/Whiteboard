'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShelterSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    _7Day:{
        type: String
    },
    _28Day:{
        type: String
    },
    _84Day:{
        type: String
    },
    _168Day:{
        type: String
    },
    airFilters:{
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    bulletins: [Schema.Types.Mixed]
}, {collection: 'Shelters'});

module.exports = mongoose.model('Shelter', ShelterSchema);