import express from "express";
const router = express.Router();
import {registrar, autenticar} from "../controllers/usuarioController.js"

// Autenticación, Registro y Confirmación de Usuarios  
router.post('/', registrar); // Crea un nuevo usuario
router.post('/login', autenticar); 



export default router;