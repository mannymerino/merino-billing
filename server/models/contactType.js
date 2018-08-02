'use strict';

const mongoose = require('mongoose');
const BaseRecord = require('./baseRecord');
const Schema = mongoose.Schema;

const contactTypeSchema = BaseRecord.discriminator('ContactType', new Schema({
    name: String
}));

module.exports = mongoose.model('ContactType', contactTypeSchema.schema);