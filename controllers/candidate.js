function CandidateController() {
    this.list = function(req, res, next) {
        require('../models/candidate').find({}, '-votes', function(err, result) {
            console.log('List candidates');

            res.send(result);
        });
    };

    this.addVote = function(req, res, next) {
        var server = this;

        // Retrieve params
        var candidateId = req.params['candidate_id'];
        var email = req.params['email'];

        // Check candidate resource
        var candidateModel = require('../models/candidate');
        candidateModel.findOne({ '_id': candidateId }, function(err, candidate) {
            if (err) {
                console.error('ERROR: unable to get candidate: '+err);

                return res.send(500);
            }

            if (null === candidate) {
                console.log('Candidate '+candidateId+' not found');

                return res.send(404, { error: 'Candidate not found' });
            }

            // Check existing vote for email
            var canonicalEmail = require('../utils/email-canonizer')(email);
            candidateModel.findOne({ _id: candidateId, 'votes.canonicalEmail': canonicalEmail }, '_id', function(err, candidateWithVote) {
                if (err) {
                    console.error('ERROR: unable to get canonical email for candidate: '+err);

                    return res.send(500);
                }

                if (null !== candidateWithVote) {
                    console.log('Canonical email '+canonicalEmail+' found for '+candidateId);

                    return res.send(400, { error: 'Vote already exists' });
                }

                // Save vote
                var voteModel = require('../models/vote');
                var vote = new voteModel({ email: req.params['email'], canonicalEmail: canonicalEmail });
                candidate.votes.push(vote);
                candidate.save(function (err) {
                    if (err) {
                        console.log('Invalid vote: '+err);

                        return res.send(400, { error: 'Invalid vote', detail: err });
                    }

                    // Send confirmation email
                    var url = server.url+server.router.render('candidate_confirm_vote', { candidate_id: vote.candidateId, vote_id: vote._id })

                    const config = require('../config');
                    var email = {
                        from: config['mailer']['default_sender_email'],
                        to: vote.email,
                        subject: config['emails']['vote_confirmation']['subject'],
                        text: config['emails']['vote_confirmation']['text_body'].replace('%link%', url),
                        html: config['emails']['vote_confirmation']['html_body'].replace('%link%', url)
                    };

                    require('../mailer').sendMail(email, function(err, info) {
                        if (err) {
                            return console.log('ERROR: unable to send confirmation email: '+err);
                        }
                    });

                    console.log('Vote created: '+vote._id);

                    return res.send(201, { id: vote._id });
                });
            });
        });
    };

    this.confirmVote = function(req, res, next) {
        var voteId = req.params['vote_id'];
        var candidateId = req.params['candidate_id'];
        var token = req.params['token'];

        // Check candidate and vote
        var candidateModel = require('../models/candidate');
        candidateModel.findOne({ '_id': candidateId }, function(err, candidate) {
            if (err) {
                console.error('ERROR: unable to get candidate: ' + err);

                return res.send(500);
            }

            if (null === candidate) {
                console.log('Candidate '+candidateId+' not found');

                return res.send(404, {error: 'Candidate not found'});
            }

            var vote = candidate.votes.id(voteId);
            if (null === vote) {
                console.log('Vote '+voteId+' not found for candidate '+candidateId);

                return res.send(404, {error: 'Vote not found'});
            }

            // Already confirmed?
            if (vote.isConfirmed == true) {
                console.log('Vote '+voteId+' already confirmed for candidate '+candidateId);

                return res.send(400, { error: 'Vote already confirmed' });
            }

            // Is token valid?
            if (token !== vote.token) {
                console.log('Invalid token '+token+' for vote '+voteId+' and candidate '+candidateId);

                return res.send(400, { error: 'Invalid token' });
            }

            vote.isConfirmed = true;
            candidate.save(function(err) {
                if (err) {
                    console.log('ERROR: unable to confirm vote: '+err);

                    return res.send(500);
                }

                console.log('Vote '+voteId+' confirmed');

                return res.send(200);
            });
        });
    }
};

module.exports = new CandidateController();
