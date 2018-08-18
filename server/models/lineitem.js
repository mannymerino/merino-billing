'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineitemSchema = new Schema({
    invoiceId: String, // FK invoice
    chargeTypeId: String, // FK chargeType
    unitTypeId: String, // FK unitType
    quantity: { type: Number, default: 1 },
    rate: Number,
    amountPaid: Number,
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
});

module.exports = mongoose.model('Lineitem', lineitemSchema);