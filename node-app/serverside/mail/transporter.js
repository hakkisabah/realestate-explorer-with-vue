nodemailer = require('nodemailer')
// dotenv required for .env.local file
const dotenv = require('dotenv').config({ path: '.env.local' })

const mailAccountInfo = {
    maxMessage:1000,
    host: process.env.NODE_ENV ==='DEVELOPMENT'?process.env.MAIL_SMTPHOST_DEVELOPMENT:process.env.MAIL_SMTPHOST_PRODUCTION,
    port: process.env.NODE_ENV ==='DEVELOPMENT'?process.env.MAIL_SMTPPORT_DEVELOPMENT:process.env.MAIL_SMTPPORT_PRODUCTION,
    secure: false,
    auth: {
        user: process.env.NODE_ENV ==='DEVELOPMENT'?process.env.MAIL_SMTPUSER_DEVELOPMENT:process.env.MAIL_SMTPUSER_PRODUCTION,
        pass: process.env.NODE_ENV ==='DEVELOPMENT'?process.env.MAIL_SMTPPASS_DEVELOPMENT:process.env.MAIL_SMTPPASS_PRODUCTION,
    }
}

let mailer = function () {

}

function mailTemplate(employeerMail,employeerId){
    let serverAddress = process.env.NODE_ENV ==='DEVELOPMENT'?process.env.PUBLIC_ADDRESS_DEVELOPMENT:process.env.PUBLIC_ADDRESS_PRODUCTION
    return  {
        from: mailAccountInfo.auth.user+ " <"+mailAccountInfo.auth.user+">",
        to: employeerMail, // optional : its line might have one more mail address
        subject: "estate login information",
        html: 'Estate Account : \n' + '<a href ="'+serverAddress + 'register/' + employeerId +'">Click for register your id </a> \n' + 'or copy this link => ' + serverAddress + 'register/' + employeerId
    }
}

// function createTransport() {
//     return new Promise(async function (resolve, reject) {
//         let transporter = await accountCreator();
//         transporter.verify(async function (error, success) {
//             if (error) {
//                 return resolve({error:"smtp account error",result:false})
//             } else if (success) {
//                 console.log("Mail Connected Successfully");
//             }
//         });
//
//     })
// }

mailer.prototype.send = async function(emailAddress,payload){
    return new Promise(async function (resolve, reject) {
        let transporter = nodemailer.createTransport(mailAccountInfo);
        await transporter.sendMail(mailTemplate(emailAddress,payload), function (error, info) {
            if (error) return resolve({error:'email was not sended !',result:info})
            if (info.accepted.length > info.rejected.length){
                return resolve({success:'employeer id sent !',result:info})
            }else{
                return resolve({error:'email was not sended !',result:info})
            }
        });
    })
}

module.exports = new mailer()