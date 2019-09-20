'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CalibrationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String
    },
    date: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    inCal: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {collection: 'Calibrations'});

module.exports = mongoose.model('Calibration', CalibrationSchema)