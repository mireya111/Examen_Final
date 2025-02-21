import { createToken } from "../middlewares/autho.js";
import Usuarios from "../models/Usuarios.js";
import Estudiantes from "../models/Estudiantes.js";


//Controlador para el logeo del usuario administrador
const LoginUsuarioAdministrador = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {email, password} = req.body
    console.log(email, " ", password)
    //Verificación de que los datos no estén vacíos
    if(email === '' || password === ''){
        return res.status(400).json({message: 'Por favor llene todos los campos'})
    }
    //Verificación de que el usuario exista
    const usuario = await Usuarios.findOne({email: email}).select('-__v -createdAt -updatedAt')
    if(!usuario){
        return res.status(400).json({message: 'Usuario no encontrado'})
    }
    //Verificación de que la contraseña sea correcta
    const verificacionDeContrasenia = await usuario.matchPassword(password)
    if(verificacionDeContrasenia){
        //Token JWT
        const token = createToken({id: usuario._id, email: usuario.email, role: "admin"})
        return res.status(200).json({token, info_logeado: usuario})
    } else{
        return res.status(400).json({message: 'Contraseña incorrecta'})
    }
}

//CRUD estudiantes 
//Controlador para registrar un nuevo estudiante
const registrarEstudiante = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email} = req.body
    //Verificación de que los datos no estén vacíos
    if(nombre === '' || apellido === '' || cedula === '' || fecha_nacimiento === '' || ciudad === '' || direccion === '' || telefono === '' || email === ''){
        return res.status(400).json({message: 'Por favor llene todos los campos'});
    }
    //Verificación de que el usuario no exista
    const estudiante = await Estudiantes.findOne({email: email})
    if(estudiante){
        return res.status(400).json({message: 'El email ya está registrado'});
    }
    //Verificación de que el telefono no esté registrada
    const estudianteTelefono = await Estudiantes.findOne({telefono: telefono});
    if(estudianteTelefono){
        return res.status(400).json({message: 'El telefono ya está registrado'});
    }
    //Verificación de que la cedula no esté registrada
    const estudianteCedula = await Estudiantes.findOne({cedula: cedula});
    if(estudianteCedula){
        return res.status(400).json({message: 'La cedula ya está registrada'});
    }
    //Creación de un nuevo estudiante
    const nuevoEstudiante = new Estudiantes({
        nombre: nombre, 
        apellido: apellido, 
        cedula: cedula, 
        fecha_nacimiento: fecha_nacimiento, 
        ciudad: ciudad, 
        direccion: direccion, 
        telefono: telefono, 
        email: email
    })
    //Guardado en la base de datos
    await nuevoEstudiante.save()
    return res.status(201).json({message: 'Estudiante registrado exitosamente'})
}

//Controlador para visualizar estudiantes
const visualizarEstudiantes = async (req, res) => {
    //Buscar todos los estudiantes 
    const estudiantes = await Estudiantes.find()
    return res.status(200).json({todos_estudiantes: estudiantes});
}

export {
    LoginUsuarioAdministrador,
    registrarEstudiante, 
    visualizarEstudiantes
}