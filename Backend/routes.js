'use strict'
const passport = require('passport');

module.exports = (app) => {

    // Aircraft routes
    const Aircraft = require('./controllers/aircraft.controller');
    app.route('/aircraft')
        .get(Aircraft.listActive, passport.authenticate('jwt', {session: false}))
        .post(Aircraft.create, passport.authenticate('jwt', {session: false}));

    app.route('/aircraft/inactive')
        .get(Aircraft.listInactive, passport.authenticate('jwt', {session: false}));

    app.route('/aircraft/:id')
        .get(Aircraft.read, passport.authenticate('jwt', {session: false}))
        .patch(Aircraft.update, passport.authenticate('jwt', {session: false}))
        .delete(Aircraft.delete, passport.authenticate('jwt', {session: false}));
    
    // Bulletin routes
    const Bulletin = require('./controllers/bulletin.controller');
    app.route('/bulletin')
        .get(Bulletin.list, passport.authenticate('jwt', {session: false}))
        .post(Bulletin.create, passport.authenticate('jwt', {session: false}));

    app.route('/bulletin/inactive')
        .get(Bulletin.listInactive, passport.authenticate('jwt', {session:false}));
        
    app.route('/bulletin/:id')
        .get(Bulletin.read, passport.authenticate('jwt', {session:false}))
        .patch(Bulletin.update, passport.authenticate('jwt', {session:false}))
        .delete(Bulletin.delete, passport.authenticate('jwt', {session:false}));

    // Shelter Routes
    const Shelter = require('./controllers/shelter.controller');
    app.route('/shelter')
        .get(Shelter.listActive, passport.authenticate('jwt', {session: false}))
        .post(Shelter.create, passport.authenticate('jwt', {session: false}));
    
    app.route('/shelter/inactive')
        .get(Shelter.listInactive, passport.authenticate('jwt', {session: false}));

    app.route('/shelter/:id')
        .get(Shelter.read, passport.authenticate('jwt', {session: false}))
        .patch(Shelter.update, passport.authenticate('jwt', {session: false}))
        .delete(Shelter.delete, passport.authenticate('jwt', {session: false}));

    // Issue routes
    const Issue = require('./controllers/issue.controller');
    app.route('/issue')
        .get(Issue.list, passport.authenticate('jwt', {session: false}))
        .post(Issue.create, passport.authenticate('jwt', {session: false}));

    app.route('/issue/group/')
        .get(Issue.group, passport.authenticate('jwt', {session: false}));

    app.route('/issue/:id')
        .get(Issue.read, passport.authenticate('jwt', {session: false}))
        .patch(Issue.update, passport.authenticate('jwt', {session: false}))
        .delete(Issue.delete, passport.authenticate('jwt', {session: false}));


    const Calibration = require ('./controllers/calibration.controller.js');
    app.route('/calibration')
        .get(Calibration.list, passport.authenticate('jwt', {session: false}))
        .post(Calibration.create, passport.authenticate('jwt', {session: false}));
    
    app.route('/calibration/inactive')
        .get(Calibration.listInactive, passport.authenticate('jwt', {session: false}));
    
    app.route('/calibration/:id')
        .get(Calibration.read, passport.authenticate('jwt', {session: false}))
        .patch(Calibration.update, passport.authenticate('jwt', {session: false}))
        .delete(Calibration.delete, passport.authenticate('jwt', {session: false}));
    

    const UavConfig = require('./controllers/uavconfig.controller')
    app.route('/uavconfig')
        .post(UavConfig.createConfig, passport.authenticate('jwt', {session: false}));
    
    app.route('/uavconfig/:id')
        .get(UavConfig.getConfig, passport.authenticate('jwt', {session: false}))
        .patch(UavConfig.update, passport.authenticate('jwt', {session: false}))
        .delete(UavConfig.delete, passport.authenticate('jwt', {session: false}));

    // Auth control routes
    const User = require('./controllers/user.controller');
    // user functions
    app.route('/login')
        .post(User.login);
    
    app.route('/passwordchange')
        .post(User.passwordChange);

    app.route('/signup')
        .post(User.signUp)
        .patch(User.update);
    
    app.route('/account/:id')
        .get(User.getUser, passport.authenticate('jwt', {session: false}))
        .patch(User.update, passport.authenticate('jwt', {session: false}));


    // Admin functions
    app.route('/users')
        .get(User.list)
        .post(User.createUser);
    app.route('/users/adminPasswordChange')
        .post(User.adminPasswordChange);

    app.route('/users/:id')
        .get(User.getUser)
        .patch(User.update)
        .delete(User.deleteUser);
};