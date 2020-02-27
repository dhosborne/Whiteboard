'use strict'
const UAVConfig = require('../models/uavconfig.model');
const Auth = require('./auth.controller');
const mongoose = require('mongoose');

exports.getConfig = (req, res) => {
    var token = Auth.getToken(req.headers);
    if(token) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            UAVConfig.findOne({belongsTo: req.params.id}, (err, results) =>{
                if(err) {
                    return err(res, err.message);
                } else {
                    return success(res, '', results);
                }
            });
        }
    } else {
        return unauthorized(res);
    }
};

exports.createConfig = (req, res) => {
    var token = Auth.getToken(req.headers);
    if(token) {
        if(mongoose.Types.ObjectId.isValid(req.body.belongsTo)) {
            const config = new UAVConfig(req.body);
            config.save((err, results) => {
                if(err){
                    return failure(res, err.message);
                } else {
                    return success(res, 'UAV Configuration saved', results);
                }
            })
        } else {
            return failure(res, 'BelongsTo is missing or is not a valid MongooseId')
        }
    } else {
        return unauthorized(res);
    }
};

exports.update = (req, res) => {
    var token = Auth.getToken(req.headers);
    if(token){
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            UAVConfig.findOneAndUpdate({belongsTo: mongoose.Types.ObjectId(req.body.belongsTo)}, {$set: req.body}, (err, results) => {
                if(err) {
                    return failure(res, err.message);
                } else {
                    return success(res, 'UAV Configuration updated', results);
                }
            });
        } else {
            return failure(res, 'UAV Configuration id is missing or invalid');
        }
    } else {
        return unauthorized(res);
    }
};

exports.delete = (req, res) => {
    var token = Auth.getToken(req.headers);

    if(token){
        if(mongoose.Types.ObjectId.isValid(req.body.belongsTo)){
            UAVConfig.deleteOne({belongsTo: mongoose.ObjectId(req.body.belongsTo)}, (err, results) => {
                if(err) {
                    return failure(res, err.message)
                } else {
                    return success(res, 'UAV Configuration deleted', results);
                }
            });
        } else {
            return failure(res, 'UAV Configuration Id is invalid');
        }
    } else {
        return unauthorized(res);
    }
};

function unauthorized(res) {
    return res.json({
        status: 401,
        success: false,
        alert: 'danger',
        message: 'Unathorized Request: token missing'
    });
}

function failure(res, message) {
    return res.json({
        status: 500,
        success: false,
        alert: 'info',
        message: message
    });
}

function success(res, messages, results){
    return res.json({
        status: 200,
        success: true,
        alert: 'success',
        message: messages,
        results: results
    })
}