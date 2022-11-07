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
  const { id_usuario , total , fecha } = req.body.infoVenta
  const arrayDetalles = req.body.infoDetalle
  if(arrayDetalles.length === 0){
    return next(' Campos imcompletos ')
  }
  try {
    if(!id_usuario || !total || !fecha  ){
      return next('Campos incompletos, por favor verificá' )
    }
  } catch(e){
    return next('Algo mal ocurrio')
  }
  
  const t = await sequelize.transaction()
  try{
    const venta = await ventasdb.create({
      id_usuario,
      total,
      fecha,
    } , { transaction: t  } )
    const id_venta = venta.dataValues.id
    console.log(venta)
    arrayDetalles.forEach(async (element) => {
      const id_producto = element.id_producto
      const cantidad = element.cantidad
      const precio = element.precio
      const subtotal = element.subtotal
      await ventasDetalledb.create({
        id_venta,
        id_producto,
        cantidad,
        precio,
        subtotal,
      })
    }, { transaction: t  } )
    
    await t.commit()
    res.status(200).json({msg:'Venta registrada correctamente 😎' , venta: ` ${venta.dataValues.id} ` , usuario: ` ${venta.dataValues.id_usuario}` })
  } catch (err) {
    if(t) {
      await t.rollback()
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