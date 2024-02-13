const nodemailer = require('nodemailer');

const sendEmail = async function (destination, message, subject) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SENDER_EMAIL, // generated ethereal user
            pass: process.env.SENDER_PASSWORD // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: destination, // list of receivers
        subject: subject, // Subject line
        // text: 'Email Confirmation', // plain text body
        html: message, // html body
    });
};

module.exports = {sendEmail};