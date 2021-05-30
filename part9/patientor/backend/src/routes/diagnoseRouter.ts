import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    return res.send(diagnoseService.getDiagnoses());
});


export default router;