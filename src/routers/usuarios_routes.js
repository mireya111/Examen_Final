import {Router} from 'express';
import {LoginUsuarioAdministrador, RegistrarEstudiante, VisualizarEstudiantes, BuscarEstudiantePorId, ActualizarEstudiante, 
    EliminarEstudiante,  RegistrarMateria, VisualizarMaterias, BuscarMateriasPorId, ActualizarMateria, EliminarMateria} from '../controllers/usuarios_controller.js';    
import { verificacionToken, verificacionUsuarioAdministrador } from "../middlewares/autho.js";
import { validacionesRegistroEstudiantes, validacionesActualizacionEstudiantes, validacionesRegistroMaterias, validacionesActualizarMaterias } from '../middlewares/validaciones.js';
const router = Router(); 
//Rutas públicas
router.post('/login', LoginUsuarioAdministrador);
//Rutas privadas para estudiantes
router.post('/registrar/estudiantes', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroEstudiantes, RegistrarEstudiante);
router.get('/listado/estudiantes', verificacionToken, verificacionUsuarioAdministrador, VisualizarEstudiantes);
router.get('/buscar/estudiantes/:id', verificacionToken, verificacionUsuarioAdministrador, BuscarEstudiantePorId);
router.put('/actualizar/estudiantes/:id', verificacionToken, verificacionUsuarioAdministrador, validacionesActualizacionEstudiantes, ActualizarEstudiante);
router.delete('/eliminar/estudiantes/:id', verificacionToken, verificacionUsuarioAdministrador, EliminarEstudiante);

//Rutas privadas para materias
router.post('/registrar/materias', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroMaterias, RegistrarMateria);
router.get('/listado/materias', verificacionToken, verificacionUsuarioAdministrador, VisualizarMaterias);
router.get('/buscar/materias/:id', verificacionToken, verificacionUsuarioAdministrador, BuscarMateriasPorId);
router.put('/actualizar/materias/:id', verificacionToken, verificacionUsuarioAdministrador, validacionesActualizacionEstudiantes, ActualizarMateria);
router.delete('/eliminar/materias/:id', verificacionToken, verificacionUsuarioAdministrador, EliminarMateria);

//Rutas privadas para matricular 

export default router