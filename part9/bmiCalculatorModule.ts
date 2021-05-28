const calculateBmiMod = (height: number, weight: number ): string => {

    if(isNaN(height) || isNaN(weight))
        throw new TypeError('malformed parameters');

    const result = (weight / (height * height));

    switch(true) {
        case result < 25 :
            return "Normal (healthy weight)";
        case result >= 30 :
            return "Obese (unhealthy weight)";
        default:
            return "Overweight (reduce weight)";
    }
};


export default calculateBmiMod;
