import { DataTypes } from 'sequelize'
import db from '../db.js'
import ventas from './ventas.model.js'
import productos from './productos.models.js'

export const ventasDetalledb = db.define('ventas_detalle', {
  id_venta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
      isNumeric: {
        msg: 'Solo acepta numeros'
      },
    },  
  },
  precio:{
    type: DataTypes.FLOAT,
    allowNull:false,
    validate:{
      isNumeric: {
        msg: 'Solo acepta numeros'
      },
    },  
  },
  subtotal:{
    type: DataTypes.FLOAT,
    allowNull:false,
    validate:{
      isNumeric: {
        msg: 'Solo acepta numeros'
      },
    },  
  },
  
}, 
//relaciones
ventasDetalledb.belongsTo(ventas, {foreignKey: 'id_venta'}),
ventas.hasMany(ventasDetalledb, {foreignKey: 'id_venta'}),
ventasDetalledb.belongsTo(productos, {foreignKey: 'id_producto'})

)