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
  const usuario = await Usuario.findOne({ email });
  console.log(usuario);
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  // Comprobar si el usuario esta confirmado (Evita los  Bots)
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmado");
    return res.status(403).json({ msg: error.message });
  }
  // Comprobar su Password
  if (await usuario.comprobarPassword(password)) {
    // console.log("Es correcto");
    res.json({
      _id: usuario._id, // se crea un objeto para solo traer estos datos (asi lo maneja mongo)
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params; // lee de la url y extrae el valor del token (para despues enviarselo al usuario por correo)
  const usuarioConfirmar = await Usuario.findOne({ token }); // Buscamos a un usuario con ese token
  //si no existe : token no valido
  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
  // si existe: confirmamos el token con true y eliminamos el token con '' por que es de un solo uso por seguridad
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save(); // almacena en la bd con estos cambios.
    res.json({ msg: "Usuario Confirmado correctamente" });
    // console.log(usuarioConfirmar)
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  console.log(usuario);
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuario.token = generarId();
    // console.log(usuario)
    await usuario.save();
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};
const comprobarToken = async (req, res) => {
  const { token } = req.params; // .params extrae valores de la url

  const tokenValido = await Usuario.findOne({token});

  if (tokenValido){
    // console.log('token valido');
    res.json({ msg: "Token valido y el Usuario existe" });
  }else{
    // console.log('token NO VALIDO');
    const error = new Error("Token no Valido");
    return res.status(404).json({ msg: error.message });
  }
};

export { registrar, autenticar, confirmar, olvidePassword, comprobarToken };
