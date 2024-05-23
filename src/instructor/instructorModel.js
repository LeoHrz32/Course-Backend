const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true , 'El nombre del instructor es requerido'],
        trim: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo nombre'], // Elimina espacios en blanco al principio y al final
    },
    lastName: {
        type: String,
        required: true,
        trim: [true , 'El apellido del instructor es requerido'],
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo apellidos']
    },
    documentType: {
        type: String,
        required: [true , 'El tipo de documento es requerido'],
        enum: {
            values: ['Cedula', 'Tarjeta de identidad', 'Otro'],
            message: '{VALUE} no es un tipo de documento válido'
        }
    },
    documentNumber: {
        type: Number,
        required: [true, 'El campo cedula es requerido'],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value); // La cédula debe contener solo números positivos
            },
            message: 'La cédula debe contener solo números'
        }// Garantiza que cada número de documento sea único
    },
    phoneNumber: {
        type: Number,
        required: [true , 'El teléfono es obligatorio'],
        validate: {
            validator: function (value) {
              return /^\d{7,14}$/.test(value); // Validar que el teléfono tenga entre 7 y 14 dígitos
            },
            message: 'El teléfono debe contener entre 7 y 14 dígitos numéricos',
          }
    },
    profession: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo profession']
    },
    area:{
        type: String,
        required: [true , 'El area del instructor es requerida'],
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo profession']
    },
    thematic:{
        type: String,
        required: [true, 'La tematica es requerida'],
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo profession']
    },
    isAvailable: {
        type: Boolean,
        default: true
      }
}, { timestamps: true });

const Instructor = mongoose.model('instructors', instructorSchema);

module.exports = Instructor;
