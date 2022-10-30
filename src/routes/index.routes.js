import { Router } from "express";
import routerProductos from './productos.routes.js'

function routerApi(app){
    const router = Router();
    app.use('/api/v1' , router)
    
    router.use('/productos' , routerProductos)
}


export default routerApi