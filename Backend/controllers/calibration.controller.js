'use strict'
const Calibration = require('../models/calibration.model');
const mongoose = require('mongoose');
const Auth = require('./auth.controller');

exports.list = (req, res) => {
    log('Calibration List Requested...');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        Calibration.find({isActive: true})
        .sort({date: -1})
        .exec((err, calibrations) => {
            if (err) {
                log(err.message + '\n');
                res.json({status:500, success:false, message:err.message});
            } else {
                log('sent\n');
                res.json(calibrations);
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
}

exports.listInactive = (req, res) => {
    log('Inactive calibrations list req...');
    var token = Auth.getToken(req.headers);
    if (token ) {
        log('Auth token found...');
        Calibration.find({isActive: false})
        .sort({date: desc})
        .exec((err, calibrations) => {
            if (err) {
                log(err.message + '\n');
                res.json({status:500, success:false, message:err.message});
            } else {
                log('sent\n');
                res.json(calibrations);
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
}

exports.create = (req, res) => {
    log('Calibration create request...');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        const cal = new Calibration(req.body);

        cal.save((err, result) => {
            if (err) {
                log(err.message + '\n');
                res.json({status:500, success:false, message:err.message});
            } else {
                log('sent\n');
                res.json({status:201, success: true, message: 'Calibration created', result});
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
}


exports.read = (req, res) => {
    log('Calibration id: ' + req.params.id + ' info req...');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            Calibration.findById(req.params.id, (err, result) => {
                if (err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, message:err.message});
                } else {
                    log('sent\n');
                    res.json(result);
                }
            });            
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'Calibration id: ' + req.params.id + ' is not a valid id'});            
        }

    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
}

exports.update = (req, res) => {
    log('Calibration id: ' + req.params.id + ' update requested...');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            Calibration.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, 
                (err, result) =>{
                    if (err) {
                        log(err.message + '\n');
                        res.json({status:500, success:false, message:err.message});
                    } else {
                        log('sent\n');
                        res.json({status:200, success: true, message: 'Calibration updated', result})
                    }
                });            
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'Calibration id: ' + req.params.id + ' is not a valid id'});            
        }

    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
}

exports.delete = (req, res) => {
    log('Delete calibration id: ' + req.params.id + 'requested...');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Calibration.deleteOne({_id: req.params.id}, (err, result) => {
                if (err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, message:err.message});
                } else {
                    log('sent\n');
                    res.json({status:200, success:true, message: 'Calibration deleted succesfully', result});
                }
            })
        } else {
            log(err.message +'\n');
            res.json({status: 500, success:false, message: req.params.id + ' is not a valid id'});
        }
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
}
function log(text) {
    process.stdout.write(text);
}