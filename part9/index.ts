import express from 'express';
import calculateBmiMod from "./bmiCalculatorModule";

const app = express();

app.get('/hello', (_req, res) => {

    res.send('Hello world');
});

app.get('/bmi', (req, res) => {

    let bmi;
    const weight: number = Number(req.query.weight);
    const height: number = Number(req.query.height);

    calculateBmiMod(height, weight)

    return res.json({
        height,
        weight,
        bmi
    });
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});