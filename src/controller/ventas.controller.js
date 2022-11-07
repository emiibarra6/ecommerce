import { ventasdb , ventasDetalledb } from '../models/index.model.js'
import { getValue, setValue , client } from '../helpers/redis.js'
import sequelize from '../db.js'

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
  //venta es una sola
  const { id_usuario , total , fecha } = req.body
  let detalle_venta_req = []
  
  //pero los detalles de ventas pueden ser varios, asi que los asignamos a un array!
  // const { id_venta, id_producto, cantidad, precio, subtotal } = req.body
  req.body.forEach(function (entry,index)  {
    detalle_venta_req.push({entry})
  })
  const errores = []
  let transaction
  try {
    if(!id_usuario || !total || !fecha || !id_producto || !cantidad || !precio || !subtotal ){
      errores.push( { mensaje: 'Campos incompletos, por favor verificá' })
    }
  } catch(e){
    return next(errores)
  }
  
  try{
    transaction = await sequelize.transaction()
    //Almacenarlo en la bd // ver de hacer rollback si hay un error.! VER!!!!!
    const venta = await ventasdb.create({
      id_usuario,
      total,
      fecha,
    } , { transaction } )

    const id_venta = venta.id

    const detalle_venta = await ventasDetalledb.create({
      id_venta,
      id_producto,
      cantidad,
      precio,
      subtotal
    }, { transaction } )

    await transaction.commit() 
    res.status(200).json({msg:'Venta registrada correctamente 😎' , data: ` ${venta} - ${detalle_venta} `})
  } catch (err) {
    if(transaction) {
      await transaction.rollback()
    }
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