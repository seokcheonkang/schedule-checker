const nodemailer = require('nodemailer');

let transporter = null;

const setTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }
};

const EMAIL = {
  initTransporter: () => {
    setTransporter();
  },
  sendEmail: async (to = '', subject = '', text = '', html = '') =>
    await transporter.sendMail({
      from: `"Schedule Checker Admin" <${process.env.NODEMAILER_USER}>`,
      to,
      subject,
      text,
      html,
    }),
};

module.exports = EMAIL;
