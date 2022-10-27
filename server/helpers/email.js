const nodemailer = require('nodemailer');

const sendEmail = async options => {
  //1. Transporter
  const transporter = nodemailer.createTransport({
    //service: 'Gmail'
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //2. Email options
  const mailOptions = {
    from: 'AlexWebJr <info@empleos.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };

  //3. Send
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
