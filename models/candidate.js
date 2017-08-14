const mongoose = require('../mongo').mongoose;

var candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('candidates', candidateSchema);
