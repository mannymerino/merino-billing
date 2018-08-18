'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitTypeSchema = new Schema({
    typeName: String,
    default: Boolean,
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
});

module.exports = mongoose.model('UnitType', unitTypeSchema);