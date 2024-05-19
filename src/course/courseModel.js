const mongoose = require('mongoose');

const detailCourse = new mongoose.Schema({
    Elements: [{
        apprentices: [{
            apprenticeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'apprentices',
                required: true
            }
        }],
        instructors: [{
            instructorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref : 'instructors',
                required: true
            }
        }],
    }],
}, {timestamps :true});



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
        validate: {
            validator: function(value) {
                // Ejemplo de una validación personalizada
                return !/[^a-zA-Z0-9\s.,;:()\-]/.test(value);
            },
            message: 'La descripción contiene caracteres no permitidos'
        }
    },
    startDate: {
        type: Date,
        required: true
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
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: {
            values: ['En proceso', 'Terminado', 'Cancelado'],
            message: '{VALUE} no es un estado válido'
        }
    },
    detail: [detailCourse],
}, { timestamps: true });

const Course = mongoose.model('courses', courseSchema);

module.exports = Course;