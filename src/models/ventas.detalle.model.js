import { DataTypes } from 'sequelize'
import db from '../db.js'

export const ventasDetalledb = db.define('ventas_detalle', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true,
  },
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
  
})