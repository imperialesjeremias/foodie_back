const express = require('express');                                 // importamos express
const app = express();                                              // instanciamos express
const bodyParser = require('body-parser');                          // importamos body-parser   
const { dbConnection, sequelize } = require('./config/db.config');  // importamos la conexion a la base de datos
const cors = require('cors');                                       // importamos cors para permitir peticiones desde cualquier origen
const { default: helmet } = require('helmet');                      // importamos helmet para proteger cabeceras y vulnerabilidades HTTP

app.use(cors());                                                    // habilitamos cors
app.use(bodyParser.json());                                         // parse applicacion/json
app.use(bodyParser.urlencoded({ extended: true }));                 // parse applicacion/x-www-form-urlencoded
app.use(helmet());                                                  // proteccion de cabeceras y vulnerabilidades HTTP


const apiRouter = express.Router();                                 // instanciamos el router de express
const userRouter = require('./routes/models.routes');                 // importamos el router de usuarios
app.use('/api', apiRouter);
apiRouter.use('/u', userRouter);

app.listen(3000, () => {
    sequelize.sync({ force: false, match: /_test$/ }).then(() => {
        console.log('Database connected');
    })
    dbConnection();
    console.log('Server is running on port 3000');
})