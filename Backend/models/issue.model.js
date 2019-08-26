'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: String,
        required: true,
        default: '1970-01-01'
    },
    description: {
        type: String,
    },
    asset: {
        type: String,
    },
    createdBy: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    }

}, {collection: 'Issues'});


module.exports = mongoose.model('Issue', IssueSchema);