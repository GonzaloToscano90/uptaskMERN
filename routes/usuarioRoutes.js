import express from "express";
const router = express.Router();
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,

} from "../controllers/usuarioController.js";


import checkAuth from '../middleware/checkAuth.js';

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar); // los dos puntos :  genera routing dinamico porque soporta multiples valores en su ruta con express
router.post("/olvide-password", olvidePassword);
// router.get("/olvide-password/:token", comprobarToken);
// router.post("/olvide-password/:token", nuevoPassword);
// Estos dos codigos comentados arriba se pueden simplificar asi:
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get('/perfil', checkAuth, perfil); //checkAuth verifica q el jwt sea valido, q exista, q sea enviado via header,y todas las comprobaciones

export default router;
