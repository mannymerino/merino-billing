'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const projectSchema = BaseRecord.discriminator('Project', new Schema({
    clientId: String, // FK client
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    referenceNumber: String,
    notes: String
}));

module.exports = mongoose.model('Project', projectSchema);