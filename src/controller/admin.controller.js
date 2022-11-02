import Admin from '../models/admin.model.js';
import generarJWT from '../helpers/generarJWT.js';

const crearAdmin =  async (req,res,next) => {
    const {nombre,email,password} = req.body;
    
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
        const admin = new Admin(req.body);
        const adminSave = await admin.save();

        //rta
        res.status(200).json(adminSave);
    } catch (error) {
        return next(error);
    }

}


const obtenerTodosLosAdmin = async (req,res,next) => {
    try {
        const todosAdmin = await Admin.find();
        res.status(200).json(todosAdmin);   
    } catch (error) {
        return next(error)
    }
}

const autenticarAdmin = async (req,res,next) => {
    const { email , password } = req.body;

    try {
    //verificamos que exista email en bd
    const admin = await Admin.findOne({email});
    if(!admin){
        return res.status(400).json({msg: 'Error email no registrado'});
    }

    //verificamos contrasenia
    if (await admin.comprobarContrasenia(password)){
        return res.status(200).json({ token:generarJWT(admin._id) });
    }else{
        return res.status(400).json({msg: 'contrasenia incorrecta'});
    }
    } catch (error) {
        return next(error)
    }
}

export {
    crearAdmin,
    obtenerTodosLosAdmin,
    autenticarAdmin
}