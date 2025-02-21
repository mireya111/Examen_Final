import {Schema, model} from 'mongoose'; 
import bcrypt from 'bcryptjs';

const usuariosEsquema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    }, 
    {
        timestamps:true
    }
)
// Método para cifrar el password del conductor
usuariosEsquema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
usuariosEsquema.methods.matchPassword = async function(passwordIngresada){
    const response = await bcrypt.compare(passwordIngresada,this.password)
    return response
}

//Metodo para ingresar apenas inicie el servidor un conductor administrador que registrará a los demás conductores
usuariosEsquema.statics.ingresarUsuarioQuemado= async function(){
    const usuarioAdmin = await this.findOne({email:  process.env.EMAIL_ADMIN}); 
    const contraseniaQuemada = process.env.EMAIL_PASSWORD; 

    if(!usuarioAdmin){
        const usuarioAdminNuevo = new this({
            nombre: 'Mireya',
            apellido: 'García',
            email: process.env.EMAIL_ADMIN, 
            password: contraseniaQuemada
        });

        //Encriptar la contraseña anteriormente quemada
        usuarioAdminNuevo.password = await usuarioAdminNuevo.encrypPassword(contraseniaQuemada);

        //Guardar en la base de datos 
        await usuarioAdminNuevo.save();

        console.log('Administrador creado exitosamente');
    } else{
        console.log('El conductor administrador ya existe');
    }
}
export default model('Usuarios', usuariosEsquema);