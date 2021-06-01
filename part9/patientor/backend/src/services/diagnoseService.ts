import diagnostics from '../data/diagnoses';
import { Diagnostic } from '../models/diagnostic';

const diagnoses: Array<Diagnostic> = diagnostics;

const getDiagnoses = (): Array<Diagnostic> => {
    return diagnoses;
};


export default {
    getDiagnoses
};