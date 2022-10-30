import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';

const checkAuth  = async (req,res,next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        //Creamos la sesion:
            req.usuario = await Usuario.findbyid(decoded.id).select('-password');
            return next();
    } catch (error) {
        const err = new Error('Token no valido o inexistente');
        return res.status(403).json({msg: err.message})
    }
}

export default checkAuth;