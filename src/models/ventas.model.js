import { DataTypes } from 'sequelize'
import db from '../db.js'

export const ventasdb = db.define('ventas', {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate:{
      isNumeric: {
        msg: 'Solo acepta numeros'
      },
    },  
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },

})