import mongoose from 'mongoose'; 
import Usuarios from './models/Usuarios.js';


mongoose.set('strictQuery', true);

const connection = async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_BASE_DE_DATOS);
        console.log(`Database is connected on ${connection.host} - ${connection.port}`);

        //Registrar un admin quemado
        await Usuarios.ingresarUsuarioQuemado();

    } catch (error) {
        console.log(error);
    }
}

export default  connection