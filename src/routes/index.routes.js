import { Router } from 'express'
import routerProductos from './productos.routes.js'
import routerAdmin from './admin.routes.js'
import routerCategorias from './categoria.routes.js'

function routerApi(app){
  const router = Router()
  app.use('/api/v1' , router)
    
  router.use('/productos' , routerProductos)
  router.use('/admin' , routerAdmin)
  router.use('/cateogiras' , routerCategorias)
}


export default routerApi