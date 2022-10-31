import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const schemaUsuario = new mongoose.Schema({
    nombre: {
        type:String,
        trim:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    token:{
        type:String
    },
    
})

//antes de guardar al usuario hasheamos la pass.
schemaUsuario.pre('save' , async function (next) {
    if (!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
})

//Comprobar contraseñas.
schemaUsuario.methods.comprobarContrasenia = async function(passwordForm){
    return await bcrypt.compare(passwordForm, this.password)
}

const Usuario = mongoose.model('usuarioCollection' , schemaUsuario )
export default Usuario;