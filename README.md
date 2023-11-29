# En desarrollo

### DEVS
[Imperiales Jeremias](https://www.linkedin.com/in/jeremiasleonimperiales)

[Ivan Venegas](https://www.linkedin.com/in/ivan-venegas-81225217)

[Gonzalo Delvalle](https://www.linkedin.com/in/gonzalodelvalle)

# Proyecto Final Fundación Pescar - Santander - Documentación
Este proyecto contiene el backend para usar la aplicación de Foodie utilizando
NodeJs-Express y SQL usando Sequelize como ORM.

### Requisitos
Node.js (v18 o posterior)
NPM

### Installing

Clone
```
https://github.com/imperialesjeremias/foodie_back
```

## Iniciar

Instalar dependencias en el servidor
```
cd foodie_back
npm install
npm run dev

Esto levantara el servidor del cliente este se encontrara en el puerto `htpp://localhost:3000`
```

## Requisitos previos

1. Asegúrate de tener instalado MySQL en tu sistema.
2. Asegúrate de ajustar los valores de las variables de entorno en el `.env` 
segun tu configuración de la base de datos.

## Paso 1: Establecer la conexión a la base de datos

1. Abre el archivo `db.config.js` ubicado en la carpeta `config`.
2. Reemplaza las siguientes líneas de código con la configuración correspondiente:

```javascript
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;
const dbUser = process.env.DB_USER || 'usuario';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbName = process.env.DB_NAME || 'tu_base_de_datos';

## Configurar .env

1. Crea un archivo llamado `.env`
2. Agrega los siguientes valores

```
dbHost = 'localhost';
dbPort=5432;
dbUser ='usuario';
dbPassword ='password';
dbName ='tu_base_de_datos';
```
## Paso 2: Crear la base de datos

1. Dirigite a tu aplicacion de MySQL y crea una nueva base de datos
2. Puedes reemplazar el nombre de la base de datos `foodie_db_test` por el nombre de la base de datos que acabas de crear.
3. Las variables de entorno son de preferencia personal, no hace falta colocarlas.
4. En el archivo principal `index.js` hay una opcion llamada `{force: true}` por  defecto se encuentra asi, si por algun inconveniente necesitas reiniciar el servidor colocalo en `{force: false}` esto se encargara de no volver a ejecutar las migraciones de los modelos.
3. Listo ahora puedes proceder a ejecutar la aplicacion 

## Uso Servidor
1. Ejecuta la aplicación de servidor: `npm run start`
2. La aplicacion deberia estar disponible en el puerto: `http://localhost:3000/api`

