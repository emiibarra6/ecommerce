import Usuario from '../models/usuario.model.js';
import generarJWT from '../helpers/generarJWT.js';

const crearUsuario =  async (req,res,next) => {
    const {nombre,email,password,celular} = req.body;
    
    try {
        //Validaciones
        if(!nombre || !email || !password){
            return res.status(400).send('error en validacion de datos');
        }          
    } catch (error) {
        return next(error);
    }
    
    //guardar en bd
    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        //rta
        res.status(200).json(usuarioGuardado);
    } catch (error) {
        return next(error);
    }

}


const obtenerTodosLosUsuarios = async (req,res,next) => {
    try {
        const todosUsuarios = await Usuario.find();
        res.status(200).json(todosUsuarios);   
    } catch (error) {
        return next(error)
    }
}

const autenticarUsuario = async (req,res,next) => {
    const { email , password } = req.body;

    try {
    //verificamos que exista email en bd
    const user = await Usuario.findOne({email});
    if(!user){
        return res.status(400).json({msg: 'Error email no registrado'});
    }

    //verificamos contrasenia
    if (await user.comprobarContraseña(password)){
        return res.status(200).json({ token:generarJWT(user.id) });
    }else{
        return res.status(400).json({msg: 'contrasenia incorrecta'});
    }
    } catch (error) {
        return next(error)
    }
}

export {
    crearUsuario,
    obtenerTodosLosUsuarios,
    autenticarUsuario
}