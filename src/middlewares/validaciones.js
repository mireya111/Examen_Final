import { check, validationResult } from 'express-validator';
import moment from 'moment';
const validacionesRegistroEstudiantes = [
    // Verificar que se encuentren los campos obligatorios y no estén vacíos
    check(["nombre","apellido","telefono","cedula", "fecha_nacimiento", "ciudad", "direccion", "email"])
    .exists()
        .withMessage('Los campos "nombre", "apellido", "telefono", "cedula", "fecha_nacimiento", "ciudad", "direccion" y/o "email"  son obligatorios')
    .notEmpty()
        .withMessage('Los campos "nombre", "apellido", "telefono", "cedula", "fecha_nacimiento", "ciudad", "direccion" y/o "email" no pueden estar vacíos')
    .customSanitizer(value => value?.trim()),

    //Verificación de que todo sea un string
    check(["nombre", "apellido", "ciudad"])
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El campo debe ser un texto y puede contener espacios')
    .customSanitizer(value => value?.trim()),

    // Verificar que el numero de telefono sea de 10 digitos
    check("telefono")
    .isLength({ min: 10, max: 10 })
        .withMessage('El teléfono debe ser de 10 digitos')
    .matches(/^\d{10}$/)
        .withMessage('El campo "teléfono" debe contener solo números')
    .customSanitizer(value => value?.trim()),

    // Verificar que el número de cédula tenga 10 dígitos
    check("cedula")
    .isLength({ min: 10, max: 10 })
        .withMessage('La cedula debe ser de 10 digitos')
    .isNumeric()
        .withMessage('El campo "teléfono" debe contener solo números')
    .customSanitizer(value => value?.trim()), 

    // Verificación de la fecha de nacimiento
    check("fecha_nacimiento")
    .isString()
        .withMessage('La fecha de nacimiento debe ser una cadena de texto')
    .custom((value) => {
        const fechaNacimiento = moment(value, 'YYYY-MM-DD');
        const fechaMinima = moment().subtract(120, 'years'); // Fecha mínima: hace 120 años
        const fechaMaxima = moment(); // Fecha máxima: hoy

        if (!fechaNacimiento.isValid() || fechaNacimiento.isBefore(fechaMinima) || fechaNacimiento.isAfter(fechaMaxima)) {
            throw new Error('La fecha de nacimiento debe ser una fecha válida y no puede ser ni muy antigua ni futura');
        }
        return true;
    })
    .customSanitizer(value => value?.trim()),
    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]

export {
    validacionesRegistroEstudiantes
}