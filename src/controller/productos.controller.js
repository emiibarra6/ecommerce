import { productosdb } from '../models/productos.models.js'
import erroresConst from '../const/errors.js';
import slug from 'slug';

const traeTodosLosProductos = async (req,res) => {
    try {
        productosdb.findAll().then(produc => {
            res.status(200).json(produc);
        })   
    } catch (error) {
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
                id,
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
                })   
        
    } catch (err) {
        return next(err)
    }
}

const obtenerProductoPorID = async (req,res,next) => {
    try {
        productosdb.findByPk(req.params.id).then(produc => {
            res.status(200).json(produc);
        })    
    } catch (err) {
        return next(err)
    }
    
}

const actualizarProducto = async (req,res,next) => {
    try {
        productosdb.update({
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
            res.status(200).json(result);
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
            res.status(200).json({ msg: 'producto borrado exitosamente: ' , result});
        })   
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