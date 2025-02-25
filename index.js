// Importamos las dependencias necesarias para configurar y ejecutar nuestro servidor y base de datos.
// Express: Framework para manejar el servidor y las rutas.
// usuarioRoutes: Archivo donde se definen rutas relacionadas con usuarios.
// db: Configuración y conexión a la base de datos mediante Sequelize.
import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';

//* Crear la app
// Creamos la instancia de la aplicación Express, que será la base del servidor.
const app = express();

//* Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) );

//* Habilitar Cookie Parser
app.use( cookieParser() );

//* Habilitar CSRF
app.use( csrf({ cookie: true }) );

//* Conexión a la base de datos
// Usamos el método `authenticate` de Sequelize para verificar si la conexión con la base de datos es exitosa.
// Si la conexión falla, capturamos y mostramos el error en la consola.
try {
  await db.authenticate();
  db.sync();
  console.log('Conexión Correcta a la Base de Datos');
} catch (error) {
  console.log('Error al conectar con la base de datos:', error);
}

//* Configuración del motor de vistas - Habilitar Pug
// Usamos Pug como motor de vistas para renderizar contenido dinámico en el lado del servidor.
// También especificamos que las vistas estarán ubicadas en la carpeta './views'.
app.set('view engine', 'pug');
app.set('views', './views');

//* Configuración de la Carpeta Pública
// Definimos 'public' como la carpeta estática para servir archivos como CSS, JavaScript, imágenes, etc.
app.use(express.static('public'));

//* Configuración de las rutas - Routing
// Conectamos las rutas definidas en 'usuarioRoutes' al prefijo '/auth'.
// Todas las solicitudes que empiecen con '/auth' serán gestionadas por las rutas dentro de 'usuarioRoutes'.
app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes);

//* Configuración y arranque del servidor
// Definimos el puerto en el que escuchará nuestro servidor (3000 en este caso).
// Iniciamos el servidor con `app.listen` y mostramos un mensaje en consola para confirmar que está funcionando.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El Servidor está funcionando en el puerto ${port}`);
});