const { mailSender } = require("../services/nodemailer");
const crypto = require("crypto");
const UserService = require("../services/user.service");

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const result = await mailSender(to, subject, text);
    res.json(result);
  } catch (error) {
    console.error("Error en el controlador de correo:", error);
    res.status(500).json({ error: error.message });
  }
};

const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el correo electrónico existe en la base de datos de usuarios
    const emailExists = await UserService.verificarEmailExistente(email);
    if (!emailExists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Generar token y establecer su fecha de expiración
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutos

    // Almacenar token en la base de datos o memoria (en este caso, actualizando el usuario)
    await UserService.actualizarResetToken(
      email,
      resetToken,
      resetTokenExpires
    );

    // Integrar el contenido existente del servicio de correo
    const subject = "Recuperación de Contraseña EDUWIZARD";
    const text = `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3000/reset-password/${resetToken}`;

    // Enviar el correo electrónico
    await mailSender(email, subject, text);

    res.json({ message: "Correo electrónico enviado con éxito" });
  } catch (error) {
    console.error("Error en el controlador de correo:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
};
