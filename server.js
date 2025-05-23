const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Email config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info.vengeanceservices@gmail.com',     // Replace with your email
    pass: 'symq olop jzyo izvh'         // Replace with your app password
  }
});

// Route to handle form submission
app.post('/submit-requirement', (req, res) => {
  const { name, phone, email, requirement } = req.body;

  const mailOptions = {
    from: email,
    to: 'info.vengeanceservices@gmail.com',  // Where you want to receive submissions
    subject: 'New Project Requirement',
    text: `
Name: ${name}
Phone: ${phone}
Email: ${email}
Requirement: ${requirement}
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).send('Something went wrong.');
    }
    res.status(200).send('Requirement submitted successfully!');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
