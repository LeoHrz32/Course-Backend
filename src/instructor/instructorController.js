const Instructor = require('../instructor/instructorModel');

// Crear un nuevo instructor
exports.createInstructor = async (req, res) => {
    try {
        const instructor = new Instructor(req.body);
        await instructor.save();
        res.status(201).send(instructor);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Obtener todos los instructores
exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).send(instructors);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener un instructor por ID
exports.getInstructorById = async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (!instructor) {
            return res.status(404).send({ message: 'Instructor no encontrado' });
        }
        res.status(200).send(instructor);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


// Actualizar un instructor por ID
exports.updateInstructor = async (req, res) => {
    try {
        const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        instructor.isAvailable = req.body.isAvailable;
        if (!instructor) {
            return res.status(404).send({ message: 'Instructor no encontrado' });
        }
        res.status(200).send(instructor);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Eliminar un instructor por ID
exports.deleteInstructor = async (req, res) => {
    try {
        const instructor = await Instructor.findByIdAndDelete(req.params.id);
        if (!instructor) {
            return res.status(404).send({ message: 'Instructor no encontrado' });
        }
        res.status(200).send({ message: 'Instructor eliminado' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
