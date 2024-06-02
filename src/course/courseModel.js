const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo nombre']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres'],
    },
    location: {
        type: String,
        required: true,
        minlength: [5, 'El lugar debe tener al menos 5 caracteres'],
        maxlength: [500, 'El lugar no puede tener más de 500 caracteres'],
        validate: {
            validator: function(value) {
                // Ejemplo de una validación personalizada
                return !/[^a-zA-Z0-9\s.,;:()\-]/.test(value);
            }, 
            message: 'El lugar contiene caracteres no permitidos'
        }
    },
    time: { 
        type:String,
        required: [true, 'El campo de tiempo del curso es requerido'],
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value); // La cédula debe contener solo números positivos
            },
            message: 'La cédula debe contener solo números'
        }
    },
    state: {
        type: String,
        required: true,
        enum: ['Terminado', 'En proceso', 'No iniciado', 'Cancelado'],
        default: 'No iniciado'
    }
}, { timestamps: true });

const Course = mongoose.model('courses', courseSchema);

module.exports = Course;