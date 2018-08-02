'use strict';

module.exports = require('mongoose').model('BaseRecord', new Schema({
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: String
}, {descriminatorKey: 'kind'}));