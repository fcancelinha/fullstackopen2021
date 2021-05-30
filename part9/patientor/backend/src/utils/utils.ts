import { Gender } from '../types/patientTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: never): Gender => {

    if(!gender || isGender(gender)){
        throw new Error(`Incorrect gender ${gender} - (Male, Female, Other)`);
    }
    
    return gender;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (prop: unknown): string => {
    if(!prop || !isString(prop))
        throw new Error(`Missing or incorrect format ${prop}`);

    return prop;
};


export default {
    isGender,
    isString,
    parseString,
    parseGender
};
