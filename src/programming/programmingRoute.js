const express = require('express');
const router = express.Router();
const programmingController = require('../programming/programmingController'); 


router.post('/programacion/create', programmingController.createProgramming);
router.get('/programacion', programmingController.getAllProgrammings);
router.get('/programacion/:id', programmingController.getProgrammingById);
router.put('/programacion/:id', programmingController.updateProgrammingById);
router.delete('/programacion/:id', programmingController.deleteProgrammingById);

module.exports = router;
