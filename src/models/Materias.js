import {Schema, model} from 'mongoose'

//Definición de la estructura de datos 
const estudianteEsquema = new Schema({
    nombre: {
        type: String,
        required: true
    }, 
    codigo: {
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    }, 
    creditos:{
        type: Number,
        required: true
    }
    },   
    {
        timestamps:true
    }

)

export default model('Estudiantes', estudianteEsquema)