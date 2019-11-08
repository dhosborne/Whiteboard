'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CalibrationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        default: ''
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
        type: String,
        default: ''
    },
    inCal: {
        type: Boolean,
        default: false,
    },
    inCalDate: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {collection: 'Calibrations'});

module.exports = mongoose.model('Calibration', CalibrationSchema)