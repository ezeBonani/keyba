import transporter from "../lib/nodemailer.js";

export const sendPassword = async (req, res) => {
  const { newPassword, email, username } = req;
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Eze Bonani" <eze.bonani@gmail.com>', // sender address
      to: `eze.bonani@gmail.com, ${email}`, // list of receivers
      subject: `Reseteo de password KEYBA`, // Subject line
      html: `<p>Has reiniciado exitosamente tu password <br></br><br></br>Nombre de usuario:${username} <br></br>Tu nueva password es: <b>${newPassword}</b> <br></br> <br></br> Ya puedes iniciar sesión en la sección Login.<br></br>Podés cambiar la contraseña desde tu Perfil cuando desees.</p>`,
    });
    res.json({ message: `Password reset successfully and sent to ${email}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
