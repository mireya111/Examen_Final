import { createToken } from "../middlewares/autho.js";
import Usuarios from "../models/Usuarios.js";
import Estudiantes from "../models/Estudiantes.js";
import Materias from "../models/Materias.js";
import Matriculas from "../models/Matriculas.js";


//Controlador para el logeo del usuario administrador
const LoginUsuarioAdministrador = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {email, password} = req.body
    console.log(email, " ", password)
    //Verificación de que los datos no estén vacíos
    if(email === undefined || password === undefined){
        return res.status(400).json({message: 'Por favor llene todos los campos'})
    }
    //Verificación de que el usuario exista
    const usuario = await Usuarios.findOne({email: email}).select('-__v -createdAt -updatedAt')
    if(!usuario){
        return res.status(400).json({message: 'Usuario o contraseña incorrectos.'})
    }
    console.log(usuario)
    //Verificación de que la contraseña sea correcta
    const verificacionDeContrasenia = await usuario.matchPassword(password)
    console.log(verificacionDeContrasenia)
    if(verificacionDeContrasenia){
        //Token JWT
        const token = createToken({id: usuario._id, email: usuario.email, role: "admin"})
        console.log(token)
        return res.status(200).json({token: token})
    } else{
        return res.status(400).json({message: 'Usuario o contraseña incorrectos.'})
    }
}

//Controlador para visualizar el perfil del usuario
const VisualizarPerfil = async (req, res) => {
    const {id} = req.user
    const usuario = await Usuarios.findById(id).select('-__v -createdAt -updatedAt -password')
    return res.status(200).json({usuario: usuario})
}

//CRUD estudiantes 
//Controlador para registrar un nuevo estudiante
const RegistrarEstudiante = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email} = req.body
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
const VisualizarEstudiantes = async (req, res) => {
    //Buscar todos los estudiantes 
    const estudiantes = await Estudiantes.find()
    return res.status(200).json({todos_estudiantes: estudiantes});
}

//Buscar un estudiante por su id
const BuscarEstudiantePorCedula = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {cedula} = req.params
    //Verificación de que la cedula no esté vacía
    if(cedula === ''){
        return res.status(400).json({message: 'Por favor coloque una cedula para buscar el estudiante'});
    }
    //Buscar el estudiante por su cedula
    const estudiante = await Estudiantes.findOne({cedula:cedula}); 
    return res.status(200).json({estudiante: estudiante});
}

//Actualizar un estudiante          
const ActualizarEstudiante = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {id} = req.params
    const { ciudad, direccion, telefono, email} = req.body
    //Vertificación del telefono 
    const estudianteTelefono = await Estudiantes.findOne({telefono: telefono});
    if(estudianteTelefono){
        return res.status(400).json({message: 'El telefono ya está registrado'});
    }
    //Verificación del email
    const estudianteEmail = await Estudiantes.findOne({email: email});
    if(estudianteEmail){
        return res.status(400).json({message: 'El email ya está registrado'});
    }
    //Actualizar un estudiante
    await Estudiantes.findByIdAndUpdate(id,req.body)
    return res.status(201).json({message: 'Estudiante actualizado exitosamente'})
}

//Eliminar a un estudiante
const EliminarEstudiante = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {id} = req.params
    //Verificación de que el id no esté vacío
    if(id === ''){
        return res.status(400).json({message: 'Por favor coloque el id del estudiante'});
    }
    //Eliminar un estudiante
    await Estudiantes.findByIdAndDelete(id)
    return res.status(200).json({message: 'Estudiante eliminado exitosamente'})
}

//CRUD DE LAS MATERIAS 
//Controlador para registrar una nueva materia
const RegistrarMateria = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {nombre, codigo, descripcion, creditos} = req.body
    //Verificación de que la materia no exista
    const materia = await Materias.findOne({codigo: codigo})
    if(materia){
        return res.status(400).json({message: 'El código de la materia ya está registrado'});
    }
    //Creación de una nueva materia
    const nuevaMateria = new Materias({
        nombre: nombre, 
        codigo: codigo, 
        descripcion: descripcion, 
        creditos: creditos
    })
    //Guardado en la base de datos
    await nuevaMateria.save()
    return res.status(200).json({message: 'Materia registrada exitosamente'})
}

//Listar todas las materias 
const VisualizarMaterias = async (req, res) => {
    //Buscar todas las materias
    const materias = await Materias.find()
    return res.status(200).json({todas_materias: materias});
}

//Buscar una materia por su id
const BuscarMateriasPorNombre = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {nombre} = req.params
    //Verificación de que el nombre no esté vacío
    if(nombre === ''){
        return res.status(400).json({message: 'Por favor coloque el nombre de la materia que desea buscar'});
    }
    //Buscar la materia por su id
    const materia = await Materias.findById(id)
    return res.status(200).json({materia: materia});
}

//Actualizar una materia       
const ActualizarMateria = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {id} = req.params
    const { nombre, descripcion, creditos} = req.body
    //Actualizar una materia
    await Materias.findByIdAndUpdate(id,req.body)
    return res.status(201).json({message: 'Materia actualizada exitosamente'})
}

//Eliminar una materia
const EliminarMateria = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {id} = req.params
    //Verificación de que el id no esté vacío
    if(id === ''){
        return res.status(400).json({message: 'Por favor coloque el id de la materia que desea eliminar'});
    }
    //Eliminar una materia
    await Materias.findByIdAndDelete(id)
    return res.status(200).json({message: 'Materia eliminada exitosamente'})
}

//CRUD de matriculas 
//Registrar matriculas 
const RegistrarMatricula = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {id_estudiante, id_materia, descripcion } = req.body
    //Verificación de que el estudiante exista
    const estudiante = await Estudiantes.findById(id_estudiante)
    if(!estudiante){
        return res.status(400).json({message: 'El estudiante no existe'});
    }
    //Verificación de que la materia exista
    const materia = await Materias.findById(id_materia)
    if(!materia){
        return res.status(400).json({message: 'La materia no existe'});
    }

    const matriculaExiste = await Matriculas.findOne({id_estudiante: id_estudiante, id_materia: id_materia})
    if(matriculaExiste){
        return res.status(400).json({message: 'El estudiante ya está matriculado en la materia'});
    }

    //Creación de una nueva matricula
    const nuevaMatricula = new Matriculas({
        id_estudiante: id_estudiante, 
        id_materia: id_materia,
        descripcion: descripcion
    })
    //Guardado en la base de datos
    await nuevaMatricula.save()
    return res.status(200).json({message: 'Matricula registrada exitosamente'})
}

//Listar todas las materias de un estudiante
const BuscarEstudianteConSusMaterias = async (req, res) => {
    try {
        const {cedula} = req.params;

        // Verificación de que la cédula no esté vacía
        if (!cedula) {
            return res.status(400).json({message: 'Por favor proporcione la cédula del estudiante'});
        }

        // Buscar estudiante por cédula
        const estudiante = await Estudiantes.findOne({cedula});
        if (!estudiante) {
            return res.status(404).json({message: 'No se encontraron estudiantes con la cédula proporcionada'});
        }

        // Buscar las matrículas del estudiante y popular la información de las materias
        const matriculas = await Matriculas.find({id_estudiante: estudiante._id}).populate('id_materia');
        if (matriculas.length === 0) {
            return res.status(404).json({message: 'No se encontraron materias inscritas para el estudiante'});
        }

        // Acumular todas las materias inscritas
        const materias = [];
        for (const matricula of matriculas) {
            materias.push(matricula.id_materia.nombre);
        }

        return res.status(200).json({materias_inscritas: materias});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Error al buscar las materias del estudiante'});
    }
}

//Listar todos los estudiantes de una materia
const BuscarMateriasYSusEstudiantes = async (req, res) => {
    try {
        const {nombre} = req.params;

        // Verificación de que el nombre no esté vacío
        if (!nombre) {
            return res.status(400).json({message: 'Por favor proporcione el nombre de la materia'});
        }

        // Buscar la materia por nombre
        const materia = await Materias.findOne({nombre});
        if (!materia) {
            return res.status(404).json({message: 'No se encontró la materia con el nombre proporcionado'});
        }

        // Buscar las matrículas de la materia y popular la información de los estudiantes
        const matriculas = await Matriculas.find({id_materia: materia._id}).populate('id_estudiante');
        
        // Verificación de que la materia tenga estudiantes inscritos
        if (matriculas.length === 0) {
            return res.status(404).json({message: 'No se encontraron estudiantes inscritos en la materia'});
        }

        // Extraer los nombres de los estudiantes usando un bucle for
        const estudiantes = [];
        for (const matricula of matriculas) {
            estudiantes.push(matricula.id_estudiante.nombre);
        }
        const numeroEstudiantes = estudiantes.length;

        return res.status(200).json({estudiantes_inscritos: estudiantes, total_estudiantes: numeroEstudiantes});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Error al buscar los estudiantes inscritos en la materia'});
    }
}

const ActualizarMatricula = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {id} = req.params
    //Extracción de los parametros de la solicitud 
    const {id_estudiante, id_materia, descripcion} = req.body
    //Verificación de que el estudiante exista
    const estudiante = await Estudiantes.findById(id_estudiante)
    if(!estudiante){
        return res.status(400).json({message: 'El estudiante no existe'});
    }
    //Verificación de que la materia exista
    const materia = await Materias.findById(id_materia)
    if(!materia){
        return res.status(400).json({message: 'La materia no existe'});
    }

    const matriculaExiste = await Matriculas.findOne({id_estudiante: id_estudiante, id_materia: id_materia})
    if(matriculaExiste){
        return res.status(400).json({message: 'El estudiante ya está matriculado en la materia'});
    }
    //Actualizar una matricula
    await Matriculas.findByIdAndUpdate(id,req.body); 
    return res.status(201).json({message: 'Matricula actualizada exitosamente'})
}

const EliminarMatricula = async (req, res) => {
    //Extracción de los parametros de la solicitud 
    const {id} = req.params
    //Verificación de que el id no esté vacío
    if(id === ''){
        return res.status(400).json({message: 'Por favor coloque el id de la matricula que desea eliminar'});
    }
    //Eliminar una matricula
    await Matriculas.findByIdAndDelete(id)
    return res.status(200).json({message: 'Matricula eliminada exitosamente'})  
}

export {
    LoginUsuarioAdministrador,
    VisualizarPerfil,
    RegistrarEstudiante,
    VisualizarEstudiantes,
    BuscarEstudiantePorCedula,
    ActualizarEstudiante,
    EliminarEstudiante, 
    RegistrarMateria, 
    VisualizarMaterias, 
    BuscarMateriasPorNombre, 
    ActualizarMateria, 
    EliminarMateria, 
    RegistrarMatricula, 
    BuscarEstudianteConSusMaterias, 
    BuscarMateriasYSusEstudiantes,
    ActualizarMatricula, 
    EliminarMatricula
}
