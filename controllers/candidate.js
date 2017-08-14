function CandidateController() {
    this.list = function(req, res, next) {
        require('../models/candidate').find({}, function(err, result) {
            console.log('LIST CANDIDATES SUCCESS');

            res.send(result);
        });
    };
}

module.exports = new CandidateController();
