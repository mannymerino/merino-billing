'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = require('mongoose').model('BaseRecord', new Schema({
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
}, {descriminatorKey: 'kind'}));