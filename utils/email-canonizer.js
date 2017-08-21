module.exports = function(email) {
    var parts = email.split('@');

    return parts[0].replace(/\.|\+.*/g, '')+'@'+parts[1];
};
