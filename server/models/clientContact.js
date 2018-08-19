'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientContactSchema = new Schema({
    clientId: String, // FK client
    contactTypeId: String, // FK contactType
    contactValue: String,
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
});

module.exports = mongoose.model('ClientContact', clientContactSchema);