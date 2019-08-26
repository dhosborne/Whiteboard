'use strict'
const Config = require('../models/uavconfig.model');
const Auth = require('./auth.controller');


exports.list = (req, res) => {
    log('Uavconfig list requested');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        Config.find({})
        .sort({tail_number: 1})
        .exec((err, configs) => {
            if (err) {
                log(err.message + '\n');
                res.json({status:500, success:false, message:err.message});
            } else {
                log('sent\n');
                res.json(configs);
            }
        });        
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }

};

exports.create = (req, res) => {
    log('Create UAVConfig request...');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth Token Found...')
        const uavconfig = new Config(req.body);
        uavconfig.save((err, config) => {
            if(err) {
                log(err.message + '\n');
                res.json({status:500, success:false, message:err.message});
            } else {
                log('sent\n');
                res.json({status:201, success:true,  message: 'Configuration Successfully Added', config});
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }

};

exports.read = (req, res) => {
    log('Uavconfig id: ' + req.params.id + ' info requested');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...')
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            Config.findById(req.params.id, (err, config) => {
                if (err) {
                    log(err.message + '\n')
                    res.json({status:500, success:false, message:err.message});
                } else {
                    log('sent\n');
                    res.json(config);           
                }
            });              
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'UAVConfig id: ' + req.params.id + ' is not a valid id'});            
        }
         
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
     
};

exports.update = (req, res) => {
    log('UAVconfig id: ' + req.params.id + ' update requested...');
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        if (mongoose.Types.ObjectId.isValid(req.params.id)){
            Config.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, result) => {
                if (err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, message:err.message});
                } else {
                    log('sent\n');
                    res.json({status:200, success:true, message: 'UAV Confg updated', result});
                }
            });
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'UAVConfig id: ' + req.params.id + ' is not a valid id'});            
        }

    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});
    }
};

exports.delete = (req, res) =>{
    log('Delete UAV Config id: ' + req.params.id + ' delete request...');
    var token = Auth.getToken(req.headers);

    if (token ) {
        log('Auth token found...');
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Config.deleteOne({_id: req.params.id}, (err, result) => {
                if (err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, message:err.message});
                } else {
                    log('sent\n');
                    res.json({status:200, success:true, message: 'UAV Configuration Deleted Successfully'});
                }
            })
        } else {
            log(err.message + '\n');
            res.json({status:400, success:false, message: 'UAVConfig id: ' + req.params.id + ' is not a valid id'});
        }        
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, message:'Unauthorized Request'});        
    }

}

function log(text) {
    process.stdout.write(text);
}