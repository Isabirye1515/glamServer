require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Configure nodemailer with environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, contact, comment } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'isabiryeelijah15@gmail.com',
    subject: `New Order from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nContact: ${contact}\nComment: ${comment}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ message: 'Error sending email', error: error.toString() });
    }
    res.status(200).send({ message: 'Email sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
