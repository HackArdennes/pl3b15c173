var config = require('../config.json');
var fixtures = require('pow-mongodb-fixtures').connect(config['mongo']['uri']);

fixtures.clear(function() {
    console.log('Fixtures cleared');
    process.exit(0);
});
