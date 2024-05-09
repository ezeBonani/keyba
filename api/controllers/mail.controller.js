import transporter from "../lib/nodemailer.js";

export const sendMail = async (req, res) => {
  const { name, phone, email, message, post } = req.body;
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Eze Bonani" <eze.bonani@gmail.com>', // sender address
      to: `eze.bonani@gmail.com, ${email}`, // list of receivers
      subject: `Consulta por ${post}`, // Subject line
      html: `¡Gracias por comunicarte con KEYBA! <br></br><br></br>Tu consulta por la propiedad <b>${post}</b> ha sido enviada. Estarás recibiendo una respuesta en las próximas 24 hrs hábiles<br><br/><br><br/><i>Nombre: ${name}<br></br>Teléfono: ${phone}<br></br>email: ${email}<br></br>Publicación: ${post}<br></br>Consulta: ${message}</i></p>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send(info);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
