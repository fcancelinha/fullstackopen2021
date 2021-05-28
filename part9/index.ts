
import express from 'express';
import calculateBmiMod from "./bmiCalculatorModule";
import { exerciseCalculator } from './exerciseCalculator';


const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {

    res.send('Hello world');
});

app.get('/bmi', (req, res) => {

    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    try {
        const bmi = calculateBmiMod(height, weight);

        return res.json({
            height,
            weight,
            bmi
        });

    } catch (error){
        return res.send({error});
    }
   
});

app.post('/exercise', (req, res) => {

    console.log("logging", req.body);

    try {
        const dailyExercises: Array<number> = req.body.daily_exercises;
        const target: number = req.body.target;

        if(!Array.isArray(dailyExercises) || isNaN(target)){
            throw new Error('malformatted parameters');
        }

        if(!dailyExercises.length || !target){
            throw new Error('parameters missing')
        }

        const result = exerciseCalculator(dailyExercises, target);

        return res.send(200).json({...result});

    }
    catch(error) {
        return res.status(400).send({error: error.message});
    }
   
})



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});