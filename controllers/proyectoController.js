import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = async(req, res) => {
    //.find() trae todos los proyectos  .where().equals() traemos oslo los creados por ese usuario
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario);

    res.json(proyectos);
};
const nuevoProyecto = async(req, res) => {
    // console.log(req.body);
    // console.log(req.usuario)
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
};
const obtenerProyecto = async(req, res) => {
    const { id } = req.params;

    const proyecto = await Proyecto.findByid(id);

    if (!proyecto) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message });
    }

    res.json(proyecto);

};
const editarProyecto = async(req, res) => {};
const eliminarProyecto = async(req, res) => {};
const agregarColaborador = async(req, res) => {};
const eliminarColaborador = async(req, res) => {};
const obtenerTareas = async(req, res) => {};

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas,
};