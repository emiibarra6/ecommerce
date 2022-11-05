import { Router } from 'express'
import { actualizarVenta, guardarVenta , obtenerVentaPorID, traeTodosLasVentas} from '../controller/ventas.controller.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = Router()
router.get('/'  ,  checkAuth, traeTodosLasVentas)
router.post('/' , checkAuth , guardarVenta)
router.get('/:id' , checkAuth, obtenerVentaPorID)
router.patch('/:id' , checkAuth , actualizarVenta)

export default router