'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const clientSchema = BaseRecord.discriminator('Client', new Schema({
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
    payOnly: Boolean
}));

module.exports = mongoose.model('Client', clientSchema.schema);