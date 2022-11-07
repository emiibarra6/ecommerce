import jwt from 'jsonwebtoken'
import Admin from '../models/admin.model.js'

const checkAuth  = async (req,res,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    //Creamos la sesion:
    req.usuario = await Admin.findById(decoded.id).select('-password')
    return next()
  } catch (error) {
    throw new Error('No autorizado')
  }
}

export default checkAuth