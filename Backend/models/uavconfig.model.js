'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UAVConfigSchema = new Schema({
    asset: {
        type: String,
        unique: true,
    },
    electrical: {type: String},
    transponder: {type: String},
    transpondermodel: {type: String},
    eoir: {type: String},
    radartype: {type: String},
    network: {type: String},
    rftray: {type: String},
    videoencodertype: {type: String},
    audiomixer: {type: String},
    arc210: {type: String},
    lostlink: {type: String},
    saa: {type: String},
    tcas: {type: String},
    airtoair: {type: String},
    dualarc210: {type: String},
    enc1hd: {type: String},
    priblos: {type: String},
    secblos: {type: String},
    laseralt: {type: String},
    wspm: {type: String},
    ais: {type: String},
    harvester: {type: String},
    cbanddiplex: {type: String},    
},
{collection: 'UAV_Configurations'});

module.exports = mongoose.model('UAVConfig', UAVConfigSchema);