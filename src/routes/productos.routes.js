import { Router } from "express";
import { actualizarProducto, borrarProducto, guardarProducto , obtenerProductoPorID, traeTodosLosProductos} from "../controller/productos.controller.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = Router();
router.get('/' , traeTodosLosProductos)
router.post('/' , checkAuth ,guardarProducto)
router.get('/:id' , obtenerProductoPorID)
router.patch('/:id' , checkAuth , actualizarProducto)
router.delete('/:id' , checkAuth ,borrarProducto)

export default router;