'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const statusSchema = BaseRecord.discriminator('Status', new Schema({
    status: String
}));

module.exports = mongoose.model('Status', statusSchema);