import { categoriadb } from '../models/categoria.models'
import slug from 'slug';
import { createClient } from 'redis';
import dotenv from 'dotenv/config';

let client = createClient({
    url: process.env.REDIS_URI
  });
  
client.on('connect', function() {
    console.log('Conectado a Redis Server');
});

client.on('error', (err)=>{
    console.error(err.message)
});

const setValue = async (key, value) => {
    return await client.set(key, value , {
        EX: 10*60,
      });
};
  
const getValue = async (key) => {
    let val = await client.get(key);
    return val;
};
let reply;

const traeTodasCategorias = async (req,res,next) => {
    try { 
        await client.connect();
        reply = await getValue("categorias"); 
        
        //si existe info, terminamos response devolviendo la info
        if(reply) {
            await client.disconnect();
            return res.status(200).json({cache:true  , json: JSON.parse(reply)});
        } 

        //si llegamos hasta aca, no esta en redis, hacemos la consulta a la base de datos y registramos en caché.
        categoriadb.findAll({
            attributes: { exclude: ['id'] }
        }).then(async categ => {
            res.status(200).json({cache:false, json: categ});
            await setValue("categorias",JSON.stringify(categ));
            await client.disconnect();
         })
         
        }catch (error) {
            await client.disconnect();
            return next(error);  
        }
}

const guardarCategoria = async (req,res,next) => {
    //Validar
    const { nombre , descripcion , imagen } = req.body;
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
            const slug_categoria = slug(nombre+descripcion);
            
            //Almacenarlo en la bd
            await categoriadb.create({
                nombre,
                descripcion,
                imagen,
                slug_categoria
            }).then(categ => {
                    res.status(200).json({msg: 'Categoria guardada correctamente ' , categ});
            }).catch(err =>{
                    res.status(400).json({msg: 'Error, chekea los datos: ' , err})
            })
    } catch (err) {
        return next(err)
    }
}

const obtenerCategoriaPorID = async (req,res,next) => {
    try {
        categoriadb.findByPk(req.params.id)
        .then(categ => {
            (categ === null) ? res.status(400).json({msg: `Producto con ID ${req.params.id} no encontrado`})  : res.status(200).json(categ);
        }).catch(err => {
            res.status(400).json({msg: `Error: ${err} `})
        })  
    } catch (err) {
        return next(err)
    }
    
}

const actualizarCategoria = async (req,res,next) => {
    try {
        const resultdb = await categoriadb.update({
            nombre: req.body.nombre,
            descripcion:req.body.descripcion,
            imagen:req.body.imagen,
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).json({msg: `Categoria ${result} actualizada`});
        }).catch(err => {
            res.status(400).json(err);
        });   
    } catch (err) {
        return next(err)
    }
}


const borrarCategoria = async (req,res,next) => {
    try {
        categoriadb.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).json({ msg: `categoria con ID: ${result} , borrado exitosamente:`});
        }).catch(err => {
            res.status(400).json(err);
        });   
    } catch (err) {
        return next(err)
    }
}

export {
    guardarCategoria,
    traeTodasCategorias,
    borrarCategoria,
    actualizarCategoria,
    obtenerCategoriaPorID
}