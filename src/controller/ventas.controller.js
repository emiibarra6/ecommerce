import { ventasdb , ventasDetalledb } from '../models/index.model.js'
import { getValue, setValue , client } from '../helpers/redis.js'


const traeTodosLasVentas = async (req,res,next) => {
  try { 
    await client.connect()
    let reply = await getValue('ventas') 
    //si existe info, terminamos response devolviendo la info
    if(reply !== null) {
      await client.disconnect()
      return res.status(200).json({cache:true  , json: JSON.parse(reply)})
    } 

    //si llegamos hasta aca, no esta en redis, hacemos la consulta a la base de datos y registramos en caché.
    ventasdb.findAll({
      include: ventasDetalledb
    }).then(async produc => {
      res.status(200).json({cache:false, json: produc})
      await setValue('ventas',JSON.stringify(produc))
      await client.disconnect()
    })
  }catch (error) {
    await client.disconnect()
    return next(error)  
  }
}

const guardarVenta = async (req,res,next) => {
  //venta
  const { id_usuario , total , fecha } = req.body
  const { id_venta, id_producto, cantidad, precio, subtotal } = req.body
  const errores = []
  try {
    if(!id_usuario || !total || !fecha || !id_venta || !id_producto || !cantidad || !precio || !subtotal ){
      errores.push( { mensaje: 'Campos incompletos, por favor verificá' })
    }
  } catch(err){
    return next(errores)
  }
  try{
    //Almacenarlo en la bd // ver de hacer rollback si hay un error.! VER!!!!!
    await ventasdb.create({
      id_usuario,
      total,
      fecha,
    }).then(produc => {
      res.status(200).json({msg: 'Venta guardada correctamente ' , produc})
    }).catch(err =>{
      res.status(400).json({msg: `Error, chekea los datos:  ${err} `})
    })
  } catch (err) {
    return next(err)
  }
}

const obtenerVentaPorID = async (req,res,next) => {
  try {
    
  } catch (err) {
    return next(err)
  }
    
}

const actualizarVenta = async (req,res,next) => {
  try {
   
  } catch (err) {
    return next(err)
  }
}


export {
  guardarVenta,
  traeTodosLasVentas,
  actualizarVenta,
  obtenerVentaPorID
}