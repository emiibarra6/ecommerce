import { Router } from 'express'
import { crearAdmin, obtenerTodosLosAdmin, autenticarAdmin} from '../controller/admin.controller.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = Router()
router.get('/' , obtenerTodosLosAdmin)
router.post('/' ,checkAuth, crearAdmin)
router.post('/auth' , autenticarAdmin)


export default router