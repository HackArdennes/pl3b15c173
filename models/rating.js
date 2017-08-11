const mongoose = require('../mongo').mongoose;

var ratingSchema = new mongoose.Schema({
    email: {type: String, required: true},
    applicationRef: {type: String, required: true},
    rating: {type: Number, required: true, min: 1, max: 5},
    isConfirmed: {type: Boolean, required: 0, default: 0}
});

var ratingModel = mongoose.model('ratings', ratingSchema);

ratingSchema.path('email').validate(function() {
    var rating = this;
    return new Promise(function(resolve) {
        ratingModel.count({email: rating.email, applicationRef: rating.applicationRef}, function(err, count) {
            if (err) {
                return reject(err);
            }

            resolve(count == 0);
        });
    });

}, 'Rating already exists');

ratingSchema.path('applicationRef').validate(function(value) {
    return new Promise(function(resolve) {
        require('./application').count({ref: value}, function(err, count) {
            if (err) {
                return reject(err);
            }

            resolve(count > 0);
        });
    });

}, 'Application does not exist');

module.exports = ratingModel;
