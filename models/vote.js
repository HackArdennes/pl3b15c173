const crypto = require('crypto');
const mongoose = require('../mongo').mongoose;

var voteSchema = new mongoose.Schema({
    email: { type: String, required: true },
    candidateId: { type: String, required: true },
    isConfirmed: { type: Boolean, required: 0, default: 0 },
    token: { type: String, default: crypto.randomBytes(16).toString('hex') }
});

voteSchema.pre('validate', function(next) {
    if (!this.email.match(/gmail.com$/i)) {
        return next();
    }

    var parts = this.email.split('@');
    if (parts.length !== 2) {
        return next();
    }

    this.email = parts[0].replace(/\.|\+/g, '')+'@'+parts[1];

    return next();
});

var voteModel = mongoose.model('votes', voteSchema);

voteSchema.path('email').validate(function() {
    if (!this.isNew) {
        return true;
    }

    var vote = this;
    return new Promise(function(resolve) {
        voteModel.count({ email: vote.email, candidateId: vote.candidateId }, function(err, count) {
            if (err) {
                console.error('Vote email validation error: '+err);
            }

            return resolve(count == 0);
        });
    });

}, 'Vote already exists');

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

voteSchema.path('candidateId').validate(function(value) {
    return new Promise(function(resolve) {
        require('./candidate').count({ _id: mongoose.Types.ObjectId(value) }, function(err, count) {
            if (err) {
                console.error('Vote candidateID validation error: '+err);

                return resolve(false);
            }

            return resolve(count == 1);
        });
    });

}, 'Candidate does not exist');

module.exports = voteModel;
