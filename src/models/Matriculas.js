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
        type:Number
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
export default model('Matriculas', matriculasEsquema); 
