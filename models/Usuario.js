import mongoose from "mongoose";

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

//Definir modelo:
const Usuario = mongoose.model("Usuario",usuarioSchema);

export default Usuario;
