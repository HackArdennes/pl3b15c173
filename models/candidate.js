const mongoose = require('../mongo').mongoose;

var candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

candidateSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('candidates', candidateSchema);
