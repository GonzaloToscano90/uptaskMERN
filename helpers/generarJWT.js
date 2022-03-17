import jwt from "jsonwebtoken";

//sing crea un JWT primer parametro = lo que va a colocar en el jwt. luego toma la palabra secreta y finalmente toma un objeto con opciones.
const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", //Cuanto tiempo va a estar vigente este jwt
  });
};

export default generarJWT;
