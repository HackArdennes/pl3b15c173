const mongoose = require('../utils/mongo').mongoose;

var voteSchema = new mongoose.Schema({
    email: { type: String, required: true },
    canonicalEmail: { type: String, required: true },
    isConfirmed: { type: Boolean, required: true, default: false },
    token: { type: String }
});

voteSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

voteSchema.path('email').validate(function(value) {
    return new Promise(function(resolve) {
        const config = require('../config');
        var isValid = require('isemail').validate(value, config['emails']['validator_options']);
        if (!isValid) {
            resolve(false);
        }

        const lodash = require('lodash');
        var parts = value.split('@');
        var domains = parts[1].split('.');
        lodash.forEach(domains, function(domain) {
            if (lodash.includes(config['domain_blacklist'], domain)) {
                resolve(false);
            }
        });

        resolve(true);
    });

}, 'Email address is invalid');

module.exports = mongoose.model('votes', voteSchema);
