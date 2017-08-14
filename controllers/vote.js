function VoteController() {
    this.vote = function(req, res, next) {
        var email = req.params['email'];

        var voteModel = require('../models/vote');
        var vote = new voteModel({ email: email, candidateId: req.params['candidate_id'] });
        vote.save(function(error) {
            if(error) {
                console.error('Vote ERROR: '+error);

                return res.send(400, error);
            } else {
                console.log('Vote SUCCESS: '+vote);

                return res.send({ id: vote._id });
            }
        });
    };
}

module.exports = new VoteController();
