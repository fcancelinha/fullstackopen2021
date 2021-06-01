import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

const PatientDetails = () => {

    const [{ patients }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();
    let foundPatient: Patient | undefined = Object.values(patients).find((p: Patient) => p.id === id);

    React.useEffect(() => {

        if (!foundPatient) {

            axios
                .get<Patient>(`${apiBaseUrl}/patients/${id}`)
                .then((response: AxiosResponse<Patient>) => {

                    foundPatient = response.data;
                    dispatch({ type: "ADD_PATIENT", payload: foundPatient });

                }).catch(error => {
                    console.log(error);
                });
        }
    });


    return (
        <div>
            <h1>{foundPatient?.name}</h1>
            <p><b>gender:</b> {foundPatient?.gender} </p>
            <p><b>ssn:</b> {foundPatient?.ssn ?? 'Not Available'}</p>
            <p><b>occupation:</b> {foundPatient?.occupation}</p>
            <b>entries</b>
            <p> {foundPatient?.entries} </p>
        </div>
    );
};

export default PatientDetails;
