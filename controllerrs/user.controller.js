const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const userController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;                            // recibimos los datos desde el body

      !firstName ||
        !lastName ||
        !email ||
        (!password &&
          res.status(400).json({
            message: "Faltan campos por llenar",                                            // validamos que los campos no esten vacíos
          }));

      const existUser = await User.findOne({ where: { email } });                           // validamos que el usuario no exista
      if (existUser) return res.status(400).json({ message: "El usuario ya existe" });        // si existe devolvemos status y mensaje correspondiente
    
      const hashPass = await bcrypt.hashSync(password, 10);

      const user = await User.create({
        firstName,
        lastName,                                                                           // creamos el usuario
        email,
        password: hashPass,
      });

      res.status(201).json({                                                                // devolvemos status y mensaje correspondiente
        message: "Usuario Registrado",                                                      // devolvemos el usuario creado
        data: user,
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
        const { email, password } = req.body;                                                   // recibimos los datos desde el body

        !email || !password && res.status(400).json({ message: "Faltan campos por llenar"});    // validamos que los campos no esten vacíos

        const user = await User.findOne({ where: { email}});
        !user && res.status(400).json({ message: "Usuario no encontrado"});                     // validamos que el usuario exista

        comparePass = await bcrypt.compareSync(password, user.password)
        if (!comparePass) return res.status(400).json({ message: "usuario o contraseña incorrecto"});      // validamos que la contraseña sea correcta'

        res.status(200).json({                                                                  // devolvemos status y mensaje correspondiente
            message: "Usuario Logueado",                                                        // devolvemos el usuario creado
            data: user,
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
