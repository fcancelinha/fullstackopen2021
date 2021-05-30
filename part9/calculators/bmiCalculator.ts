
const calculateBmi = (height: number, weight: number ): string => {

    const result = (weight / (height * height));

    console.log(result);

    switch(true) {
        case result < 25 :
            return "Normal (healthy weight)";
        case result >= 30 :
            return "Obese (unhealthy weight)";
        default:
            return "Overweight (reduce weight)";
    }
};

const weight = Number(process.argv[2]);
const height = Number(process.argv[3]);

console.log(calculateBmi(weight, height));