'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const lineitemSchema = BaseRecord.discriminator('Lineitem', new Schema({
    invoiceId: String, // FK invoice
    chargeTypeId: String, // FK chargeType
    unitTypeId: String, // FK unitType
    quantity: Number,
    rate: Number,
    amountPaid: Number
}));

module.exports = mongoose.model('Lineitem', lineitemSchema);