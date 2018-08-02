'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const clientContactSchema = BaseRecord.discriminator('ClientContact', new Schema({
    clientId: String, // FK client
    contactTypeId: String, // FK contactType
    contactValue: String
}));

module.exports = mongoose.model('ClientContact', clientContactSchema);