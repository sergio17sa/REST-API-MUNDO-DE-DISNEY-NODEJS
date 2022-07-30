const { Users } = require('../db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const loginUser = async (req, res) => {

    const { Email, Password } = req.body;

    try {

        if (!Email || !Password) {
            return res.status(400).json({ error: "Email and Password are both required." });

        } else {
            const user = await Users.findOne({
                where: {
                    Email
                }
            });

            if (!user) {
                res.status(401).json({ error: "invalid user or password" });

            } else {

                const passwordCorrect = user === null ? false : await bcrypt.compare(Password, user.Password);

                if (!(user && passwordCorrect)) {
                    res.status(401).json({
                        error: "invalid user or password",
                    });

                } else {
                    const userForToken = {
                        id: user.id,
                    };

                    const token = jwt.sign(userForToken, process.env.SECRETWORD, {
                        expiresIn: 60 * 60 * 24 * 7,
                    });

                    res.send({

                        Email: user.Email ? user.Email : null,
                        // email: user?.email,
                        token,
                    });
                }

            }


        }

    } catch (error) {
        console.error(error);
    }


};

module.exports = { loginUser};