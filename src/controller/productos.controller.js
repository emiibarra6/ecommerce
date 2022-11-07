import { productosdb } from '../models/productos.models.js'
import slug from 'slug'
import { getValue, setValue , client } from '../helpers/redis.js'
import { validarProductos } from '../middleware/validaciones.js'

const traeTodosLosProductos = async (req,res,next) => {
  try { 
    await client.connect()
    let reply = await getValue('productos') 
    //si existe info, terminamos response devolviendo la info
    if(reply !== null) {
      await client.disconnect()
      return res.status(200).json({cache:true  , json: JSON.parse(reply)})
    } 

    //si llegamos hasta aca, no esta en redis, hacemos la consulta a la base de datos y registramos en caché.
    productosdb.findAll({
      attributes: { exclude: ['id'] }
    }).then(async produc => {
      res.status(200).json({cache:false, json: produc})
      await setValue('productos',JSON.stringify(produc))
      await client.disconnect()
    })
         
  }catch (error) {
    await client.disconnect()
    next(error)  
  }
}

const guardarProducto = async (req,res,next) => {
  const { nombre , descripcion , precio, imagen , inventario, id_categoria, talle , color} = req.body
  const { error } = validarProductos(nombre,descripcion,precio,imagen,inventario,id_categoria,talle,color)

  if (error) {
    next(`Error en validacion: ${error.details} `)
  }

  try{
    //generar slug
    const slug_producto = slug(nombre+descripcion)
            
    //Almacenarlo en la bd
    await productosdb.create({
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
    next(err)
  }
}

const obtenerProductoPorID = async (req,res,next) => {
  try {
    productosdb.findByPk(req.params.id)
      .then(produc => {
        (produc === null) ? res.status(400).json({msg: `Producto con ID ${req.params.id} no encontrado`})  : res.status(200).json(produc)
      }).catch(err => {
        res.status(400).json({msg: `Error: ${err} `})
      })  
  } catch (err) {
    next(err)
  }
    
}

const actualizarProducto = async (req,res,next) => {
  try {
    const { nombre , descripcion , precio, imagen , inventario, id_categoria, talle , color} = req.body
    const { error } = validarProductos(nombre,descripcion,precio,imagen,inventario,id_categoria,talle,color)

    if (error) {
      next(`Error en validacion: ${error.details} `)
    }
    await productosdb.update({
      nombre,
      descripcion,
      precio,
      imagen,
      inventario,
      id_categoria,
      talle,
      color,
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
    next(err)
  }
}


const borrarProducto = async (req,res,next) => {
  try {
    productosdb.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.status(200).json({ msg: `producto con ID: ${result} , borrado exitosamente:`})
    }).catch(err => {
      res.status(400).json(err)
    })   
  } catch (err) {
    next(err)
  }
}

export {
  guardarProducto,
  traeTodosLosProductos,
  borrarProducto,
  actualizarProducto,
  obtenerProductoPorID
}