const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { name, email, address, total } = req.body;

  // Set up the transporter with beast@gmail.com credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM, // beast@gmail.com
      pass: process.env.EMAIL_PASS, // your Gmail password or app password
    },
  });

  // Define the mail options, including the "from" as a different email (dummy@example.com)
  const mailOptions = {
    from: 'beast@gmail.com', // Set to the dummy email you want to use as the "From"
    to: email, // recipient email (the customer)
    subject: 'Order Confirmation',
    text: `Hi ${name},\n\nYour order of $${total} has been placed!\nShipping to:\n${address}\n\nThanks for shopping with us!`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, message: 'Email send failed' });
  }
});

module.exports = router;