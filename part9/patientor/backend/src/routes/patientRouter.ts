import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/:id', (req, res) => {

    const id = req.params.id;
    return res.json(patientService.findPatientById(id));
});

router.get('/', (_req, res) => {
    return res.send(patientService.getPatients());
});

router.post('/', (req, res) => {

    const newPatient = patientService.addPatient({
        ...req.body
    });

    return res.json(newPatient);
});



export default router;