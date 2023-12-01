const nodemailer = require("nodemailer");

const mailSender = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "eduwizard2023@outlook.com",
      pass: "Adminwizard123+",
    },
  });

  const mailOptions = {
    from: "eduwizard2023@outlook.com",
    to: to,
    subject: subject,
    text: text,
    html: `
      <div style="display: flex; align-items: center;">
        <h2 style="color: #333;">EDUWIZARD</h2>
      </div>
      <h2 style="color: #333;">${subject}</h2>
      <p>${text}</p>
      <p style="color: #888; font-size: 12px;">Este correo fue enviado desde EDUWIZARD.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return { message: "Success!" };
  } catch (err) {
    console.error("Error en el envío:", err);
    throw new Error(`Error: ${err}`);
  }
};

module.exports = { mailSender };
