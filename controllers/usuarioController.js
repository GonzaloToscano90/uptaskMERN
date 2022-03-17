import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

// crear un nuevo usuario e insertarlo a la base de datos
const registrar = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email }); //find trae todos los usuarios registrados- findOne= encuentra el primero que coincida con {email}

  if (existeUsuario) {
    const error = new Error("Usuario ya Registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({email});  
  console.log(usuario)
  if(!usuario){
      const error = new Error("El usuario no existe")
      return res.status(404).json({msg: error.message})
  }
  // Comprobar si el usuario esta confirmado (Evita los  Bots)
  if(!usuario.confirmado){
    const error = new Error("Tu cuenta no ha sido confirmado")
    return res.status(403).json({msg: error.message})
}
  // Comprobar su Password
  if (await usuario.comprobarPassword(password)) {
    // console.log("Es correcto");
    res.json({
      _id: usuario._id, // se crea un objeto para solo traer estos datos (asi lo maneja mongo)
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    })
  } else {
    const error = new Error("El password es incorrecto")
    return res.status(403).json({msg: error.message})
  }

};

export { registrar, autenticar };
