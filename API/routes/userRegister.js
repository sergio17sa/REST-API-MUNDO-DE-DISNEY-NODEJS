const { Users } = require('../db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


/**
 * It creates a new user in the database, and sends an email to the user's email address.
 * @param req - The request object. This is the object that represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @returns The user is being created and the email is being sent.
 */
const userRegister = async (req, res) => {

    const { Name, Password, Email } = req.body;

    try {

        const userExist = await Users.findOne({
            where: {
                Email: Email
            }
        });

        if (userExist) {
            return res.json({ error: "User already exists" })

        } else {

            bcrypt.hash(Password, 10, (error, hash) => {
                if (error) {
                    next(error);
                } else {
                    const newUser = Users.create({
                        Name,
                        Password: hash,
                        Email,
                        id: uuidv4()
                    });

                    res.status(201).send("Welcome to Disney API, now you can sign in")

                    //----email confirmation
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: "terapeandoportal@gmail.com",
                            pass: "pezufzhvclfbmuti",
                        },
                        tls: {
                            rejectUnauthorized: false
                          }
                    });

                    transporter.verify().then(() => {
                        console.log("Ready to send emails");
                    });

                    let mailOptions = {
                        from: `Terapeando <terapeandoportal@gmail.com>`,
                        to: `${Email}`,
                        subject: "Confirmacion de registro",
                        html: `<h1>Bienvenido ${Name} a Disney Api!</h1>
                                  <p>Tu cuenta para ${Email} ha sido creada con éxito.</p>`,
                    };

                    transporter.sendMail(mailOptions, (error) => {
                        if (error) {
                          console.log("Hubo un error: ", error);
                        } else {
                          console.log("Email enviado!");
                        }
                      });

                }
            })
        }

    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { userRegister };
