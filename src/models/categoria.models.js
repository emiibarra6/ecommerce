import { DataTypes } from "sequelize";
import db from "../db.js";

export const categoriadb = db.define('categorias', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: {
                args: [3,50],
                msg: "El nombre de la categoria tiene que ser entre 3 y 50 caracteres"
            }
        },  
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    slug_categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
})