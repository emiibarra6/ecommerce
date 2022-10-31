import { Router } from "express";
import { crearUsuario, obtenerTodosLosUsuarios, autenticarUsuario} from "../controller/usuario.controller.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = Router();
router.get('/' , obtenerTodosLosUsuarios)
router.post('/' ,checkAuth, crearUsuario)
router.post('/auth' , autenticarUsuario)


export default router;