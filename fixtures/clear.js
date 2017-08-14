var config = require('../config.json');
var fixtures = require('pow-mongodb-fixtures').connect(config['mongo_test']);

fixtures.clear(function() {
    console.log('Fixtures cleared');
    process.exit(0);
});
