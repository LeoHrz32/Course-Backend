const Programming = require('../programming/programmingModel'); // Ajusta la ruta según tu estructura de carpetas

// Crear una nueva programación
exports.createProgramming = async (req, res) => {
    try {
        const newProgramming = new Programming(req.body);
        await newProgramming.save();
        res.status(201).json(newProgramming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las programaciones con atributos de curso e instructor
exports.getAllProgrammings = async (req, res) => {
    try {
        const programmings = await Programming.find();
        res.status(200).json(programmings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una programación por ID con atributos de curso e instructor
exports.getProgrammingById = async (req, res) => {
    try {
        const programming = await Programming.findById(req.params.id)
            .populate('courseId', 'name description')
            .populate('instructorId', 'firstName lastName');
        if (!programming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }
        res.status(200).json(programming);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una programación por ID
exports.updateProgrammingById = async (req, res) => {
    try {
        const updatedProgramming = await Programming.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate('courseId', 'name description')
            .populate('instructorId', 'firstName lastName');
        if (!updatedProgramming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }
        res.status(200).json(updatedProgramming);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una programación por ID
exports.deleteProgrammingById = async (req, res) => {
    try {
        const deletedProgramming = await Programming.findByIdAndDelete(req.params.id);
        if (!deletedProgramming) {
            return res.status(404).json({ error: 'Programación no encontrada' });
        }
        res.status(200).json({ message: 'Programación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
