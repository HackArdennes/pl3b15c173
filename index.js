const config = require('./config');
const restify = require('restify');

const server = restify.createServer({
    name: config['api_server_name']
});
server.use(restify.plugins.bodyParser());

server.get('/candidates', require('./controllers/candidate').list);
server.post('/candidates/:candidate_id/votes', require('./controllers/vote').create);
server.put('/candidates/:candidate_id/votes/:vote_id', require('./controllers/vote').confirm);

server.listen(config['api_server_port'], function() {
    console.log('pl3b15c173 API server listening on port number', config['api_server_port']);
});
