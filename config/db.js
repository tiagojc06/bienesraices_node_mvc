// Configuración de la conexión a la base de datos usando Sequelize
// En esta sección, creamos una nueva instancia de Sequelize, que se encargará de la conexión con la base de datos.
// Especificamos los parámetros necesarios para la conexión: base de datos, usuario, contraseña y configuraciones adicionales como host, puerto, dialecto, etc.
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASS, {
  host: process.env.BD_HOST,  // Dirección del servidor de la base de datos (en este caso, es local).
  port: 3306,         // Puerto por defecto de MySQL.
  dialect: 'mysql',   // Tipo de base de datos (en este caso, MySQL).
  
  // Opciones adicionales de configuración
  // Aquí configuramos aspectos como los timestamps, el pool de conexiones y la desactivación de aliases para operadores.
  define: {
    timestamps: true  // Indica que Sequelize debe gestionar las columnas createdAt y updatedAt en cada modelo.
  },
  
  pool: {
    max: 5,           // Número máximo de conexiones que puede haber al mismo tiempo.
    min: 0,           // Número mínimo de conexiones en el pool.
    acquire: 30000,   // Tiempo en milisegundos que espera para adquirir una conexión antes de arrojar un error.
    idle: 10000       // Tiempo en milisegundos que espera para cerrar una conexión inactiva.
  },
  
  operatorAliases: false // Desactiva los alias de los operadores, lo que mejora la seguridad y la claridad del código.
});

// Exportación de la instancia de Sequelize
// Exportamos la instancia de Sequelize para que pueda ser utilizada en otras partes de la aplicación.
// Esto permite que se utilice la misma conexión a la base de datos en diferentes archivos, facilitando la gestión de la base de datos.
export default db;