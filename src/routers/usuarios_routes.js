import {Router} from 'express';
import {LoginUsuarioAdministrador, VisualizarPerfil, RegistrarEstudiante, VisualizarEstudiantes, BuscarEstudiantePorCedula, ActualizarEstudiante, 
    EliminarEstudiante,  RegistrarMateria, VisualizarMaterias, BuscarMateriasPorNombre, ActualizarMateria, EliminarMateria,
    RegistrarMatricula, BuscarEstudianteConSusMaterias, BuscarMateriasYSusEstudiantes, ActualizarMatricula, EliminarMatricula
} from '../controllers/usuarios_controller.js';    
import { verificacionToken, verificacionUsuarioAdministrador } from "../middlewares/autho.js";
import { validacionesRegistroEstudiantes, validacionesActualizacionEstudiantes, validacionesRegistroMaterias, validacionesActualizarMaterias,
    validacionesRegistroMatriculas
 } from '../middlewares/validaciones.js';
const router = Router(); 
//Rutas públicas
router.post('/login', LoginUsuarioAdministrador);

//Rutas privadas para admin
router.get('visualizar/perfil', verificacionToken, verificacionUsuarioAdministrador, VisualizarPerfil);

//Rutas privadas para estudiantes
router.post('/registrar/estudiantes', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroEstudiantes, RegistrarEstudiante);
router.get('/listado/estudiantes', verificacionToken, verificacionUsuarioAdministrador, VisualizarEstudiantes);
router.get('/buscar/estudiantes', verificacionToken, verificacionUsuarioAdministrador, BuscarEstudiantePorCedula);
router.patch('/actualizar/estudiantes/:id', verificacionToken, verificacionUsuarioAdministrador, validacionesActualizacionEstudiantes, ActualizarEstudiante);
router.delete('/eliminar/estudiantes/:id', verificacionToken, verificacionUsuarioAdministrador, EliminarEstudiante);

//Rutas privadas para materias
router.post('/registrar/materias', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroMaterias, RegistrarMateria);
router.get('/listado/materias', verificacionToken, verificacionUsuarioAdministrador, VisualizarMaterias);
router.get('/buscar/materias', verificacionToken, verificacionUsuarioAdministrador, BuscarMateriasPorNombre);
router.patch('/actualizar/materias/:id', verificacionToken, verificacionUsuarioAdministrador, validacionesActualizarMaterias, ActualizarMateria);
router.delete('/eliminar/materias/:id', verificacionToken, verificacionUsuarioAdministrador, EliminarMateria);

//Rutas privadas para matricular 
router.post('/registrar/matricula', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroMatriculas, RegistrarMatricula); 
router.get('/listado/estudiantes/materias', verificacionToken, verificacionUsuarioAdministrador, BuscarEstudianteConSusMaterias);
router.get('/listado/materias/estudiantes', verificacionToken, verificacionUsuarioAdministrador, BuscarMateriasYSusEstudiantes);
router.patch('/actualizar/matricula/:id', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroMatriculas, ActualizarMatricula);
router.delete('/eliminar/matricula/:id', verificacionToken, verificacionUsuarioAdministrador, EliminarMatricula);

export default router