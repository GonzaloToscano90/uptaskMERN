import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Schema estructura de la base de datos
const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: "string",
      required: true,
      trim: true, //elimina los espacios del inicio y final
    },
    password: {
      type: "string",
      required: true,
      trim: true,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: "string",
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
      timestamps: true, //crea dos columnas mas: una de creado y otra de actualizado
  }
);
// Este codigo con pre() se ejecutara antes de añmacenar el registro en la bd 
usuarioSchema.pre('save', async function (next){
  if(!this.isModified('password')) { // isModified= funcion de mongoose, revisa que el password no alla sido cambiado
    next(); // te manda al siguiente middelware
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

//Definir modelo:
const Usuario = mongoose.model("Usuario",usuarioSchema);

export default Usuario;
