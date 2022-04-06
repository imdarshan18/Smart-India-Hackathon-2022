import nodemailer from 'nodemailer';

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
    from: "",
    to: "",
    subject: "",
    html: "<h1></h1>"
}
  
transporter.sendMail(message, function(err: any, info: any) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
})