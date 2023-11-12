require('dotenv').config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
     const { email, password } = req.body;                             // recibimos los datos desde el body
        !email || !password && res.status(400).json({ message: "Faltan campos por llenar" }); // validamos que los campos no esten vacíos
        const isExistUser = await User.findOne({ where: { email } });                        // validamos que el usuario no exista
        if(isExistUser) return res.status(400).json({ message: "El usuario ya existe" });   // si existe devolvemos status y mensaje correspondiente

        const user = new User({ email, password });                // creamos el usuario
        const salt = await bcrypt.genSalt(10);                                             // generamos el salt
        const hash = await bcrypt.hash(user.password, salt);                               // generamos el hash

        user.password = hash;                                                               // reemplazamos la contraseña por el hash
        // guardamos el usuario en la base con sequelize
        const registeredUser = await user.save();

        const payload = {
            id: registeredUser.id,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h'});

        res.status(200).json({
            message: "Usuario registrado correctamente",
            data: registeredUser,
            token: token
        });
    } catch (error) {
      res.status(500).json({
        message: "Error al registrar Usuario",                                              // si ocurrio un error devolvemos status y mensaje correspondiente
        data: error,
      });
    }
  },
  login: async (req, res) => {
    try {
        const { email, password } = req.body;                                               // recibimos los datos desde el body
        !email || !password && res.status(400).json({ message: "Faltan campos por llenar" }); // validamos que los campos no esten vacíos

        const user = await User.findOne({ where: { email } });                               // validamos que el usuario exista
        if(!user) return res.status(400).json({ message: "El usuario no existe" });          // si no existe devolvemos status y mensaje correspondiente

        const passMatch = await bcrypt.compareSync(password, user.password);                 // validamos que la contraseña coincida
        if(!passMatch) return res.status(400).json({ message: "Contraseña incorrecta" });    // si no coincide devolvemos status y mensaje correspondiente

        const payload = {
            id: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h'});

        if(!token) {
            res.status(400).json({
                message: "Error al generar token",
                data: error
            });
        }      
        res.status(200).json({
            message: "Usuario logueado correctamente",
            data: user,
            token: token
        });
    } catch (error) {
         res.status(500).json({
            message: "Error al loguear Usuario",                                                // si ocurrio un error devolvemos status y mensaje correspondiente
            data: error
         });
    }
  }
};

module.exports = userController;
