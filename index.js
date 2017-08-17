const config = require('./config');
const restify = require('restify');

const server = restify.createServer({
    name: config['server']['name']
});
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.get({ path: '/candidates', name: 'candidate_list' }, require('./controllers/candidate').list);
server.post({ path: '/candidates/:candidate_id/votes', name: 'vote_create' }, require('./controllers/vote').create);
server.put({ path: '/candidates/:candidate_id/votes/:vote_id', name: 'vote_confirm' }, require('./controllers/vote').confirm);

server.listen(config['server']['port'], function() {
    console.log('pl3b15c173 API server listening on port number', config['server']['port']);
});
