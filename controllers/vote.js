function VoteController() {
    this.create = function(req, res, next) {
        var server = this;
        var voteModel = require('../models/vote');
        var vote = new voteModel({ email: req.params['email'], candidateId: req.params['candidate_id'] });
        vote.save(function(err) {
            if(err) {
                console.log('CREATE VOTE ERROR: '+err);

                return res.send(400, err);
            } else {
                var url = server.url+server.router.render('vote_confirm', { candidate_id: vote.candidateId, vote_id: vote._id })

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
                        return console.log('SEND VOTE CONFIRMATION EMAIL ERROR:'+err);
                    }
                });

                console.log('CREATE VOTE SUCCESS: '+vote);

                return res.send(201, { id: vote._id });
            }
        });
    };

    this.confirm = function(req, res, next) {
        const mongoose = require('../mongo').mongoose;

        var voteModel = require('../models/vote');
        voteModel.findOne(
            { _id: mongoose.Types.ObjectId(req.params['vote_id']), candidateId: req.params['candidate_id'] },
            function(err, vote) {
                var msgParams = 'candidateId='+req.params['candidate_id']+' & voteId='+req.params['vote_id'];
                if (err) {
                    console.error('GET VOTE ERROR '+msgParams+': '+err);

                    return res.send(500);
                }

                if (null === vote) {
                    console.log('CONFIRM VOTE ERROR '+msgParams+': vote does not exist');

                    return res.send(400, { name: 'ConfirmationError', message: 'Vote does not exists' });
                }

                var token = req.params['token'];
                if (token !== vote.token) {
                    console.log('CONFIRM VOTE ERROR '+msgParams+': invalid token "'+token+'"');

                    return res.send(400, { name: 'ConfirmationError', message: 'Invalid token' });
                }

                if (vote.isConfirmed == true) {
                    console.log('CONFIRM VOTE ERROR '+msgParams+': already confirmed');

                    return res.send(400, { name: 'ConfirmationError', message: 'Vote already confirmed' });
                }

                vote.isConfirmed = true;
                vote.save(function(err) {
                    if(err) {
                        console.log('CONFIRM VOTE ERROR: '+err);

                        return res.send(400, err);
                    } else {
                        console.log('CONFIRM VOTE SUCCESS: '+vote);

                        return res.send(200, 'OK');
                    }
                });
            }
        );
    }
}

module.exports = new VoteController();
