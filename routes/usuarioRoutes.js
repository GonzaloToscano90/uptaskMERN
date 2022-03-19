import express from "express";
const router = express.Router();
import {registrar, autenticar, confirmar, olvidePassword} from "../controllers/usuarioController.js"

// Autenticación, Registro y Confirmación de Usuarios  
router.post('/', registrar); // Crea un nuevo usuario
router.post('/login', autenticar); 
router.get('/confirmar/:token', confirmar); // los dos puntos :  genera routing dinamico porque soporta multiples valores en su ruta con express
router.post('/olvide-password', olvidePassword)



export default router;