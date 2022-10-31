import { Router } from "express";
import routerProductos from './productos.routes.js'
import routerUsuario from './usuario.routes.js'

function routerApi(app){
    const router = Router();
    app.use('/api/v1' , router)
    
    router.use('/productos' , routerProductos)
    router.use('/usuario' , routerUsuario)
}


export default routerApi