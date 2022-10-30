import Sequelize from "sequelize";
import db from "../db.js";

export const productosdb = db.define('productos', {
    id: {
        primaryKey:true,
        type: Sequelize.INTEGER,
    },
    nombre: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    precio: {
        type: Sequelize.FLOAT
    },
    imagen: {
        type: Sequelize.STRING
    },
    inventario: {
        type: Sequelize.INTEGER
    },
    id_categoria: {
        type: Sequelize.INTEGER
    },
    talle: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.STRING
    },
    slug_producto: {
        type: Sequelize.STRING
    },
})