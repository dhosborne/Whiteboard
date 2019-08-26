'use strict'
const jwt = require('jsonwebtoken');
const config = require('../config/database');

exports.getToken = (headers) => {
    if(headers && headers.authorization) {
        var parsed = headers.authorization.split(' ');

        if(parsed.length === 2) {
            return parsed[1];
        } else {
            return null;
        }

    } else {
        return null;
    }
};