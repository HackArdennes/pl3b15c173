const crypto = require('crypto');
const mongoose = require('../mongo').mongoose;

var voteSchema = new mongoose.Schema({
    email: { type: String, required: true },
    candidateId: { type: String, required: true },
    isConfirmed: { type: Boolean, required: 0, default: 0 },
    token: { type: String, default: crypto.randomBytes(16).toString('hex') }
});

var voteModel = mongoose.model('votes', voteSchema);

voteSchema.path('email').validate(function() {
    var vote = this;
    return new Promise(function(resolve) {
        voteModel.count({ email: vote.email, candidateId: vote.candidateId }, function(err, count) {
            if (err) {
                console.error('Vote email validation error: '+err);
            }

            resolve(count == 0);
        });
    });

}, 'Vote already exists');

voteSchema.path('candidateId').validate(function(value) {
    return new Promise(function(resolve) {
        require('./candidate').count({ _id: mongoose.Types.ObjectId(value) }, function(err, count) {
            if (err) {
                console.error('Vote candidateID validation error: '+err);

                return resolve(false);
            }

            resolve(count == 1);
        });
    });

}, 'Candidate does not exist');

module.exports = voteModel;
