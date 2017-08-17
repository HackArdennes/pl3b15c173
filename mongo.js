const mongoose = require('mongoose');
const config = require('./config');

// Set promise to native ES6 promise
mongoose.Promise = global.Promise;

var connectionPromise = mongoose.connect(config['mongo']['uri'], {
    useMongoClient: true,
    keepAlive: true
});

connectionPromise
    .then(function(){
        console.log('MongoDB connected successfully')
    })
    .catch(function(onRejection) {
        console.error(onRejection);
        process.exit(1);
    });

module.exports.mongoose = mongoose;
