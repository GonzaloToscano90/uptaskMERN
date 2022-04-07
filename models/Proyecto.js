import mongoose from "mongoose";

const proyectoSchema = mongoose.Schema({
    nombre: {
        type: "string",
        trim: true,
        required: true,
    },
    descripcion: {
        type: "string",
        trim: true,
        required: true,
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
    },
    cliente: {
        type: "string",
        trim: true,
        required: true,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    colaboradores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    }, ],
}, {
    timestamps: true, //crea las columnas de createAdt y updateADT en mongo
});

const Proyecto = mongoose.model("Proyecto", proyectoSchema);
export default Proyecto;