'use strict'
const Issue = require('../models/issue.model');
const mongoose = require('mongoose');
const Auth = require('./auth.controller');

exports.list = (req, res) => {
    log('Issue list requested...');
    var token = Auth.getToken(req.headers);
    
    if(token) {
        log('Auth token found...');
        Issue.find({})
        .sort({date: 1})
        .exec((err, issues) => {
            if (err) {
                log(err.message + '\n')
                res.json({status:500, success:false, alert: 'danger', message:err.message});
            } else {
                log('sent\n')
                res.json(issues);
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status: 403, success: false, alert:'danger', message:'Unauthorized Request'});
    }
};

exports.group = (req, res) =>{
    log('Issue group for id: ' + req.query.asset + ' requested...' );
    var token = Auth.getToken(req.headers);
    if (token) {
        log('Auth token found...');
        Issue.find({asset: req.query.asset}, (err, group) => {
            if(err) {
                log(err.message + '\n');
                res.json({status:500, success:false, alert: 'danger', message:err.message});
            } else {
                log('sent\n');
                res.json(group);
            }
        })        
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status: 403, success: false, alert:'danger', message:'Unauthorized Request'});
    }

}

exports.create = (req, res) => {
    log('Create Issue Request...');
    var token = Auth.getToken(req.headers);
    if(token) {
        log('Auth token found...');
        const issue = new Issue(req.body);

        issue.save((err, result) => {
            if(err) {
                log(err.message + '\n')
                res.json({status:500, success:false, alert: 'danger', message:err.message});
            } else {
                log('sent\n')
                res.json({stats:200, success:true, alert: 'success', 
                    message: 'Issue Created', result});
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status: 403, success: false, alert:'danger', message:'Unauthorized Request'});
    }
};

exports.read = (req, res) => {
    log('Issue id: ' + req.params.id + ' info requested...');
    var token = Auth.getToken(req.headers);
    if(token) {
        log('Auth token found...');
        Issue.findById(req.params.id, (err, issue) => {
            if(err) {
                log(err.message + '\n');
                res.json({status:500, success:false, alert: 'danger', message:err.message});
            } else {
                log('sent\n');
                res.json(issue);
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status: 403, success: false, alert:'danger', message:'Unauthorized Request'});
    }   
};

exports.update = (req, res) => {
    log('Issue id: ' + req.params.id + ' update requested...');

    var token = Auth.getToken(req.headers);

    if(token) {
        log('Auth token found...');
        Issue.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, result) => {
            if(err) {
                log(err.message + '\n');
                res.json({status:500, success:false, alert: 'danger', message:err.message});
            } else {
                log('sent\n');
                res.json({status: 200, success:true, alert: 'success', message: 'Issue Updated', result});
            }
        });
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status: 403, success: false, alert:'danger', message:'Unauthorized Request'});    
    }
};

exports.delete = (req, res) => {
    log('Delete Issue id: ' + req.params.id + ' requested...');
    var token = Auth.getToken(req.headers);
    if(token){
        log('Auth token found...');
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            Issue.deleteOne({_id: req.params.id}, (err, result) => {
                if (err) {
                    log(err.message + '\n');
                    res.json({status:500, success:false, alert: 'danger', message:err.message});
                } else {
                    log('Issue id: ' + req.params.id + ' deleted\n')
                    res.json({ status:200, success: true, alert: 'success', 
                            message:'Issue Deleted', result})
                }
            })
        } else {
            log('id invalid\n')
            res.json({status:500, success:false, alert: 'danger',
                        message: req.params.id + ' is not valid id'
                    });
        }
    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status: 403, success: false, alert:'danger', message:'Unauthorized Request'});
    }
}

function log(text) {
    process.stdout.write(text);
}