'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    projectId: String, // FK project
    statusId: String, // FK status
    invoiceDate: Date,
    notes: String,
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
});

module.exports = mongoose.model('Invoice', invoiceSchema);