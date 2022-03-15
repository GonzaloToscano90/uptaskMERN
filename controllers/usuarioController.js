import Usuario from '../models/Usuario.js'

// crear un nuevo usuario e insertarlo a la base de datos
const registrar = async (req, res) => {
    // Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email }); //find trae todos los usuarios registrados- findOne= encuentra el primero que coincida con {email}

        if (existeUsuario) {
            const error = new Error("Usuario ya Registrado")
            return res.status(400).json({msg: error.message})
        }

    try {
        const usuario = new Usuario(req.body)
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error)
    }

    
}

export {registrar} 