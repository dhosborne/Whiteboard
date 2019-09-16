'use strict'
const Shelter = require('../models/shelter.model');
const mongoose = require('mongoose');
const Auth = require('./auth.controller');

exports.listActive = (req, res) => {
    log('Shelter list requested...');
    var token = Auth.getToken(req.headers);
    
    if(token) {
        log('Auth token found...');
        Shelter.find({isActive: true})
        .sort({name: 1})
        .exec((err, shelters) => {
            if (err) {
                log(err.message + '\n')
                res.json({status:500, success:false, alert: 'danger', message:err.message});
            } else {
                log('sent\n')
                res.json(shelters);
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, alert: 'danger', message:'Unauthorized Request'});
    }
};
exports.listInactive = (req, res) => {
    log('Shelter list requested...');
    var token = Auth.getToken(req.headers);
    
    if(token) {
        log('Auth token found...');
        Shelter.find({isActive: false})
        .sort({name: 1})
        .exec((err, shelters) => {
            if (err) {
                log(err.message + '\n')
                res.json({status:500, success:false, alert: 'danger', message:err.message});
            } else {
                log('sent\n')
                res.json(shelters);
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, alert: 'danger', message:'Unauthorized Request'});
    }
};

exports.create = (req, res) => {
    log('Create Shelter Request...');
    var token = Auth.getToken(req.headers);
    if(token) {
        log('Auth token found...');
        const shelter = new Shelter(req.body);

        shelter.save((err, result) => {
            if(err) {
                log(err.message + '\n')
                rres.json({status:500, success:false, alert: 'danger', message:err.message});
            } else {
                log('sent\n')
                res.json({status:201, success:true,  alert: 'success',
                    message: 'Shelter Created', result});
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, alert: 'danger', message:'Unauthorized Request'});
    }
};

exports.read = (req, res) => {
    log('Shelter id: ' + req.params.id + ' info requested...');
    var token = Auth.getToken(req.headers);
    if(token) {
        log('Auth token found...');
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            Shelter.findById(req.params.id, (err, shelter) => {
                if(err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, alert: 'danger', message:err.message});
                } else {
                    log('sent\n');
                    res.json(shelter);
                }
            });
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'Shelter id: ' + req.params.id + ' is not a valid id'});
        }

    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, alert: 'danger', message:'Unauthorized Request'});
    }   
};

exports.update = (req, res) => {
    log('Shelter id: ' + req.params.id + ' update requested...');

    var token = Auth.getToken(req.headers);

    if(token) {
        log('Auth token found...');
        if(mongoose.Types.ObjectId.isValid(req.params.id))
        {
            Shelter.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, result) => {
                if(err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, alert: 'danger', message:err.message});
                } else {
                    log('sent\n');
                    res.json({status: 200,success:true, alert: 'success', message: 'Shelter Updated', result});
                }
            });
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'Shelter id: ' + req.params.id + ' is not a valid id'});
        }

    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, alert: 'danger', message:'Unauthorized Request'});
    }
};

exports.delete = (req, res) => {
    log('Delete shelter id: ' + req.params.id + ' requested...');
    var token = Auth.getToken(req.headers);
    if(token){
        log('Auth token found...');
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            Shelter.deleteOne({_id: req.params.id}, (err, result) => {
                if (err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, alert: 'danger', message:err.message});
                } else {
                    log('Shelter id: ' + req.params.id + ' deleted\n')
                    res.json({status:200, success: true, alert: 'success',
                            message:'Shelter Deleted', result})
                }
            })
        } else {
            log(err.message +'\n');
            res.json({status:400, success:false, alert: 'danger',
                        message: req.params.id + ' is not valid id'
                    });
        }
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, alert: 'danger', message:'Unauthorized Request'});
    }
}

function log(text) {
    process.stdout.write(text);
}