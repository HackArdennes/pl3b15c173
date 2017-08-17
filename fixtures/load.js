var config = require('../config.json');
var fixtures = require('pow-mongodb-fixtures').connect(config['mongo']['uri']);

fixtures.load('./data', function() {
    console.log('Fixtures loaded');
    process.exit(0);
});
