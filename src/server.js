// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerUsuario from './routers/usuarios_routes.js';

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.PORT || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Ruta para verificar que el servidor esta corriendo 
app.get('/',(req,res)=>{
    res.send("El servidor para el examen final esta corriendo")
})

// Rutas
app.use('/api', routerUsuario)

// Exportar la instancia de express por medio de app
export default  app;