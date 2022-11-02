import { productosdb } from '../models/productos.models.js'
import slug from 'slug';
import { createClient } from 'redis';


let client = createClient({
    socket:{
        host: process.env.REDIS_URI || '127.0.0.1'
    }
});

client.on('connect', function() {
    console.log('Conectado a Redis Server');
});

client.on('error', (err)=>{
    console.error(err.message)
});

(async () => {
    await client.connect();
})();

const setValue = async (key, value) => {
    return await client.set(key, value);
};
  
const getValue = async (key) => {
    let val = await client.get(key);
    return val;
};
let reply;
const traeTodosLosProductos = async (req,res,next) => {
    try { 
        
        reply = await getValue("productos"); 
        
        //si existe info, terminamos response devolviendo la info
        if(reply) return res.status(200).json({cache:true  , json: JSON.parse(reply)});

        //si llegamos hasta aca, no esta en redis, hacemos la consulta a la base de datos y registramos en caché.
        productosdb.findAll({
            attributes: { exclude: ['id'] }
        }).then(async produc => {
            res.status(200).json({cache:false, json: produc});
            await setValue("productos",JSON.stringify(produc))
         })
         
        }catch (error) {
            return next(error)
        }
}

const guardarProducto = async (req,res,next) => {
    //Validar
    const { nombre , descripcion , precio, imagen , inventario, id_categoria, talle , color} = req.body;
    const errores = [];

    try {
        if(nombre.trim() === '' ){
            errores.push( { mensaje: 'El nombre esta vacio' });
        }
        if(descripcion.trim() === '' ){
            errores.push( { mensaje:  'La descripción esta vacia' });
        }
    } catch(err){
        return next(errores)
    }
    try{
            //generar slug
            const slug_producto = slug(nombre+descripcion);
            
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
                    res.status(200).json({msg: 'Producto guardado correctamente ' , produc});
            }).catch(err =>{
                    res.status(400).json({msg: 'Error, chekea los datos: ' , err})
            })
    } catch (err) {
        return next(err)
    }
}

const obtenerProductoPorID = async (req,res,next) => {
    try {
        productosdb.findByPk(req.params.id)
        .then(produc => {
            (produc === null) ? res.status(400).json({msg: `Producto con ID ${req.params.id} no encontrado`})  : res.status(200).json(produc);
        }).catch(err => {
            res.status(400).json({msg: `Error: ${err} `})
        })  
    } catch (err) {
        return next(err)
    }
    
}

const actualizarProducto = async (req,res,next) => {
    try {
        const resultdb = await productosdb.update({
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
            res.status(200).json({msg: `Producto ${result} actualizado`});
        }).catch(err => {
            res.status(400).json(err);
        });   
    } catch (err) {
        return next(err)
    }
}


const borrarProducto = async (req,res,next) => {
    try {
        productosdb.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).json({ msg: `producto con ID: ${result} , borrado exitosamente:`});
        }).catch(err => {
            res.status(400).json(err);
        });   
    } catch (err) {
        return next(err)
    }
}

export {
    guardarProducto,
    traeTodosLosProductos,
    borrarProducto,
    actualizarProducto,
    obtenerProductoPorID
}