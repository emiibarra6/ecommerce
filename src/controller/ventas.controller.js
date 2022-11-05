import { ventasdb , ventasDetalledb } from '../models/index.model.js'
import slug from 'slug'
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
  //Validar
  const { nombre , descripcion , precio, imagen , inventario, id_categoria, talle , color} = req.body
  const errores = []

  try {
    if(nombre.trim() === '' ){
      errores.push( { mensaje: 'El nombre esta vacio' })
    }
    if(descripcion.trim() === '' ){
      errores.push( { mensaje:  'La descripción esta vacia' })
    }
  } catch(err){
    return next(errores)
  }
  try{
    //generar slug
    const slug_producto = slug(nombre+descripcion)
            
    //Almacenarlo en la bd
    await ventasdb.create({
      nombre,
      descripcion,
      precio,
      imagen,
      inventario,
      id_categoria,
      talle,
      color,
      slug_producto
    }).then(produc => {
      res.status(200).json({msg: 'Producto guardado correctamente ' , produc})
    }).catch(err =>{
      res.status(400).json({msg: `Error, chekea los datos:  ${err} `})
    })
  } catch (err) {
    return next(err)
  }
}

const obtenerVentaPorID = async (req,res,next) => {
  try {
    ventasdb.findByPk(req.params.id)
      .then(produc => {
        (produc === null) ? res.status(400).json({msg: `Producto con ID ${req.params.id} no encontrado`})  : res.status(200).json(produc)
      }).catch(err => {
        res.status(400).json({msg: `Error: ${err} `})
      })  
  } catch (err) {
    return next(err)
  }
    
}

const actualizarVenta = async (req,res,next) => {
  try {
    await ventasdb.update({
      nombre: req.body.nombre,
      descripcion:req.body.descripcion,
      precio:req.body.precio,
      imagen:req.body.imagen,
      inventario:req.body.inventario,
      id_categoria:req.body.id_categoria,
      talle:req.body.talle,
      color:req.body.color,
    }, {
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.status(200).json({msg: `Producto ${result} actualizado`})
    }).catch(err => {
      res.status(400).json(err)
    })   
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