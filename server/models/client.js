'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    clientName: String,
    descriptor: String,
    primaryContact: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    zipExt: String,
    notes: String,
    payOnly: Boolean,
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
});

module.exports = mongoose.model('Client', clientSchema);