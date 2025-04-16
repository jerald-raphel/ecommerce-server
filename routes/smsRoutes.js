const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();  // Ensure dotenv is required for loading environment variables

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { name, email, address, total } = req.body;

  // Check if environment variables are properly set
  if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASS) {
    return res.status(500).json({ success: false, message: 'Email credentials not set in environment variables' });
  }

  // Set up the transporter with credentials from environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,  // Ensure you set this in your .env file
      pass: process.env.EMAIL_PASS,  // Ensure you set this in your .env file
    },
  });

  // Define the mail options, including the "from" as the environment email
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Use the email from the environment variable
    to: email,  // recipient email (the customer)
    subject: 'Order Confirmation',
    text: `Hi ${name},\n\nYour order of $${total} has been placed!\nShipping to:\n${address}\n\nThanks for shopping with us!`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Order confirmation email sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, message: 'Email send failed', error: error.message });
  }
});

module.exports = router;
