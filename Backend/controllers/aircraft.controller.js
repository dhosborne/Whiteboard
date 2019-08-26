'use strict'
const Aircraft = require('../models/aircraft.model');
const mongoose = require('mongoose');
const Auth = require('./auth.controller');

exports.listActive = (req, res) => {
    log('Aircraft List Requested...');
    var token = Auth.getToken(req.headers);
    if (token ) {
        log('Auth token found...')
        Aircraft.find({isActive: true})
        .sort({tailNumber: 1})
        .exec((err, aircrafts) => {
            if (err) {
                log(err.message + '\n');
                res.json({status:500, success:false, message:err.message});
            } else {
                log('sent\n');
                res.json(aircrafts);
            }
        });        
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
};

exports.listInactive = (req, res) => {
    log('Aircraft List Requested...');
    var token = Auth.getToken(req.headers);
    if (token ) {
        log('Auth token found...')
        Aircraft.find({isActive: false})
        .sort({tailNumber: 1})
        .exec((err, aircrafts) => {
            if (err) {
                log(err.message + '\n');
                res.json({status:500, success:false, message:err.message});
            } else {
                log('sent\n');
                res.json(aircrafts);
            }
        });        
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
};

exports.create = (req, res) => {
    log('Create Aircraft Request...');

    var token = Auth.getToken(req.headers);

    if (token) {
        log('Auth Token Found...');
        
        const aircraft = new Aircraft(req.body);
        
        aircraft.save((err, result) => {
            if(err) {
                log(err.message + '\n');
                res.json({status:500, success:false, message:err.message});
            } else {
                log('sent\n');
                res.json({status: 201, success: true, message: 'Aircraft Created', result});
            }
        });            
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }


};

exports.read = (req, res) => {
    log('Aircraft id: ' + req.params.id + ' info requested...');
    var token = Auth.getToken(req.headers);
    if(token) {
        log('Auth token found...')
        if ( mongoose.Types.ObjectId.isValid(req.params.id)){
            Aircraft.findById(req.params.id, (err, result) => {
                if(err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, message:err.message});
                } else {
                    log('sent\n')
                    res.json(result);
                }
            });  
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'Aircraft id: ' + req.params.id + ' is not a valid id'});            
        }
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }

};

exports.update = (req, res) => {
    log('Aircraft id: ' + req.params.id + ' update requested...');

    var token = Auth.getToken(req.headers);

    if (token) {
        log('Auth token found...');
 
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Aircraft.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, result) => {
                if(err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, message:err.message});
                } else {
                    log('sent\n')
                    res.json({status: 200, success:true, message: 'Aircraft updated successfully', result});
                }
            });     
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'Aircraft id: ' + req.params.id + ' is not a valid id'});            
        }
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }

};

exports.delete = (req, res) => {
    log('Delete aircraft id: ' + req.params.id + ' requested...');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            Aircraft.deleteOne({_id: req.params.id}, (err, result) => {
                if (err) {
                    log(err.message + '\n')
                    res.json({status:500, success:false, message:err.message});
                } else {
                    log('sent\n');
                    res.json({status:200, success:true, message: 'Aircraft Deleted Successfully', result });
                }
            });        
        } else{
            log('id invalid\n')
            res.json({status:500, success:false, message: req.params.id + " is not a valid id"});
        }        
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
};

function log(text) {
    process.stdout.write(text);
}