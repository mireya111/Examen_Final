import {Router} from 'express';
import {LoginUsuarioAdministrador, VisualizarPerfil, RegistrarEstudiante, VisualizarEstudiantes, BuscarEstudiantePorId, ActualizarEstudiante, 
    EliminarEstudiante,  RegistrarMateria, VisualizarMaterias, BuscarMateriasPorId, ActualizarMateria, EliminarMateria,
    RegistrarMatricula, BuscarEstudianteConSusMaterias, BuscarMateriasYSusEstudiantes, ActualizarMatricula, EliminarMatricula
} from '../controllers/usuarios_controller.js';    
import { verificacionToken, verificacionUsuarioAdministrador } from "../middlewares/autho.js";
import { validacionesRegistroEstudiantes, validacionesActualizacionEstudiantes, validacionesRegistroMaterias, validacionesActualizarMaterias,
    validacionesRegistroMatriculas
 } from '../middlewares/validaciones.js';
const router = Router(); 
//Rutas públicas
router.post('/login', LoginUsuarioAdministrador);

//Rutas privadas para administradores
router.get('/visualizar/perfil', verificacionToken, verificacionUsuarioAdministrador, VisualizarPerfil); 

//Rutas privadas para estudiantes
router.post('/registrar/estudiantes', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroEstudiantes, RegistrarEstudiante);
router.get('/listado/estudiantes', verificacionToken, verificacionUsuarioAdministrador, VisualizarEstudiantes);
router.get('/buscar/estudiantes/:id', verificacionToken, verificacionUsuarioAdministrador, BuscarEstudiantePorId);
router.patch('/actualizar/estudiantes/:id', verificacionToken, verificacionUsuarioAdministrador, validacionesActualizacionEstudiantes, ActualizarEstudiante);
router.delete('/eliminar/estudiantes/:id', verificacionToken, verificacionUsuarioAdministrador, EliminarEstudiante);

//Rutas privadas para materias
router.post('/registrar/materias', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroMaterias, RegistrarMateria);
router.get('/listado/materias', verificacionToken, verificacionUsuarioAdministrador, VisualizarMaterias);
router.get('/buscar/materias/:id', verificacionToken, verificacionUsuarioAdministrador, BuscarMateriasPorId);
router.patch('/actualizar/materias/:id', verificacionToken, verificacionUsuarioAdministrador, validacionesActualizarMaterias, ActualizarMateria);
router.delete('/eliminar/materias/:id', verificacionToken, verificacionUsuarioAdministrador, EliminarMateria);

//Rutas privadas para matricular 
router.post('/registrar/matricula', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroMatriculas, RegistrarMatricula); 
router.get('/listado/matriculas/:id', verificacionToken, verificacionUsuarioAdministrador, BuscarEstudianteConSusMaterias);
router.get('/listado/materias/:codigo', verificacionToken, verificacionUsuarioAdministrador, BuscarMateriasYSusEstudiantes);
router.patch('/actualizar/matricula/:id', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroMatriculas, ActualizarMatricula);
router.delete('/eliminar/matricula/:id', verificacionToken, verificacionUsuarioAdministrador, EliminarMatricula);

export default router