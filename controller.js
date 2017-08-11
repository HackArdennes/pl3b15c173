function Controller() {
    // Rate an application
    this.rateApplication = function(req, res, next) {
        // Retrieve params
        var applicationRef = req.params['application_ref'];
        var email = req.params['email'];
        var rating = req.params['rating'];

        // Save rating
        var ratingModel = require('./models/rating');

        var newRating = new ratingModel({email: email, applicationRef: applicationRef, rating: rating});
        newRating.save(function(error) {
            if(error) {
                console.error('RATING APPLICATION ERROR: '+error);

                return res.send(400, error);
            } else {
                console.log('RATING APPLICATION SUCCESS: '+newRating);

                return res.send('RATING APPLICATION SUCCESS');
            }
        });
    };

    // List applications
    this.listApplications = function(req, res, next) {
        require('./models/application').find({}, 'name ref -_id', function(err, result) {
            console.log('LIST APPLICATIONS SUCCESS');

            res.send(result);
        });
    };
}

module.exports = new Controller();
