const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Auth = require('./auth.controller')


/**
 * Admin functions
 */
exports.list = (req, res) => {
    User.find({})
    .sort({username: 1})
    .exec((err, users) => {
        if (err) {
            res.json({ status: 401, success: false, alert: 'danger', alert: 'danger', message:'Could not retrieve user list'});
        } else {
            res.json({status:200, success: false, alert: 'success', users});
        }
    });
}

exports.getUser = (req, res) => {
    log('User details for id: ' + req.params.id + ' requested...');
    var token = Auth.getToken(req.headers);
    if (token) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            User.findById({_id: req.params.id}, (err, user) => {
                if(err) {
                    res.json({status:404, success: false, alert: 'danger', message:'User does not exist'});
                } else {
                    res.json({user});
                }
            });            
        } else {
            log('Id: ' + req.params.id + ' invalid\n');
            res.json({status:400,success:false, message:'User id: ' + req.params.id + ' is invalid\n'});
        }

    } else {
        log('Unauthorized Request Denied\n');
        return res.json({status:401, success: false, alert: 'danger', message:'Unauthorized Request'});        
    }

}

exports.createUser = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({success:400, success: false, alert: 'danger', message: 'Please check username or password!'});
    } else {
        var newUser = new User(req.body);
        newUser.save((err) => {
            if (err) {
                return res.json({status: 409, success: false, alert: 'danger', message: 'Username already exists'});
            } else {
                res.json({success: false, alert: 'success', message: 'User creation successful'});
            }
        });
    }    
}

exports.deleteUser = (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        User.deleteOne({_id: req.params.id}, (err, result) =>{
            if (err) {req
                res.send(err);
            } else {
                res.json({status: 200, success: false, alert: 'danger', message: 'User Deleted Succesfully'});
            }
        });
    } else {
        res.status(401).send({success: false, alert: 'danger', message:'No user with id ' + req.params.id + ' was found'});
    }
}

/**
 * User functions
 */
exports.signUp = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, alert: 'danger', message: 'Please check username or password!'});
    } else {
        const newUser = new User(req.body);
        newUser.save((err) => {
            if (err) {
                console.log(err);
                return res.json({status:200, success: false, alert: 'danger', message: 'Username already exists'});
            } else {
                res.json({success: false, alert: 'success', message: 'User creation successful'});
            }
        });
    }
};

exports.update = (req, res) => {
    var token = Auth.getToken(req.headers);
    if(token) {
        User.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, result) => {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(result);
                res.json({status:200, success: false, alert: 'success', message: 'User updated successfully', result});
            }
        });
    } else {
        res.status(403).send({success: false, alert: 'danger', message: 'Unauthorized request'});
    }
}

exports.passwordChange = (req, res) => {
    log('User ' + req.body.email + ' password change requested');
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            log(err.message + '\n');
        } else {
            if (!user) {
                res.json({status:401, alert:'info', message:'no user with supplied email!'});
            } else {
                user.comparePassword(req.body.oldPass, (err, isMatch) => {
                    if(isMatch && !err) {
                        user.password = req.body.newPass;
                        user.save({}, (err, result) => {
                            if (err) {
                                res.json({status:500, success:false, alert:'danger', message:err.message})
                            } else {
                                res.json({status:201, success:true, alert:'success', message:'Password change successful'});
                            }
                        });
                    } else {
                        res.json({status: 401, success:false, alert:'danger', message:'please check your old password`'});
                    }
                });
            }
        }
    });
}

exports.login = (req, res) => {
    log('User \"' + req.body.username + '\" logging in...' );
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            log(err.message + '\n');
        } else {
            if (!user) {
                res.status(401).send({success: false, alert: 'danger', 
                    message: 'Authentication failed, username incorrect'});
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        var token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: '1d' // expires in 1 day
                        });
                        log('success! ');
                        payload = {id: user.id, 'username': user.username, 'firstName': user.firstName, 'lastName': user.lastName};
                        res.json({success: false, alert: 'success', token: 'JWT ' + token, user: payload}); 
                    } else {
                        res.status(401).send({success: false, alert: 'danger', 
                            message:'Authentication failed, password incorrect'})
                    }
                });
            }            
        }
    });
}

function log(text) {
    process.stdout.write(text);
}