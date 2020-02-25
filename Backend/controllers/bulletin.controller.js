'use strict'
const Bulletin = require('../models/bulletin.model');
const mongoose = require('mongoose');
const Auth = require('./auth.controller');

exports.list = (req, res) => {
    var token = Auth.getToken(req.headers);

    if(token) {
        Bulletin.find({isActive: true})
        .sort({bulletin_number: 1})
        .exec((err, bulletins) => {
            if(err) {
                res.json({
                    status: 500,
                    success: false,
                    alert: 'danger',
                    message: err.message
                });
            } else {
                res.json(bulletins);
            }
        });
    } else {
        return res.json({
            status: 401,
            success: false,
            alert: 'danger',
            message: 'Unathorized request'
        })
    }
};

exports.listInactive = (req, res) => {
    var token = Auth.getToken(req.headers);

    if(token) {
        Bulletin.find({isActive: false})
        .sort({bulletin_number: 1})
        .exec((err, bulletins) => {
            if(err) {
                res.json({
                    status: 500,
                    success: false,
                    alert: 'danger',
                    message: err.message
                });
            } else {
                res.json(bulletins);
            }
        });
    } else {
        return res.json({
            status: 401,
            success: false,
            alert: 'danger',
            message: 'Unathorized request'
        })
    }    
}

exports.create = (req, res) => {
    var token = Auth.getToken(req.headers);

    if(token) {
        const bulletin = new Bulletin(req.body);

        bulletin.save((err, result) => {
            if(err) {
                res.json({status:500, 
                    success:false,
                    alert: 'danger',
                    message:err.message
                });    
            } else {
                res.json({
                    status: 201, 
                    success: true,
                    alert: 'success',
                    message: 'Bulletin Created', 
                    result
                });    
            }
        });
    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger',
            message:'Unauthorized Request'
        });        
    }
}

exports.read = (req, res) => {
    var token = Auth.getToken(req.headers);
    if(token) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            Bulletin.findById(req.params.id, (err, result) => {
                if(err) {
                    res.json({
                        status:500, 
                        success:false,
                        alert: 'danger',
                        message:err.message
                    });    
                } else {
                    res.json(result);
                }
            });
        } else {
            res.json({
                stats: 400,
                success: false,
                alert: 'info',
                message: 'Bulletin id: ' + req.params.id + ' is not a valid id'
            });
        }
    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger',
            message:'Unauthorized Request'
        });        
    }
}

exports.update = (req, res) => {
    var token = Auth.getToken(req.headers);

    if(token){
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Bulletin.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, result) =>{
                if (err) {
                    res.json({
                        status:500, 
                        success:false,
                        alert: 'danger', 
                        message:err.message
                    });   
                } else {
                    res.json({
                        status: 200, 
                        success:true,
                        alert: 'success',
                        message: 'Bulletin updated successfully', 
                        result});                    
                }
            });
        } else {
            res.json({
                stats: 400,
                success: false,
                alert: 'info',
                message: 'Bulletin id: ' + req.params.id + ' is not a valid id'
            });            
        }
    } else {
        res.json({
            status:401, 
            success: false,
            alert: 'danger',
            message:'Unauthorized Request'
        });
    }
}

exports.delete = (req, res) => {
    var token = Auth.getToken(req.headers);
    if (token) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)){
            Bulletin.deleteOne({_id: req.params.id}, (err, result) => {
                if (err){
                    res.json({
                        status:500, 
                        success:false,
                        alert: 'danger',
                        message:err.message});    
                } else {
                    res.json({
                        status:200, 
                        success:true,
                        alert: 'success',
                        message: 'Bulletin Deleted Successfully', result });                
                }
            });
        } else {
            res.json({
                status:500, 
                success:false, 
                alert: 'danger',
                message: req.params.id + " is not a valid id"});
        }        
    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger',
            message:'Unauthorized Request'});        
    }

}