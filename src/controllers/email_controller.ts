import nodemailer from 'nodemailer';
require("dotenv").config();

const user = process.env.GMAIL_USER;
const password = process.env.GMAIL_PASSWORD
  
let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: password
        }
});
  
let message = {
    from: "dkubavat52@gmail.com",
    to: "dkubavat18@gmail.com",
    subject: "nothing",
    html: "<h1>hello!</h1>"
}
  
transporter.sendMail(message, function(err: any, info: any) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
})