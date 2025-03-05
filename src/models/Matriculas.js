import mongoose, {Schema, model} from 'mongoose';
//Definición de la estructura de datos
const matriculasEsquema = new Schema({
    id_estudiante: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Estudiantes',
        required: true
    },
    id_materia: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Materias',
        required: true
    },
    codigo:{
        type:Number,
        required: true
    }, 
    descripcion:{
        type: String,
        required: true
        
    },
    },
    {
        timestamps: true
    }
); 
matriculasEsquema.pre('save', function (next) {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const numeroDocumentos = Matriculas.find().countDocuments();
    const numeroConCeros = (numeroDocumentos + 1).toString().padStart(4, '0');
    this. codigo =  `${anio}-${numeroConCeros}`;
    next()
});
export default model('Matriculas', matriculasEsquema); 
