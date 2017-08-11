var applicationModel = require('../models/application');

var newApplication = new applicationModel({name: 'App1', ref: 'app1'});
newApplication.save(function(error) {
    if(error) {
        console.error('ERROR: '+error);
    } else {
        console.log('Application App1 saved!');
    }
});

var newApplication = new applicationModel({name: 'App2', ref: 'app2'});
newApplication.save(function(error) {
    if(error) {
        console.error('ERROR: '+error);
    } else {
        console.log('Application App2 saved!');
    }
});

var newApplication = new applicationModel({name: 'App3', ref: 'app3'});
newApplication.save(function(error) {
    if(error) {
        console.error('ERROR: '+error);
    } else {
        console.log('Application App3 saved!');
    }
});
