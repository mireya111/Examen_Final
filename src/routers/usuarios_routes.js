import {Router} from 'express';
import {LoginUsuarioAdministrador, registrarEstudiante, visualizarEstudiantes } from '../controllers/usuarios_controller.js';    
import { verificacionToken, verificacionUsuarioAdministrador } from "../middlewares/autho.js";
import { validacionesRegistroEstudiantes } from '../middlewares/validaciones.js';
const router = Router(); 
//Rutas públicas
router.post('/login', LoginUsuarioAdministrador);
//Rutas privadas
router.post('/registrar/estudiantes', verificacionToken, verificacionUsuarioAdministrador, validacionesRegistroEstudiantes, registrarEstudiante);
router.get('/listado/estudiantes', verificacionToken, verificacionUsuarioAdministrador, visualizarEstudiantes);

export default router