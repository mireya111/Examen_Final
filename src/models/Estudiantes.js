import {Schema, model} from 'mongoose'

//Definición de la estructura de datos 
const estudianteEsquema = new Schema({
    nombre: {
        type: String,
        required: true
    }, 
    apellido: {
        type: String,
        required: true
    },
    cedula:{
        type: Number,
        required: true
    }, 
    fecha_nacimiento:{
        type: String,
        required: true
    },
    ciudad:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
    },
    {
        timestamps:true
    }
)

export default model('Estudiantes', estudianteEsquema)