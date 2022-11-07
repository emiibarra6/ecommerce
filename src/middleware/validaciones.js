import Joi from 'joi'

const validator = (schema) => (payload) =>
  schema.validate(payload, {abortEarly:false})

const productoSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().max(100).required(),
  precio:Joi.number().required(),
  imagen:Joi.string().required(),
  inventario: Joi.number().required(),
  id_categoria: Joi.number().integer(),
  talle: Joi.string().min(3).max(100).required(),
  color: Joi.string().min(3).max(100).required()
})

const categoriasSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().max(100).required(),
  imagen:Joi.string().required(),
})

const adminSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirmarPassword: Joi.ref('password'),
})
  

export const validarProductos = validator(productoSchema)
export const validarCategorias = validator(categoriasSchema)
export const validarAdmin = validator(adminSchema)