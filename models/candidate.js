const mongoose = require('../mongo').mongoose;

var candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    votes: [require('../models/vote').schema]
});

candidateSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('candidates', candidateSchema);
