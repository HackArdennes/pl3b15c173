var config = require('../config.json');
var fixtures = require('pow-mongodb-fixtures').connect(config['mongo_test_uri']);

fixtures.clear(function() {
    console.log('Fixtures cleared');
    process.exit(0);
});
