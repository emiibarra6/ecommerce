import express from 'express'
import dotenv from 'dotenv'
import routerApi from './src/routes/index.routes.js'
import db from './src/db.js';
import helmet from 'helmet';
import morgan from 'morgan';
import { notFound } from './src/middleware/notFound.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import conectarDBMongo from './src/dbMongo.js'


async function main(){
  dotenv.config();

  // ------------------ conectar a base de datos ------------------- //
  try {
      await db.authenticate();
      console.log('Connection has been established successfully in SQL database.');
      await conectarDBMongo();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
  // ------------------ fin conectar a base de datos ------------------- //


  // ---------------- express --------------- //
  const app = new express();
  app.use(express.json());

  //aplicamos seguridad en nuestra app
  app.use(helmet());

  //logger morgan
  app.use(morgan('tiny'));

  routerApi(app)

  //Aplicamos Middleware a toda la app para rutas no encontradas.
  app.use(notFound);

  //Manejamos errores
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000
  app.listen(PORT , () => {
      console.log(`running in port ${PORT}`)
  })
  // ---------------- fin express --------------- //
}

main();
