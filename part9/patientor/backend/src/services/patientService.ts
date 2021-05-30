import patients from '../data/patients';
import { Patient } from '../models/patient';
import { OmitSsn, NewPatient } from '../types/patientTypes';
import uuid = require('uuid');

const getPatients = (): OmitSsn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatient): Patient => {

  const newPatient = {
      id: uuid.v4(),
      ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    addPatient,
};