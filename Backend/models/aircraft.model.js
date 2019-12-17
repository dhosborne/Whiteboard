'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AircraftSchema = new Schema ({
    tailNumber: {
        type: String,
        required: true,
        unique: true
    },
    reconDate: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdOn: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: true
    },
    updatedOn: {
        type: String,
        required: true
    }
}, {collection: 'Aircrafts'});

module.exports = mongoose.model('Aircraft', AircraftSchema);