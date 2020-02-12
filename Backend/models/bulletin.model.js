'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BulletinSchema = new Schema({
    bulletin_number: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date_created: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    }
}, {collection: 'Bulletins'});

module.exports = mongoose.model('Bulletin', BulletinSchema);