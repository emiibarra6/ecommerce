import { Router } from "express";
import { actualizarProducto, borrarProducto, guardarProducto , obtenerProductoPorID, traeTodosLosProductos} from "../controller/productos.controller.js";

const router = Router();
router.get('/' , traeTodosLosProductos)
router.post('/' , guardarProducto)
router.get('/:id' , obtenerProductoPorID)
router.patch('/:id' , actualizarProducto)
router.delete('/:id' , borrarProducto)

export default router;