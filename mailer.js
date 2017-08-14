const nodemailer = require('nodemailer');
const config = require('./config');

module.exports = nodemailer.createTransport({
    host: config['smtp_host'],
    port: config['smtp_port'],
    secure: config['smtp_is_secure'],
    auth: { user: config['smtp_auth_username'], pass: config['smtp_auth_password'] }
});
