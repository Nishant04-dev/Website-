const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, phone, email, requirement } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'info.vengeanceservices@gmail.com',
      pass: 'symą olop jzyo izvh',
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'info.vengeanceservices@gmail.com',
      subject: 'New Project Requirement',
      text: `
Name: ${name}
Phone: ${phone}
Email: ${email}
Requirement: ${requirement}
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
