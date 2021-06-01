import { Patient } from "../models/patient";

export type OmitSsn = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}