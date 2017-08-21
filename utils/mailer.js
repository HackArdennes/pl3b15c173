const nodemailer = require('nodemailer');
const config = require('./config');

module.exports = nodemailer.createTransport({
    host: config['mailer']['smtp']['host'],
    port: config['mailer']['smtp']['port'],
    secure: config['mailer']['smtp']['is_secure'],
    auth: { user: config['mailer']['smtp']['auth_username'], pass: config['mailer']['smtp']['auth_password'] }
});
