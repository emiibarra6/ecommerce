import { DataTypes } from "sequelize";
import db from "../db.js";

export const productosdb = db.define('productos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: {
                args:true,
                msg: "El nombre del producto solo puede contener letras"
            },
            len: {
                args: [3,50],
                msg: "El nombre del producto tiene que ser entre 3 y 50 caracteres"
            }
        },
        
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    inventario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_categoria: {
        type: DataTypes.INTEGER
    },
    talle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug_producto: {
        type: DataTypes.STRING,
        unique:true
    },
})