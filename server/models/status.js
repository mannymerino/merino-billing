'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    status: String,
    default: Boolean,
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
});

module.exports = mongoose.model('Status', statusSchema);