const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
    
    const contact = new Contact(req.body);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'moteleschocolate@gmail.com',
            pass: 'pktgluvtlcfcbrfi'
        }
    })

    try {
        const msg = await transporter.sendMail({
            from: 'Moteles Chocolate <moteleschocolate.com.ar>',
            to: contact.email,
            subject: `Hemos recibido tu mensaje, gracias por comunicarte con Moteles Chocolate`,
            text: `Hola ${contact.name}, gracias por comunicarte con Moteles Chocolate. Te contestaremos a la brevedad. Un saludo`
        });

        const notification = await transporter.sendMail({
            from: 'Moteles Chocolate - Sitio Web <moteleschocolate.com.ar>',
            to: 'consultasmoteleschocolate@gmail.com',
            subject: `${contact.subject} - Enviado desde el sitio web - Usuario: ${contact.email}`,
            text: `${contact.message}`
        });
        
        await contact.save();
        res.status(200).json({message: 'Mensaje enviado correctamente'})
    } catch (error) {
        res.status(400).json({message: 'E-mail no válido'});
    }
}