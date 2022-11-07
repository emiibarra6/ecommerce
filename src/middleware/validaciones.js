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

exports.validateProductos = validator(productoSchema)