const mongoose = require('mongoose');

const apprenticeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo nombre']
    },
    lastName: {
        type: String,
        required: true,
        match: [/^[A-Za-zÁÉÍÓÚÑñáéíóú\s]+$/, 'Solo se permiten letras y espacios en el campo nombre']
    },
    documentType: {
        type: String,
        required: true,
        enum: {
            values: ['Cedula', 'Tarjeta de identidad', 'Otro'],
            message: '{VALUE} no es un tipo de documento válido'
        }
    },
    documentNumber: {
        type: Number,
        required: true,
        unique: true,// Asegura que el número de documento sea único
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value); // La cédula debe contener solo números positivos
            },
            message: 'La cédula debe contener solo números'
        }
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
              return /^\d{7,14}$/.test(value); // Validar que el teléfono tenga entre 7 y 14 dígitos
            },
            message: 'El teléfono debe contener entre 7 y 14 dígitos numéricos',
          }
    },
    isAvailable: {
        type: Boolean,
        default: true
      }
}, { timestamps: true });

const Apprentice = mongoose.model('apprentices', apprenticeSchema);

module.exports = Apprentice;
