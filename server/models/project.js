'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    clientId: String, // FK client
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    referenceNumber: String,
    notes: String,
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
});

module.exports = mongoose.model('Project', projectSchema);