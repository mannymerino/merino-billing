'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const chargeTypeSchema = BaseRecord.discriminator('ChargeType', new Schema({
    chargeType: String
}));

module.exports = mongoose.model('ChargeType', chargeTypeSchema.schema);