// Configuración y definición de rutas relacionadas con usuarios
// Este archivo agrupa las rutas que gestionan las vistas de inicio de sesión, registro y recuperación de contraseña.
// Utiliza controladores para separar la lógica de negocio de las definiciones de rutas.

import express from 'express'; // Importamos Express para trabajar con su sistema de rutas.
import { formularioLogin, autenticar, cerrarSesion, formularioRegistro, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword } from '../controllers/usuarioController.js'; // Importamos los controladores que gestionan las acciones de cada ruta.

// Creamos una instancia de Router
// Router es una funcionalidad de Express que nos permite organizar las rutas de manera modular e independiente.
// Todas las rutas aquí definidas estarán relacionadas con la gestión de usuarios.
const router = express.Router();

// Definición de rutas relacionadas con la autenticación de usuarios
// Estas rutas gestionan las vistas de inicio de sesión, registro y recuperación de contraseña.
// Cada ruta responde a una solicitud GET y llama a un controlador cuando el usuario accede a '/auth/...'.
// Los controladores se encargan de la lógica asociada y renderizan las vistas correspondientes.
router.get('/login', formularioLogin);                      // Formulario de inicio de sesión.
router.post('/login', autenticar);

// Cerrar sesión
router.post('/cerrar-sesion', cerrarSesion);

router.get('/registro', formularioRegistro);               // Formulario de registro de usuario.
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword); // Formulario de recuperación de contraseña.
router.post('/olvide-password', resetPassword);

// Almacena el nuevo password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

// Exportamos el router
// Esto permite que las rutas definidas aquí sean utilizadas en otros archivos, como el archivo principal 'index.js'.
// Al importarlas, se pueden integrar al servidor y asignarles un prefijo común como '/auth'.
export default router;