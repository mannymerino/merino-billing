'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const invoiceSchema = BaseRecord.discriminator('Invoice', new Schema({
    projectId: String, // FK project
    statusId: String, // FK status
    invoiceDate: Date,
    notes: String
}));

module.exports = mongoose.model('Invoice', invoiceSchema.schema);