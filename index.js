import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) );

// Habilitar Cookie Parser
app.use( cookieParser() );

// Habilitar CSRF
app.use( csrf({ cookie: true }) );

// Conexión a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log('Conexión Correcta a la Base de Datos');
} catch (error) {
  console.log('Error al conectar con la base de datos:', error);
}

// Configuración del motor de vistas - Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Configuración de la Carpeta Pública
app.use(express.static('public'));

// Configuración de las rutas - Routing
app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes);

// Configuración y arranque del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El Servidor está funcionando en el puerto ${port}`);
});