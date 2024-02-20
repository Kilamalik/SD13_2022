const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service  : "gmail", 
    auth : {
        user : "testreceiver234@gmail.com", 
        pass: 'mnipaqffxyahpqav'
    }
})
//create function to send email by nodemailer

module.exports = transporter 