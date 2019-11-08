'use strict'
const Calibration = require('../models/calibration.model');
const mongoose = require('mongoose');
const Auth = require('./auth.controller');

exports.list = (req, res) => {
    var token = Auth.getToken(req.headers);
    if (token) {
        Calibration.find({isActive: true})
        .sort({date: -1})
        .exec((err, calibrations) => {
            if (err) {
                res.json({
                    status:500, 
                    success:false, 
                    alert: 'danger', 
                    message:err.message});
            } else {
                res.json(calibrations);
            }
        });
    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger', 
            message:'Unauthorized Request'});
    }
}

exports.listInactive = (req, res) => {
    var token = Auth.getToken(req.headers);
    if (token ) {
        Calibration.find({isActive: false})
        .sort({date: desc})
        .exec((err, calibrations) => {
            if (err) {
                res.json({
                    status:500, 
                    success:false,
                    alert: 'danger', 
                    message:err.message});
            } else {
                res.json({
                    status: 200,
                    success: true, 
                    calibrations,
                });
            }
        });
    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger', 
            message:'Unauthorized Request'});
    }
}

exports.create = (req, res) => {
    var token = Auth.getToken(req.headers);
    if (token) {
        const cal = new Calibration(req.body);
        cal.save((err, result) => {
            if (err) {
                res.json({
                    status:500, 
                    success:false,
                    alert: 'danger',
                    message:err.message});
            } else {
                res.json({
                    status:201, 
                    success: true,
                    alert: 'success',
                    message: 'Calibration created', 
                    result});
            }
        });
    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger',
            message:'Unauthorized Request'});
    }
}


exports.read = (req, res) => {
    var token = Auth.getToken(req.headers);
    if (token) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            Calibration.findById(req.params.id, (err, result) => {
                if (err) {
                    res.json({
                        status:500, 
                        success:false,
                        alert: 'danger',
                        message:err.message});
                } else {
                    res.json(result);
                }
            });            
        } else {
            res.json({
                status:400, 
                success:false,
                alert: 'danger',
                message: 'Calibration id: ' + req.params.id + ' is not a valid id'});            
        }

    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger',
            message:'Unauthorized Request'});
    }
}

exports.update = (req, res) => {
    var token = Auth.getToken(req.headers);
    if (token) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            Calibration.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, 
                (err, result) =>{
                    if (err) {
                        res.json({
                            status:500, 
                            success:false,
                            alert: 'danger',
                            message:err.message});
                    } else {
                        res.json({
                            status:200, 
                            success: true,
                            alert: 'success',
                            message: 'Calibration updated', result})
                    }
                });            
        } else {
            res.json({
                status:400, 
                success:false,
                alert: 'danger',
                message: 'Calibration id: ' + req.params.id + ' is not a valid id'});            
        }

    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger',
            message:'Unauthorized Request'});
    }
}

exports.delete = (req, res) => {
    var token = Auth.getToken(req.headers);
    if (token) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Calibration.deleteOne({_id: req.params.id}, (err, result) => {
                if (err) {
                    res.json({
                        status:500, 
                        success:false,
                        alert: 'danger',
                        message:err.message
                    });
                } else {
                    res.json({
                        status:200, 
                        success:true,
                        alert: 'success', 
                        message: 'Calibration deleted succesfully', 
                        result});
                }
            })
        } else {
            res.json({
                status: 500, 
                success:false,
                alert: 'danger',
                message: req.params.id + ' is not a valid id'});
        }
    } else {
        return res.json({
            status:401, 
            success: false,
            alert: 'danger',
            message:'Unauthorized Request'});
    }
}