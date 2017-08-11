const mongoose = require('../mongo').mongoose;

var applicationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ref: {
        type: String,
        required: true,
        unique: true
    }
});

var applicationModel = mongoose.model('applications', applicationSchema);

applicationSchema.path('ref').validate(function(value) {
    return new Promise(function(resolve){
        applicationModel.count({ref: value}, function(err, count) {
            if (err) {
                return reject(err);
            }

            resolve(count == 0);
        });
    });

}, 'Email already exists');

module.exports = applicationModel;
