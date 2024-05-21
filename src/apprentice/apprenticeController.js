const Apprentice = require('../apprentice/apprenticeModel');

// Crear un nuevo aprendiz
exports.createApprentice = async (req, res) => {
    try {
        const apprentice = new Apprentice(req.body);
        await apprentice.save();
        res.status(201).send(apprentice);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Obtener todos los aprendices
exports.getAllApprentices = async (req, res) => {
    try {
        const apprentices = await Apprentice.find();
        res.status(200).send(apprentices);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener un aprendiz por ID
exports.getApprenticeById = async (req, res) => {
    try {
        const apprentice = await Apprentice.findById(req.params.id);
        
        if (!apprentice) {
            return res.status(404).send({ message: 'Aprendiz no encontrado' });
        }
        res.status(200).send(apprentice);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Actualizar un aprendiz por ID
exports.updateApprentice = async (req, res) => {
    try {
        const apprentice = await Apprentice.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });
        apprentice.isAvailable = req.body.isAvailable;
        if (!apprentice) {
            return res.status(404).send({ message: 'Aprendiz no encontrado' });
        }
        res.status(200).send(apprentice);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Eliminar un aprendiz por ID
exports.deleteApprentice = async (req, res) => {
    try {
        const apprentice = await Apprentice.findByIdAndDelete(req.params.id);
        if (!apprentice) {
            return res.status(404).send({ message: 'Aprendiz no encontrado' });
        }
        res.status(200).send({ message: 'Aprendiz eliminado' });
    } catch (error) {
        res.status(500).send({ message: "Aprendiz no encontrado" +error.message });
    }
};