const config = require('./config');
const restify = require('restify');

const server = restify.createServer({
    name: config['server']['name']
});
server.use(restify.plugins.bodyParser({ mapParams: true }));

var candidateController = require('./controllers/candidate');

server.get({ path: '/candidates', name: 'candidate_list' }, candidateController.list);
server.post({ path: '/candidates/:candidate_id/votes', name: 'candidate_add_vote' }, candidateController.addVote);
server.put({ path: '/candidates/:candidate_id/votes/:vote_id', name: 'candidate_confirm_vote' }, candidateController.confirmVote);
server.get({ path: '/result', name: 'get' }, require('./controllers/result').get);

server.listen(config['server']['port'], function() {
    console.log('pl3b15c173 API server listening on port number', config['server']['port']);
});
