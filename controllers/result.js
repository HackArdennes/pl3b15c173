function ResultController() {
    this.get = function(req, res, next) {
        require('../models/candidate')
            .aggregate()
            .unwind({ path: '$votes', preserveNullAndEmptyArrays: true })
            .project({ name: '$name', description: '$description', isConfirmed: { $cond: [ { $eq: ['$votes.isConfirmed', true] }, 1, 0 ] }, exist: { $cond: [ { $gt: ['$votes', 0] }, 1, 0 ] }, points: { $cond: [ { $gt: ['$votes', 0] }, { $cond: [ { $eq: ['$votes.isConfirmed', true] }, 10, 1 ] }, 0 ] } })
            .group({ _id: '$_id', name: { '$first': '$name' }, description: { '$first': '$description' }, nbVotes: { $sum: '$exist' }, nbConfirmedVotes: { $sum: '$isConfirmed' }, score: { $sum: '$points' } })
            .project({_id: 0, id: '$_id', name: '$name', description: '$description', nbVotes: '$nbVotes', nbConfirmedVotes: '$nbConfirmedVotes', score: '$score' })
            .sort({ score: 'desc' })
            .exec(function(err, result) {
                if (err) {
                    console.error('ERROR: unable to get result: '+err);

                    return res.send(500);
                }

                console.log('Get result');

                return res.send(200, result);
            })
        ;
    };
}

module.exports = new ResultController();
