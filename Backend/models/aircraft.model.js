'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AircraftSchema = new Schema ({
    tailNumber: {
        type: String,
        required: true
    },
    reconDate: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {collection: 'Aircrafts'});

module.exports = mongoose.model('Aircraft', AircraftSchema);