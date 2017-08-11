const config = require('./config');
const controller = require('./controller');
const restify = require('restify');

const server = restify.createServer({
    name: config['api_server_name']
});
server.use(restify.plugins.bodyParser());

server.post('/applications/:application_ref/vote', controller.rateApplication);
server.get('/applications', controller.listApplications);

server.listen(config['api_server_port'], function() {
    console.log('pl3b15c173 API server listening on port number', config['api_server_port']);
});
