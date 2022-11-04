import { Router } from 'express'
import { traeTodasCategorias, obtenerCategoriaPorID, guardarCategoria , actualizarCategoria, borrarCategoria } from '../controller/categoria.controller.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = Router()
router.get('/'  , checkAuth, traeTodasCategorias)
router.get('/:id' , checkAuth, obtenerCategoriaPorID)
router.post('/' , checkAuth , guardarCategoria)
router.patch('/:id' , checkAuth , actualizarCategoria)
router.delete('/:id' , checkAuth ,borrarCategoria)

export default router