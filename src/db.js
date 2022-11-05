import Sequelize from 'sequelize'
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv'

dotenv.config()
const db = await new Sequelize(process.env.DATABASE_URL , {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true 
    }
  },
  define: {
    timestamps: false,
    //agregaba una 's' al final de cada tabla, dolor de cabeza detect.😁
    freezeTableName:true
  },
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000
  },
  operatorAliases:false,
})

export default db