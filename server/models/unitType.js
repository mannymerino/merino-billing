'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const unitTypeSchema = BaseRecord.discriminator('UnitType', new Schema({
    unitType: String
}));

module.exports = mongoose.model('UnitType', unitTypeSchema.schema);